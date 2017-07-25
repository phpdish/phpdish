<?php
/**
 * PHPDish user component
 * @author Tao <taosikai@yeah.net>
 */
namespace PHPDish\Bundle\UserBundle\Model;

use PHPDish\Bundle\CoreBundle\Model\DateTimeInterface;
use PHPDish\Bundle\CoreBundle\Model\EnabledInterface;
use PHPDish\Bundle\CoreBundle\Model\IdentifiableInterface;
use Symfony\Component\Security\Core\User\UserInterface as BaseUserInterface;

interface UserInterface extends
    BaseUserInterface,
    IdentifiableInterface,
    DateTimeInterface,
    EnabledInterface
{
    public function avatar($width = 120, $height = 120);
}