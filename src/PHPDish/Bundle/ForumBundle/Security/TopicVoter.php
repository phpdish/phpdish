<?php

namespace PHPDish\Bundle\ForumBundle\Security;

use PHPDish\Bundle\ForumBundle\Model\TopicInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\AccessDecisionManagerInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

class TopicVoter extends Voter
{
    const ACTION_VIEW = 'view';

    const ACTION_EDIT = 'edit';

    protected $accessDecisionManager;

    public function __construct(AccessDecisionManagerInterface $accessDecisionManager)
    {
        $this->accessDecisionManager = $accessDecisionManager;
    }

    /**
     * {@inheritdoc}
     */
    protected function supports($attribute, $subject)
    {
        return in_array($attribute, [static::ACTION_VIEW, static::ACTION_EDIT])
            && $subject instanceof TopicInterface;
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

        if ($this->accessDecisionManager->decide($token, ['ROLE_SUPER_ADMIN'])) {
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
     * 如果话题已经公开，或者话题属于该用户则公开查看.
     *
     * @param TopicInterface $topic
     * @param UserInterface  $user
     *
     * @return bool
     */
    protected function canView(TopicInterface $topic, UserInterface $user)
    {
        return $this->canEdit($topic, $user) || $topic->isEnabled();
    }

    /**
     * @param TopicInterface $topic
     * @param UserInterface  $user
     *
     * @return bool
     */
    protected function canEdit(TopicInterface $topic, UserInterface $user)
    {
        return $topic->isBelongsTo($user);
    }
}
