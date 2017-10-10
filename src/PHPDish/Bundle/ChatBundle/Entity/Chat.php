<?php

namespace PHPDish\Bundle\ChatBundle\Entity;

use PHPDish\Bundle\ChatBundle\Model\ChatInterface;
use Doctrine\ORM\Mapping as ORM;
use PHPDish\Bundle\CoreBundle\Model\IdentifiableTrait;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

/**
 * @ORM\Entity
 * @ORM\Table(name="chats")
 */
class Chat implements ChatInterface
{
    use IdentifiableTrait;

    /**
     * @ORM\Column(type="string", length=500)
     * @var string
     */
    protected $body;

    /**
     * @ORM\Column(type="datetime")
     * @var \DateTime
     */
    protected $createdAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @var \DateTime
     */
    protected $readAt;

    /**
     * @var UserInterface
     * @ORM\ManyToOne(targetEntity="PHPDish\Bundle\UserBundle\Entity\User")
     */
    protected $sender;

    /**
     * @var UserInterface
     * @ORM\ManyToOne(targetEntity="PHPDish\Bundle\UserBundle\Entity\User")
     */
    protected $recipient;

    /**
     * @ORM\Column(type="boolean")
     * @var boolean
     */
    protected $read = false;

    /**
     * @return string
     */
    public function getBody()
    {
        return $this->body;
    }

    /**
     * @param string $body
     * @return Chat
     */
    public function setBody($body)
    {
        $this->body = $body;
        return $this;
    }

    /**
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * @param \DateTime $createdAt
     * @return Chat
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;
        return $this;
    }

    /**
     * @return \DateTime
     */
    public function getReadAt()
    {
        return $this->readAt;
    }

    /**
     * @param \DateTime $readAt
     * @return Chat
     */
    public function setReadAt($readAt)
    {
        $this->readAt = $readAt;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getSender()
    {
        return $this->sender;
    }

    /**
     * @param mixed $sender
     * @return Chat
     */
    public function setSender($sender)
    {
        $this->sender = $sender;
        return $this;
    }

    /**
     * @return UserInterface
     */
    public function getRecipient()
    {
        return $this->recipient;
    }

    /**
     * @param UserInterface $recipient
     * @return Chat
     */
    public function setRecipient($recipient)
    {
        $this->recipient = $recipient;
        return $this;
    }

    /**
     * @param bool $read
     */
    public function setRead($read)
    {
        $this->read = $read;
    }

    /**
     * {@inheritdoc}
     */
    public function isRead()
    {
        return $this->read;
    }
}