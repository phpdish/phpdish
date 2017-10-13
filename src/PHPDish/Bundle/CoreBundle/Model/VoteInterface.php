<?php
/**
 * PHPDish vote component.
 *
 * @author Tao <taosikai@yeah.net>
 */

namespace  PHPDish\Bundle\CoreBundle\Model;

use PHPDish\Bundle\UserBundle\Model\UserAwareInterface;

interface VoteInterface extends DateTimeInterface, IdentifiableInterface, UserAwareInterface
{
    /**
     * 获取id.
     *
     * @return int
     */
    public function getId();
}
