<?php

namespace PHPDish\Bundle\UserBundle\EventListener;

use Carbon\Carbon;
use FOS\UserBundle\Event\FormEvent;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Routing\RouterInterface;

final class UserRegisterListener
{
    /**
     * @var RouterInterface
     */
    protected $router;

    public function __construct(RouterInterface $router)
    {
        $this->router = $router;
    }

    public function onRegisterSuccess(FormEvent $event)
    {
        $user = $event->getForm()->getData();
        $now = Carbon::now();
        $user->setCreatedAt($now)->setUpdatedAt($now);
        $response = new RedirectResponse($this->router->generate('user_view', [
            'username' => $user->getUsername()
        ]));
        $event->setResponse($response);
    }
}