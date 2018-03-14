<?php

namespace PHPDish\Bundle\UserBundle\EventListener;

use FOS\UserBundle\Event\FormEvent;
use FOS\UserBundle\Event\GetResponseNullableUserEvent;
use FOS\UserBundle\FOSUserEvents;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Routing\RouterInterface;

class ResettingListener implements EventSubscriberInterface
{
    /**
     * @var RouterInterface
     */
    protected $router;

    public function __construct(RouterInterface $router)
    {
        $this->router = $router;
    }

    /**
     * {@inheritdoc}
     */
    public static function getSubscribedEvents()
    {
        return [
            FOSUserEvents::RESETTING_RESET_SUCCESS => 'onResettingResetSuccess'
        ];
    }

    /**
     * 重置之后
     * @param FormEvent $event
     */
    public function onResettingResetSuccess(FormEvent $event)
    {
        $user = $event->getForm()->getData();
        $response = new RedirectResponse($this->router->generate('setting_profile', [
//            'username' => $user->getUsername(),
        ]));
        $event->setResponse($response);
    }
}