<?php

namespace PHPDish\Bundle\ChatBundle\FormHandler;

use FOS\MessageBundle\Composer\ComposerInterface;
use Symfony\Component\Form\Form;

class NewChatFormHandler implements FormHandlerInterface
{
    /**
     * @var ComposerInterface
     */
    protected $composer;

    public function __construct(ComposerInterface $composer)
    {
        $this->composer = $composer;
    }

    /**
     * {@inheritdoc}
     */
    public function process(Form $form)
    {
        $message = $form->getData();
        $threadBuilder = $this->composer->newThread();
        $threadBuilder
            ->addRecipient($recipient)
            ->setSender($sender)
            ->setSubject('Stof commented on your pull request #456789')
            ->setBody('You have a typo, : mondo instead of mongo. Also for coding standards ...');
    }
}