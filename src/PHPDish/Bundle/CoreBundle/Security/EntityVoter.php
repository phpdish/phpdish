<?php

namespace PHPDish\Bundle\CoreBundle\Security;

use PHPDish\Bundle\UserBundle\Model\UserInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\AccessDecisionManagerInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

abstract class EntityVoter extends Voter
{
    const ACTION_VIEW = 'view';

    const ACTION_EDIT = 'edit';

    protected $accessDecisionManager;

    public function __construct(AccessDecisionManagerInterface $accessDecisionManager)
    {
        $this->accessDecisionManager = $accessDecisionManager;
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

        return in_array($attribute, [static::ACTION_VIEW, static::ACTION_EDIT])
            && $subject instanceof $entityClass;
    }

    /**
     * {@inheritdoc}
     */
    protected function voteOnAttribute($attribute, $subject, TokenInterface $token)
    {
        $user = $token->getUser();
        if (!$user instanceof UserInterface) {
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
     * @param mixed         $entity
     * @param UserInterface $user
     *
     * @return bool
     */
    protected function canEdit($entity, UserInterface $user)
    {
        return $entity->isBelongsTo($user);
    }
}
