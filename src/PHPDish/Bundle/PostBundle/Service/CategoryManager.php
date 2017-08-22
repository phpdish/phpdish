<?php
namespace PHPDish\Bundle\PostBundle\Service;

use Doctrine\ORM\EntityManagerInterface;
use PHPDish\Bundle\PostBundle\Model\CategoryInterface;
use PHPDish\Bundle\PostBundle\Repository\PostRepository;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

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

    /**
     * {@inheritdoc}
     */
    public function findCategoryBySlug($slug)
    {
        return $this->getRepository()->findOneBy([
            'slug' => $slug
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function addManagerForCategory(CategoryInterface $category, UserInterface $user)
    {
        $category->addManager($user);
        $this->entityManager->persist($category);
        $this->entityManager->flush();
        return true;
    }

    /**
     * {@inheritdoc}
     */
    public function followCategory(CategoryInterface $category, UserInterface $user)
    {
        $category->addFollower($user);
        $category->setFollowerCount($category->getFollowerCount() + 1);
        $this->entityManager->persist($category);
        $this->entityManager->flush();
        return true;
    }

    /**
     * {@inheritdoc}
     */
    public function unFollowCategory(CategoryInterface $category, UserInterface $user)
    {
        $category->removeFollower($user);
        $category->setFollowerCount($category->getFollowerCount() - 1);
        $this->entityManager->persist($category);
        $this->entityManager->flush();
        return true;
    }

    /**
     * @return PostRepository
     */
    protected function getRepository()
    {
        return $this->entityManager->getRepository('PHPDishPostBundle:Category');
    }
}