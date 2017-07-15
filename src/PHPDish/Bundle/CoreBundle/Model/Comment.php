<?php
namespace PHPDish\Bundle\CoreBundle\Model;

use PHPDish\Bundle\UserBundle\Model\UserAwareTrait;

class Comment implements CommentInterface
{
    protected $body;

    use DateTimeTrait, IdentifiableTrait, UserAwareTrait, EnabledTrait;

    /**
     * {@inheritdoc}
     */
    public function setBody($body)
    {
        $this->body = $body;
    }

    /**
     * {@inheritdoc}
     */
    public function getBody()
    {
        return $this->body;
    }
}