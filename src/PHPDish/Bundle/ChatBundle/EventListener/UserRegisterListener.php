<?php

namespace PHPDish\Bundle\ChatBundle\EventListener;

use FOS\MessageBundle\Composer\ComposerInterface;
use FOS\MessageBundle\Sender\SenderInterface;
use FOS\UserBundle\Event\FilterUserResponseEvent;
use FOS\UserBundle\Model\UserManagerInterface;

final class UserRegisterListener
{
    /**
     * 用户管理服务
     * @var UserManagerInterface
     */
    protected $userManager;

    /**
     * @var ComposerInterface
     */
    protected $composer;

    /**
     * @var SenderInterface
     */
    protected $sender;

    public function __construct(
        UserManagerInterface $userManager,
        ComposerInterface $composer,
        SenderInterface $sender
    ){
        $this->userManager = $userManager;
        $this->composer = $composer;
        $this->sender = $sender;
    }

    public function onRegistrationCompleted(FilterUserResponseEvent $event)
    {
        if (!$sender = $this->getAdminAccount()) {
            return;
        }
        $message = <<<EOT
%s 您好，<br/>
欢迎注册 PHPDish 社区，我是 PHPDish的发起人和维护人，PHPDish 致力于为广大phper以及文字爱好者<br/>
提供了一个知识分享的平台，如果你有任何问题或者建议请联系我。<br/>
EOT;
        $user = $event->getUser();
        $threadBuilder = $this->composer->newThread();
        $threadBuilder
            ->addRecipient($user)
            ->setSender($sender)
            ->setSubject('欢迎注册 PHPDish 社区!')
            ->setBody(sprintf($message, $user->getUsername()));

        $this->sender->send($threadBuilder->getMessage());
    }

    /**
     * 获取用户
     * @return \FOS\UserBundle\Model\UserInterface
     */
    protected function getAdminAccount()
    {
        return $this->userManager->findUserByUsername('slince');
    }
}