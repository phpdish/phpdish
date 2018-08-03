<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\ResourceBundle\Security;

use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\AccessDecisionManagerInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\User\UserInterface;

abstract class EntityVoter extends Voter
{
    const ACTION_VIEW = 'view';

    const ACTION_EDIT = 'edit';

    /**
     * @var AccessDecisionManagerInterface
     */
    protected $accessDecisionManager;

    /**
     * @var array
     */
    protected $actions;

    /**
     * @var false
     */
    protected $hasAuthenticatedUser;

    public function __construct(AccessDecisionManagerInterface $accessDecisionManager, $actions = [])
    {
        $this->accessDecisionManager = $accessDecisionManager;
        $this->actions = array_merge($actions, [static::ACTION_EDIT, static::ACTION_VIEW]);
    }

    /**
     * 获取资源实体类.
     *
     * @return string
     */
    abstract protected function getResourceClass();

    /**
     * {@inheritdoc}
     */
    protected function supports($attribute, $subject)
    {
        $entityClass = $this->getResourceClass();
        return in_array($attribute, $this->actions)
            && $subject instanceof $entityClass;
    }

    /**
     * {@inheritdoc}
     */
    protected function voteOnAttribute($attribute, $subject, TokenInterface $token)
    {
        $user = $token->getUser();
        $this->hasAuthenticatedUser = $user instanceof UserInterface;
        //没有登录的用户不允许
        if (!$this->hasAuthenticatedUser) {
            return false;
        }
        if ($this->accessDecisionManager->decide($token, ['ROLE_ADMIN'])) {
            return true;
        }
        $result = false;
        switch ($attribute) {
            case static::ACTION_VIEW:
                $result = $this->canView($subject, $user);
                break;
            case static::ACTION_EDIT:
                $result = $this->canEdit($subject, $user);
                break;
        }
        return $result;
    }

    /**
     * 如果资源已经公开，或者资源属于该用户则公开查看.
     *
     * @param mixed         $entity
     * @param UserInterface $user
     *
     * @return bool
     */
    protected function canView($entity, UserInterface $user)
    {
        return $this->canEdit($entity, $user) || $entity->isEnabled();
    }

    /**
     * @param mixed  $entity
     * @param UserInterface $user
     *
     * @return bool
     */
    protected function canEdit($entity, UserInterface $user)
    {
        return method_exists($entity, 'isBelongsTo') && $entity->isBelongsTo($user);
    }
}
