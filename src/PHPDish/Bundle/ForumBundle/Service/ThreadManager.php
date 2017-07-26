<?php
namespace PHPDish\Bundle\ForumBundle\Service;

use Doctrine\ORM\EntityManagerInterface;

class ThreadManager implements ThreadManagerInterface
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
    public function findEnabledThreads()
    {
        return $this->getThreadRepository()->findBy(['enabled' => true]);
    }

    /**
     * {@inheritdoc}
     */
    public function findThreadBySlug($slug)
    {
        return $this->getThreadRepository()->findOneBy(['slug' => $slug]);
    }

    /**
     * @return \Doctrine\Common\Persistence\ObjectRepository
     */
    protected function getThreadRepository()
    {
        return $this->entityManager->getRepository('PHPDishForumBundle:Thread');
    }
}