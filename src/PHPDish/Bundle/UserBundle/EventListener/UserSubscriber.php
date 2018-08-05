<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\UserBundle\EventListener;

use Carbon\Carbon;
use Doctrine\Common\Persistence\Event\LifecycleEventArgs;
use FOS\UserBundle\Event\FormEvent;
use FOS\UserBundle\FOSUserEvents;
use PHPDish\Bundle\ResourceBundle\AvatarGenerator\AvatarGeneratorInterface;
use PHPDish\Bundle\UserBundle\Event\Events;
use PHPDish\Bundle\UserBundle\Event\UserEvent;
use PHPDish\Bundle\UserBundle\Model\UserInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Routing\RouterInterface;

final class UserSubscriber implements EventSubscriberInterface
{
    /**
     * @var EventDispatcherInterface
     */
    protected $eventDispatcher;

    /**
     * @var RouterInterface
     */
    private $router;

    /**
     * @var AvatarGeneratorInterface
     */
    protected $avatarGenerator;

    public function __construct(
        EventDispatcherInterface $eventDispatcher,
        RouterInterface $router,
        AvatarGeneratorInterface $avatarGenerator
    ) {
        $this->eventDispatcher = $eventDispatcher;
        $this->router = $router;
        $this->avatarGenerator = $avatarGenerator;
    }

    /**
     * {@inheritdoc}
     */
    public static function getSubscribedEvents()
    {
        return [
            FOSUserEvents::REGISTRATION_SUCCESS => 'onRegisterSuccess',
            FOSUserEvents::RESETTING_RESET_SUCCESS => 'onResettingResetSuccess',
            FOSUserEvents::CHANGE_PASSWORD_SUCCESS => 'onChangePassword'
        ];
    }

    /**
     * 注册监听完成
     *
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
     * 重置之后
     *
     * @param FormEvent $event
     */
    public function onResettingResetSuccess(FormEvent $event)
    {
        $response = new RedirectResponse($this->router->generate('setting_profile'));
        $event->setResponse($response);
    }

    /**
     * 密码修改成功触发
     *
     * @param FormEvent $event
     */
    public function onChangePassword(FormEvent $event)
    {
        $event->setResponse(new RedirectResponse(
            $this->router->generate('setting_change_password') //跳转回修改密码页面
        ));
    }

    /**
     * doctrine 事件，数据库写入
     *
     * @param UserInterface $user
     * @param LifecycleEventArgs $event
     */
    public function postPersist($user, LifecycleEventArgs $event)
    {
        $now = Carbon::now();
        $user->setCreatedAt($now)->setUpdatedAt($now);
        $user->setAvatar($this->avatarGenerator->generate($user->getUsername())->getKey()); //生成临时头像

        $this->eventDispatcher->dispatch(Events::USER_CREATED, new UserEvent($user));
    }
}