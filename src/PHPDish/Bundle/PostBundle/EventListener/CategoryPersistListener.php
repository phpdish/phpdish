<?php

namespace PHPDish\Bundle\PostBundle\EventListener;

use PHPDish\Bundle\PostBundle\Event\CategoryCreateEvent;
use PHPDish\Bundle\PostBundle\Event\CategoryPersistEvent;
use PHPDish\Component\Core\AvatarGenerator\AvatarGeneratorInterface;

final class CategoryPersistListener
{
    /**
     * @var AvatarGeneratorInterface
     */
    protected $avatarGenerator;

    public function __construct(AvatarGeneratorInterface $avatarGenerator)
    {
        $this->avatarGenerator = $avatarGenerator;
    }

    /**
     * 专栏创建之前被触发
     * @param CategoryPersistEvent $event
     */
    public function onCategoryPersist(CategoryPersistEvent $event)
    {
        $category = $event->getCategory();
        if (!$category->getCover()) {
            $avatar = $this->avatarGenerator->generate($category->getName());
            $category->setCover($avatar->getKey());
        }
    }
}