<?php
/**
 * PHPDish comment component
 * @author Tao <taosikai@yeah.net>
 */
namespace PHPDish\Bundle\CoreBundle\Model;

use Doctrine\ORM\Mapping as ORM;
use PHPDish\Bundle\UserBundle\Entity\User;
use DateTime;
use PHPDish\Bundle\UserBundle\Model\UserAwareTrait;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

class Vote implements VoteInterface
{
    use DateTimeTrait, UserAwareTrait, IdentifiableTrait;
}
