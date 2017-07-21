<?php
namespace PHPDish\Bundle\UserBundle\Service;

use Doctrine\ORM\EntityManagerInterface;

class UserManager implements UserManagerInterface
{
    /**
     * @var EntityManagerInterface
     */
    protected $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * {@inheritdoc}
     */
    public function findUserByName($username)
    {
        return $this->entityManager->getRepository('PHPDishUserBundle:User')
            ->findOneBy(['username' => $username]);
    }

    /**
     * {@inheritdoc}
     */
    public function findUserByEmail($email)
    {
        return $this->entityManager->getRepository('PHPDishUserBundle:User')
            ->findOneBy(['email' => $email]);
    }
}