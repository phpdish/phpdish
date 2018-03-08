<?php

namespace PHPDish\Bundle\UserBundle\Entity;

use Doctrine\Common\Collections\Collection;
use PHPDish\Bundle\UserBundle\Model\UserInterface;
use Symfony\Component\Security\Core\Role\Role as BaseRole;

class Role extends BaseRole
{
    /**
     * @var int
     */
    protected $id;

    /**
     * @var string
     */
    protected $name;

    /**
     * @var UserInterface[]|Collection
     */
    protected $users;

    /**
     * Get id.
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name.
     *
     * @param string $name
     *
     * @return Role
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name.
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Add user.
     *
     * @param UserInterface $user
     *
     * @return Role
     */
    public function addUser(UserInterface $user)
    {
        $this->users[] = $user;

        return $this;
    }

    /**
     * Remove user.
     *
     * @param UserInterface $user
     */
    public function removeUser(UserInterface $user)
    {
        $this->users->removeElement($user);
    }

    /**
     * Get users.
     *
     * @return UserInterface[]|Collection
     */
    public function getUsers()
    {
        return $this->users;
    }
}
