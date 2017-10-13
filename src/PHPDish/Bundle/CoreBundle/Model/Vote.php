<?php
/**
 * PHPDish comment component.
 *
 * @author Tao <taosikai@yeah.net>
 */

namespace PHPDish\Bundle\CoreBundle\Model;

use PHPDish\Bundle\UserBundle\Model\UserAwareTrait;

class Vote implements VoteInterface
{
    use DateTimeTrait, UserAwareTrait, IdentifiableTrait;
}
