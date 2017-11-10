<?php

namespace PHPDish\Bundle\UserBundle\EventListener;

use Carbon\Carbon;
use FOS\UserBundle\Event\FormEvent;
use PHPDish\Component\Core\AvatarGenerator\AvatarGeneratorInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Routing\RouterInterface;

final class UserRegisterListener
{
    /**
     * @var RouterInterface
     */
    private $router;

    /**
     * @var AvatarGeneratorInterface
     */
    protected $avatarGenerator;

    public function __construct(RouterInterface $router, AvatarGeneratorInterface $avatarGenerator)
    {
        $this->router = $router;
        $this->avatarGenerator = $avatarGenerator;
    }

    /**
     * 监听注册成功
     * @param FormEvent $event
     */
    public function onRegisterSuccess(FormEvent $event)
    {
        $user = $event->getForm()->getData();
        $now = Carbon::now();
        $user->setCreatedAt($now)->setUpdatedAt($now);
        $user->setAvatar($this->avatarGenerator->generate($user->getUsername())->getKey()); //生成临时头像
        $response = new RedirectResponse($this->router->generate('user_view', [
            'username' => $user->getUsername(),
        ]));
        $event->setResponse($response);
    }
}
