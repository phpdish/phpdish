<?php
namespace PHPDish\Bundle\PostBundle\Service;

use Carbon\Carbon;
use Doctrine\Common\Util\Inflector;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Query;
use PHPDish\Bundle\CoreBundle\Service\PaginatorTrait;
use PHPDish\Bundle\PostBundle\Entity\Category;
use PHPDish\Bundle\PostBundle\Model\CategoryInterface;
use PHPDish\Bundle\PostBundle\Repository\PostRepository;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

class CategoryManager implements CategoryManagerInterface
{
    use PaginatorTrait;

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
    public function findUserCategories(UserInterface $user)
    {
        return $this->getRepository()->createQueryBuilder('c')
            ->where('c.creator = :userId')->setParameter('userId', $user->getId())
            ->orderBy('c.createdAt', 'desc')
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
        return $this->saveCategory($category);
    }

    /**
     * {@inheritdoc}
     */
    public function followCategory(CategoryInterface $category, UserInterface $user)
    {
        $category->addFollower($user);
        $category->setFollowerCount($category->getFollowerCount() + 1);
        return $this->saveCategory($category);
    }

    /**
     * {@inheritdoc}
     */
    public function unFollowCategory(CategoryInterface $category, UserInterface $user)
    {
        $category->removeFollower($user);
        $category->setFollowerCount($category->getFollowerCount() - 1);
        return $this->saveCategory($category);
    }

    /**
     * {@inheritdoc}
     */
    public function createCategory(UserInterface $user)
    {
        $category = new Category();
        $category->setCreator($user)
            ->setCreatedAt(Carbon::now());
        return $category;
    }

    /**
     * {@inheritdoc}
     */
    public function saveCategory(CategoryInterface $category)
    {
        $category->setUpdatedAt(Carbon::now());
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