<?php
/**
 * PHPDish Core Component.
 *
 * @author Tao <taosikai@yeah.net>
 */

namespace PHPDish\Bundle\CoreBundle\Model;

use PHPDish\Bundle\UserBundle\Model\UserAwareTrait;

abstract class Vote implements VoteInterface
{
    use DateTimeTrait, UserAwareTrait, IdentifiableTrait;
}
