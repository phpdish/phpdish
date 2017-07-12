<?php
namespace PHPDish\Bundle\UserBundle\Entity;

use Symfony\Component\Security\Core\Role\Role as BaseRole;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="roles")
 */
class Role extends BaseRole
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(type="string")
     */
    protected $name;

    /**
     * @ORM\ManyToMany(targetEntity="User", mappedBy="roles")
     */
    protected $users;
}