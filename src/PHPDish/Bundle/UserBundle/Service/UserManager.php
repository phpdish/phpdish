<?php

namespace PHPDish\Bundle\UserBundle\Service;

use Carbon\Carbon;
use Doctrine\Common\Collections\Criteria;
use FOS\UserBundle\Doctrine\UserManager as BaseUserManager;
use PHPDish\Bundle\CoreBundle\Service\PaginatorTrait;
use PHPDish\Bundle\ForumBundle\Model\ReplyInterface;
use PHPDish\Bundle\ForumBundle\Model\TopicInterface;
use PHPDish\Bundle\PostBundle\Model\CategoryInterface;
use PHPDish\Bundle\PostBundle\Model\CommentInterface;
use PHPDish\Bundle\PostBundle\Model\PostInterface;
use PHPDish\Bundle\UserBundle\Entity\User;
use PHPDish\Bundle\UserBundle\Event\Events;
use PHPDish\Bundle\UserBundle\Event\UserFollowedEvent;
use PHPDish\Bundle\UserBundle\Model\UserInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;

class UserManager extends BaseUserManager implements UserManagerInterface
{
    use PaginatorTrait;

    /**
     * @var EventDispatcherInterface
     */
    protected $eventDispatcher;

    /**
     * @param EventDispatcherInterface $eventDispatcher
     */
    public function setEventDispatcher($eventDispatcher)
    {
        $this->eventDispatcher = $eventDispatcher;
    }

    /**
     * {@inheritdoc}
     */
    public function createUser()
    {
        $user = new User();
        $user->setCreatedAt(Carbon::now());

        return $user;
    }

    /**
     * {@inheritdoc}
     */
    public function saveUser(UserInterface $user)
    {
        $user->setUpdatedAt(Carbon::now());
        $this->objectManager->persist($user);
        $this->objectManager->flush();

        return true;
    }

    /**
     * {@inheritdoc}
     */
    public function findUserByName($username)
    {
        return $this->findUserByUsername($username);
    }

    /**
     * {@inheritdoc}
     */
    public function findUserById($id)
    {
        return $this->findUserBy(['id' => $id]);
    }

    /**
     * {@inheritdoc}
     */
    public function getLatestUsersQuery($limit)
    {
        return $this->getRepository()->createQueryBuilder('u')
            ->orderBy('u.createdAt', 'desc')
            ->setMaxResults($limit)
            ->getQuery();
    }

    /**
     * {@inheritdoc}
     */
    public function findLatestUsers($limit, $caching = false)
    {
        $query = $this->getLatestUsersQuery($limit);
        if ($caching) {
            $query->useResultCache(true);
        }
        return $query->getResult();
    }

    /**
     * {@inheritdoc}
     */
    public function findUsersByNames($userNames)
    {
        $qb = $this->getRepository()->createQueryBuilder('u');

        return $qb->where($qb->expr()->in('u.username', $userNames))->getQuery()->getResult();
    }

    /**
     * {@inheritdoc}
     */
    public function findUserFollowing(UserInterface $user, $page, $limit = null)
    {
        $query = $this->getRepository()->createQueryBuilder('u')
            ->innerJoin('u.followers', 'f')
            ->where('f.id = :userId')->setParameter('userId', $user->getId())
            ->getQuery();

        return $this->createPaginator($query, $page, $limit);
    }

    /**
     * {@inheritdoc}
     */
    public function findUserFollowers(UserInterface $user, $page, $limit = null)
    {
        $query = $this->getRepository()->createQueryBuilder('u')
            ->innerJoin('u.following', 'f')
            ->where('f.id = :userId')->setParameter('userId', $user->getId())
            ->getQuery();

        return $this->createPaginator($query, $page, $limit);
    }

    /**
     * {@inheritdoc}
     */
    public function findCategoryFollowers(CategoryInterface $category, $page, $limit = null)
    {
        $query = $this->getRepository()->createQueryBuilder('u')
            ->innerJoin('u.followingCategories', 'f')
            ->where('f.id = :categoryId')->setParameter('categoryId', $category->getId())
            ->getQuery();

        return $this->createPaginator($query, $page, $limit);
    }

