<?php

namespace PHPDish\Bundle\WebBundle\Service;

use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;

class SongManager  implements SongManagerInterface
{
    /**
     * @var EntityManagerInterface
     */
    protected $entityManager;

    /**
     * @var EntityRepository
     */
    protected $songRepository;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
        $this->songRepository = $entityManager->getRepository('PHPDishWebBundle:Song');
    }

    /**
     * {@inheritdoc}
     */
    public function getLatestSong()
    {
        return $this->songRepository->findOneBy(['enabled' => true], [
            'createdAt' => 'desc'
        ]);
    }
}