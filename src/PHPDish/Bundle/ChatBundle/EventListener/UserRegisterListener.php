<?php

namespace PHPDish\Bundle\ChatBundle\EventListener;

use FOS\MessageBundle\Composer\ComposerInterface;
use FOS\MessageBundle\Sender\SenderInterface;
use FOS\UserBundle\Model\UserManagerInterface;
use PHPDish\Bundle\UserBundle\Event\UserEvent;
use Symfony\Component\Translation\TranslatorInterface;

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

    /**
     * 发信人
     * @var string
     */
    protected $userName;

    /**
     * 发信模板
     * @var string
     */
    protected $messageTemplate;

    /**
     * @var TranslatorInterface
     */
    protected $translator;

    public function __construct(
        UserManagerInterface $userManager,
        ComposerInterface $composer,
        SenderInterface $sender,
        TranslatorInterface $translator,
        $userName,
        $messageTemplate
    ){
        $this->userManager = $userManager;
        $this->composer = $composer;
        $this->sender = $sender;
        $this->translator = $translator;
        $this->userName = $userName;
        $this->messageTemplate = $messageTemplate;
    }

    public function onRegistrationCompleted(UserEvent $event)
    {
        if (!($sender = $this->getAdminAccount()) || !$this->messageTemplate) {
            return;
        }
        $user = $event->getUser();
        $threadBuilder = $this->composer->newThread();
        $threadBuilder
            ->addRecipient($user)
            ->setSender($sender)
            ->setSubject($this->translator->trans('register.welcome_subject'))
            ->setBody(sprintf($this->messageTemplate, $user->getUsername()));

        $this->sender->send($threadBuilder->getMessage());
    }

    /**
     * 获取发信用户
     *
     * @return \FOS\UserBundle\Model\UserInterface|false
     */
    protected function getAdminAccount()
    {
        return $this->userName ? $this->userManager->findUserByUsername($this->userName) : false;
    }
}