<?php

namespace PHPDish\Bundle\UserBundle\EventListener;

use Carbon\Carbon;
use FOS\UserBundle\Event\FormEvent;
use PHPDish\Bundle\UserBundle\Entity\User;
use PHPDish\Component\Core\AvatarGenerator\AvatarGeneratorInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Routing\RouterInterface;

final class UserCreateListener
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
     * 注册监听完成
     * @param FormEvent $event
     */
    public function onRegisterSuccess(FormEvent $event)
    {
        $user = $event->getForm()->getData();
        $response = new RedirectResponse($this->router->generate('user_view', [
            'username' => $user->getUsername(),
        ]));
        $event->setResponse($response);
    }

    /**
     * 监听用户创建之前
     * @param User $user
     */
    public function prePersist($user)
    {
        $now = Carbon::now();
        $user->setCreatedAt($now)->setUpdatedAt($now);
        $user->setAvatar($this->avatarGenerator->generate($user->getUsername())->getKey()); //生成临时头像
    }
}
