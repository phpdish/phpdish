<?php
namespace PHPDish\Bundle\UserBundle\Service;

use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;

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
        return $this->getRepository()
            ->findOneBy(['email' => $email]);
    }

    /**
     * {@inheritdoc}
     */
    public function findLatestUsers($limit)
    {
        return $this->getRepository()->createQueryBuilder('u')
            ->orderBy('u.createdAt', 'desc')
            ->setMaxResults($limit)
            ->getQuery()
            ->getResult();
    }

    /**
     * @return EntityRepository
     */
    protected function getRepository()
    {
        return $this->entityManager->getRepository('PHPDishUserBundle:User');
    }
}