<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\ForumBundle\Model;

use Doctrine\Common\Collections\ArrayCollection;
use PHPDish\Bundle\CmsBundle\Model\AbstractComment;
use PHPDish\Bundle\CmsBundle\Model\VotableTrait;
use PHPDish\Bundle\ResourceBundle\Model\IdentifiableTrait;

class Reply extends AbstractComment implements ReplyInterface
{
    use IdentifiableTrait, VotableTrait;

    /**
     * @var TopicInterface
     */
    protected $topic;

    public function __construct()
    {
        $this->voters = new ArrayCollection();
    }

    /**
     * {@inheritdoc}
     */
    public function setTopic(TopicInterface $topic)
    {
        $this->topic = $topic;

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function getTopic()
    {
        return $this->topic;
    }
}
