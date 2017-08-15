<?php
namespace PHPDish\Bundle\PostBundle\Service;

use Doctrine\ORM\EntityManagerInterface;
use PHPDish\Bundle\PostBundle\Repository\PostRepository;

class CategoryManager implements CategoryManagerInterface
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
    public function findAllEnabledCategories()
    {
        return $this->getRepository()->createQueryBuilder('c')
            ->where('c.enabled = 1')
            ->getQuery()
            ->getResult();
    }

    public function findCategoryBySlug($slug)
    {
        return $this->getRepository()->findOneBy([
            'slug' => $slug
        ]);
    }

    /**
     * @return PostRepository
     */
    protected function getRepository()
    {
        return $this->entityManager->getRepository('PHPDishPostBundle:Category');
    }
}