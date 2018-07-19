<?php
/**
 * PHPDish comment component.
 *
 * @author Tao <taosikai@yeah.net>
 */

namespace  PHPDish\Component\Resource\Model;

use PHPDish\Bundle\UserBundle\Model\UserAwareInterface;

interface CommentInterface extends ContentInterface, DateTimeInterface, UserAwareInterface, EnabledInterface
{
}
