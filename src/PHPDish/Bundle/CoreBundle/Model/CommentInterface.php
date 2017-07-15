<?php
/**
 * PHPDish comment component
 * @author Tao <taosikai@yeah.net>
 */
namespace  PHPDish\Bundle\CoreBundle\Model;

use PHPDish\Bundle\UserBundle\Model\UserAwareInterface;

interface CommentInterface extends DateTimeInterface, IdentifiableInterface, UserAwareInterface, EnabledInterface
{
    /**
     * 获取评论内容
     * @return string
     */
    public function getBody();

    /**
     * 设置内容
     * @param string $body
     * @return $this
     */
    public function setBody($body);
}