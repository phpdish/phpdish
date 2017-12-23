<?php

namespace PHPDish\Bundle\UserBundle\EventListener;


use FOS\UserBundle\Event\FormEvent;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Routing\RouterInterface;

final class ChangePasswordListener
{
    /**
     * @var RouterInterface
     */
    protected $router;

    public function __construct(RouterInterface $router)
    {
        $this->router = $router;
    }

    public function onChangePassword(FormEvent $event)
    {
        $event->setResponse(new RedirectResponse(
            $this->router->generate('setting_change_password') //跳转回修改密码页面
        ));
    }
}