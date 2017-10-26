<?php

namespace PHPDish\Bundle\CoreBundle\DataFixtures\ORM;


use Doctrine\Common\Persistence\ObjectManager;
use PHPDish\Bundle\PostBundle\Service\CategoryManagerInterface;

class CategoryFixtures extends AbstractFixtures
{
    /**
     * {@inheritdoc}
     */
    public function load(ObjectManager $manager)
    {
        $manager = $this->getCategoryManager();
        $category = $manager->createCategory($this->getReference('general-user'));
        $category->setName('小风的PHP研究所')
            ->setDescription('小风的PHP研究所')
            ->setSlug('php-labs');
        $manager->saveCategory($category);
        $this->addReference('general-category', $category);
    }

    /**
     * @return CategoryManagerInterface
     */
    protected function getCategoryManager()
    {
        return $this->container->get('phpdish.manager.category');
    }
}