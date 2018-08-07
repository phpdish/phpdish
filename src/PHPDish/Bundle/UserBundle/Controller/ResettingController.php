<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\UserBundle\Controller;

use FOS\UserBundle\Controller\ResettingController as FOSResettingController;
use FOS\UserBundle\Event\GetResponseNullableUserEvent;
use FOS\UserBundle\FOSUserEvents;
use PHPDish\Bundle\ResourceBundle\Controller\ResourceConfigurationInterface;
use PHPDish\Bundle\UserBundle\Form\Type\ResettingRequestType;
use Symfony\Component\EventDispatcher\EventDispatcher;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Translation\TranslatorInterface;

class ResettingController extends FOSResettingController
{
    /**
     * @var ResourceConfigurationInterface
     */
    protected $configuration;

    /**
     * @param ResourceConfigurationInterface $configuration
     */
    public function setResourceConfiguration(ResourceConfigurationInterface $configuration)
    {
        $this->configuration = $configuration;
    }

    /**
     * 上一个用户名
     * @var string
     */
    const LAST_USERNAME_SESSION_KEY = '_resetting_last_username';

    /**
     * 重置密码
     * {@inheritdoc}
     */
    public function requestAction()
    {
        $form = $this->createForm(ResettingRequestType::class, null, [
            'action' => $this->generateUrl('fos_user_resetting_send_email')
        ]);
        return $this->render($this->configuration->getTemplate('Resetting:request.html.twig'), [
            'form' => $form->createView(),
            'lastUsername' => $this->get('session')->get(static::LAST_USERNAME_SESSION_KEY) ?: ''
        ]);
    }

    /**
     * 重置密码
     * {@inheritdoc}
     */
    public function sendEmailAction(Request $request)
    {
        $form = $this->createForm(ResettingRequestType::class);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $this->getEventDispatcher()->addListener(FOSUserEvents::RESETTING_SEND_EMAIL_INITIALIZE,
                [$this, 'onSendEmailInitialize']
            );
            return parent::sendEmailAction($request);
        }
        //处理失败调回请求页面
        foreach ($form->getErrors(true) as $error) {
            $this->addFlash('danger', $error->getMessage());
        }
        $this->get('session')->set(static::LAST_USERNAME_SESSION_KEY, $form->getData()['username'] ?? '');
        return $this->redirectToRoute('fos_user_resetting_request');
    }

    /**
     * @return EventDispatcher
     */
    protected function getEventDispatcher()
    {
        return $this->get('event_dispatcher');
    }

    /**
     * 发送邮件初始化
     * @param GetResponseNullableUserEvent $event
     */
    public function onSendEmailInitialize(GetResponseNullableUserEvent $event)
    {
        $response = $this->redirectToRoute('fos_user_resetting_request');
        /** @var TranslatorInterface */
        $translator = $this->get('translator');
        if ($event->getUser() === null) {
            $this->addFlash('danger', $translator->trans('resetting.username_or_email_not_exists'));
            $event->setResponse($response);
        } elseif (!$event->getUser()->getEmail()) {
            $this->addFlash('warning', $translator->trans('resetting.user_missing_email'));
            $event->setResponse($response);
        }
    }
}