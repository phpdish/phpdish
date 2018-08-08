<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\PostBundle\Security;

use PHPDish\Bundle\ResourceBundle\Security\EntityVoter;
use PHPDish\Bundle\PostBundle\Model\PostInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class PostVoter extends EntityVoter
{
    /**
     * {@inheritdoc}
     */
    protected function getResourceClass()
    {
        return PostInterface::class;
    }

    protected function canView($entity, UserInterface $user)
    {
        //拥有管理权限的可以阅读
        if ($this->canEdit($entity, $user)) {
            return true;
        }
        //删除的不可以阅读
        if (!$entity->isEnabled()) {
            return false;
        }
        //付费专栏检查
        $category = $entity->getCategory();
        return !$category->isCharging() || $category->isFollowedBy($user);
    }
}
