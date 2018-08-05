<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\CoreBundle\EventListener;

use PHPDish\Bundle\CoreBundle\Locale\LocaleManager;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\HttpKernel\Event\GetResponseEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Http\Event\InteractiveLoginEvent;
use Symfony\Component\Security\Http\SecurityEvents;

final class LocaleSubscriber implements EventSubscriberInterface
{
    /**
     * @var LocaleManager
     */
    protected $localeManager;

    /**
     * @var Session
     */
    private $session;

    public function __construct(LocaleManager $localeManager, Session $session)
    {
        $this->localeManager = $localeManager;
        $this->session = $session;
    }

    /**
     * {@inheritdoc}
     */
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::REQUEST => 'onKernelRequest',
            SecurityEvents::INTERACTIVE_LOGIN => array(array('onInteractiveLogin', 15)),
        ];
    }

    /**
     * 用户登录之后触发，记录用户的语言
     *
     * @param InteractiveLoginEvent $event
     */
    public function onInteractiveLogin(InteractiveLoginEvent $event)
    {
        $user = $event->getAuthenticationToken()->getUser();

        if (null !== $user->getLocale()) {
            $this->session->set('_locale', $user->getLocale());
        }
    }

    /**
     * 处理request
     *
     * @param GetResponseEvent $event
     */
    public function onKernelRequest(GetResponseEvent $event)
    {
        $request = $event->getRequest();
        $locale = null;
        if (!$request->hasPreviousSession()) {
            $locale = $this->getClientPreferredLocale($request);
        } elseif (!$request->attributes->get('_locale')) {
            $locale = $request->getSession()->get('_locale', $this->getClientPreferredLocale($request));
        }

        if ($locale !== null) {
            $request->setLocale($locale);
        }
    }

    /**
     * 获取最匹配客户端的语言
     *
     * @param Request $request
     * @return null|string
     */
    protected function getClientPreferredLocale(Request $request)
    {
        return $request->getPreferredLanguage($this->localeManager->all());
    }
}