    /**
     * {@inheritdoc}
     */
    public function findTopicVoters(TopicInterface $topic, $page, $limit = null)
    {
        $query = $this->getRepository()->createQueryBuilder('u')
            ->innerJoin('u.votedTopics', 'vt')
            ->where('vt.id = :topicId')->setParameter('topicId', $topic->getId())
            ->getQuery();

        return $this->createPaginator($query, $page, $limit);
    }

    /**
     * {@inheritdoc}
     */
    public function findTopicReplyVoters(ReplyInterface $reply, $page, $limit = null)
    {
        $query = $this->getRepository()->createQueryBuilder('u')
            ->innerJoin('u.votedReplies', 'vr')
            ->where('vr.id = :replyId')->setParameter('replyId', $reply->getId())
            ->getQuery();

        return $this->createPaginator($query, $page, $limit);
    }

    /**
     * {@inheritdoc}
     */
    public function findPostVoters(PostInterface $post, $page, $limit = null)
    {
        $query = $this->getRepository()->createQueryBuilder('u')
            ->innerJoin('u.votedPosts', 'vp')
            ->where('vp.id = :postId')->setParameter('postId', $post->getId())
            ->getQuery();

        return $this->createPaginator($query, $page, $limit);
    }

    /**
     * {@inheritdoc}
     */
    public function findCommentVoters(CommentInterface $comment, $page, $limit = null)
    {
        $query = $this->getRepository()->createQueryBuilder('u')
            ->innerJoin('u.votedComments', 'vc')
            ->where('vc.id = :commentId')->setParameter('commentId', $comment->getId())
            ->getQuery();

        return $this->createPaginator($query, $page, $limit);
    }

    /**
     * {@inheritdoc}
     */
    public function followUser(UserInterface $user, UserInterface $follower)
    {
        if ($user->getId() == $follower->getId()) {
            throw new \LogicException('你不能关注你自己');
        }
        $user->addFollower($follower);
        $user->setFollowerCount($user->getFollowerCount() + 1);
        $follower->setFollowingCount($follower->getFollowingCount() + 1);

        $this->objectManager->persist($user);
        $this->objectManager->persist($follower);
        $this->objectManager->flush();

        //触发事件
        $this->eventDispatcher->dispatch(Events::USER_FOLLOWEd, new UserFollowedEvent($user, $follower));

        return true;
    }

    /**
     * {@inheritdoc}
     */
    public function unFollowUser(UserInterface $user, UserInterface $follower)
    {
        $user->removeFollower($follower);
        $user->setFollowerCount($user->getFollowerCount() - 1);
        $follower->setFollowingCount($follower->getFollowingCount() - 1);
        $this->objectManager->persist($user);
        $this->objectManager->persist($follower);
        $this->objectManager->flush();

        return true;
    }

    /**
     * {@inheritdoc}
     */
    public function checkEmailExist($email)
    {
        return (bool) $this->findUserByEmail($email);
    }

    /**
     * {@inheritdoc}
     */
    public function checkUsernameExist($username)
    {
        return (bool) $this->findUserByUsername($username);
    }

    /**
     * {@inheritdoc}
     */
    public function getUserRepository()
    {
        return $this->getRepository();
    }

    /**
     * {@inheritdoc}
     */
    public function findUsersByCriteria(Criteria $criteria)
    {
        return $this->getRepository()->createQueryBuilder('u')
            ->addCriteria($criteria)
            ->getQuery()
            ->getResult();
    }

    /**
     * {@inheritdoc}
     */
    public function findUsersPager(Criteria $criteria, $page, $limit = null)
    {
        $query = $this->getRepository()->createQueryBuilder('u')
            ->addCriteria($criteria)
            ->getQuery();
        return $this->createPaginator($query, $page, $limit);
    }
}
