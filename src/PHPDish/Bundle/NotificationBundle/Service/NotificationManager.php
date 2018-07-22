<?php

namespace PHPDish\Bundle\NotificationBundle\Service;

use Carbon\Carbon;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use PHPDish\Bundle\CoreBundle\Service\PaginatorTrait;
use PHPDish\Bundle\ForumBundle\Model\ReplyInterface;
use PHPDish\Bundle\ForumBundle\Model\TopicInterface;
use PHPDish\Bundle\NotificationBundle\Entity\Notification;
use PHPDish\Bundle\NotificationBundle\Model\NotificationInterface;
use PHPDish\Bundle\PaymentBundle\Model\PaymentInterface;
use PHPDish\Bundle\PostBundle\Model\CategoryInterface;
use PHPDish\Bundle\PostBundle\Model\CommentInterface;
use PHPDish\Bundle\PostBundle\Model\PostInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;
use Symfony\Component\Translation\TranslatorInterface;

class NotificationManager implements NotificationManagerInterface
{
    use PaginatorTrait;

    /**
     * @var EntityManagerInterface
     */
    protected $entityManager;

    /**
     * @var EntityRepository
     */
    protected $notificationRepository;

    /**
     * @var TranslatorInterface
     */
    protected $translator;

    public function __construct(
        EntityManagerInterface $entityManager,
        TranslatorInterface $translator
    ) {
        $this->entityManager = $entityManager;
        $this->translator = $translator;
        $this->notificationRepository = $entityManager->getRepository('PHPDishNotificationBundle:Notification');
    }

    /**
     * {@inheritdoc}
     */
    public function createFollowUserNotification(UserInterface $user, UserInterface $follower)
    {
        $notification = $this->createNotification();
        $notification->setUser($user)->setFromUser($follower)->setSubject(Notification::SUBJECT_FOLLOW_USER);
        $this->saveNotification($notification);

        return $notification;
    }

    /**
     * {@inheritdoc}
     */
    public function createReplyTopicNotification(TopicInterface $topic, ReplyInterface $reply)
    {
        $notification = $this->createNotification();
        $notification->setUser($topic->getUser())
            ->setTopic($topic)
            ->setReply($reply)
            ->setMessage($reply->getBody())
            ->setFromUser($reply->getUser())
            ->setSubject(Notification::SUBJECT_REPLY_TOPIC);
        $this->saveNotification($notification);

        return $notification;
    }

    /**
     * {@inheritdoc}
     */
    public function createCommentPostNotification(PostInterface $post, CommentInterface $comment)
    {
        $notification = $this->createNotification();
        $notification->setUser($post->getUser())
            ->setPost($post)
            ->setComment($comment)
            ->setMessage($comment->getBody())
            ->setFromUser($comment->getUser())
            ->setSubject(Notification::SUBJECT_COMMENT_POST);
        $this->saveNotification($notification);

        return $notification;
    }

    /**
     * {@inheritdoc}
     */
    public function createMentionUserInPostNotification(UserInterface $user, CommentInterface $comment)
    {
        $notification = $this->createNotification();
        $notification->setUser($user)
            ->setPost($comment->getPost())
            ->setComment($comment)
            ->setMessage($comment->getBody())
            ->setFromUser($comment->getUser())
            ->setSubject(Notification::SUBJECT_MENTION_USER_IN_POST);
        $this->saveNotification($notification);

        return $notification;
    }

    /**
     * {@inheritdoc}
     */
    public function createAtUserInTopicNotification(UserInterface $user, ReplyInterface $reply)
    {
        $notification = $this->createNotification();
        $notification->setUser($user)
            ->setTopic($reply->getTopic())
            ->setReply($reply)
            ->setMessage($reply->getBody())
            ->setFromUser($reply->getUser())
            ->setSubject(Notification::SUBJECT_MENTION_USER_IN_TOPIC);
        $this->saveNotification($notification);

        return $notification;
    }

    /**
     * {@inheritdoc}
     */
    public function createFollowCategoryNotification(CategoryInterface $category, UserInterface $user)
    {
        $notification = $this->createNotification();
        $notification->setUser($category->getCreator())
            ->setCategory($category)
            ->setFromUser($user)
            ->setSubject(Notification::SUBJECT_FOLLOW_CATEGORY);
        $this->saveNotification($notification);

        return $notification;
    }

    /**
     * {@inheritdoc}
     */
    public function createWithdrawNotification(PaymentInterface $payment)
    {
        $message = $payment->getStatus() === PaymentInterface::STATUS_OK
            ? $this->translator->trans('withdraw.your_withdraw_was_approved', ['%payment%' => $payment->getDescription()])
            : $this->translator->trans('withdraw.your_withdraw_was_declined', ['%payment%' => $payment->getDescription()]);

        $notification = $this->createNotification();
        $notification->setUser($payment->getUser())
            ->setPayment($payment)
            ->setMessage($message)
            ->setSubject(Notification::SUBJECT_HANDLE_WITHDRAW);
        $this->saveNotification($notification);

        return $notification;
    }

    /**
     * {@inheritdoc}
     */
    public function createVoteTopicNotification(TopicInterface $topic, UserInterface $user)
    {
        $notification = $this->createNotification();
        $notification->setUser($topic->getUser())
            ->setTopic($topic)
            ->setFromUser($user)
            ->setMessage($topic->getBody())
            ->setSubject(Notification::SUBJECT_VOTE_TOPIC);
        $this->saveNotification($notification);

        return $notification;
    }

    /**
     * {@inheritdoc}
     */
    public function createVoteReplyNotification(TopicInterface $topic, ReplyInterface $reply, UserInterface $user)
    {
        $notification = $this->createNotification();
        $notification->setUser($reply->getUser())
            ->setTopic($topic)
            ->setReply($reply)
            ->setFromUser($user)
            ->setMessage($reply->getBody())
            ->setSubject(Notification::SUBJECT_VOTE_REPLY);
        $this->saveNotification($notification);

        return $notification;
    }

    /**
     * {@inheritdoc}
     */
    public function createVotePostNotification(PostInterface $post, UserInterface $user)
    {
        $notification = $this->createNotification();
        $notification->setUser($post->getUser())
            ->setPost($post)
            ->setFromUser($user)
            ->setMessage($post->getBody())
            ->setSubject(Notification::SUBJECT_VOTE_POST);
        $this->saveNotification($notification);

        return $notification;
    }

    /**
     * {@inheritdoc}
     */
    public function createVoteCommentNotification(PostInterface $post, CommentInterface $comment, UserInterface $user)
    {
        $notification = $this->createNotification();
        $notification->setUser($comment->getUser())
            ->setPost($post)
            ->setComment($comment)
            ->setFromUser($user)
            ->setMessage($comment->getBody())
            ->setSubject(Notification::SUBJECT_VOTE_COMMENT);
        $this->saveNotification($notification);

        return $notification;
    }

    /**
     * {@inheritdoc}
     */
    public function createNotification()
    {
        $notification = new Notification();
        $notification->setCreatedAt(Carbon::now());

        return $notification;
    }

    /**
     * {@inheritdoc}
     */
    public function saveNotification(NotificationInterface $notification)
    {
        $this->entityManager->persist($notification);
        $this->entityManager->flush();
    }

    /**
     * {@inheritdoc}
     */
    public function getUserUnSeenNotificationCount(UserInterface $user)
    {
        $qb = $this->notificationRepository->createQueryBuilder('n');

        return $qb->select($qb->expr()->count('n'))
            ->where('n.user = :userId')->setParameter('userId', $user)
            ->andWhere('n.seen = :seen')->setParameter('seen', false)
            ->getQuery()
            ->getSingleScalarResult();
    }

    /**
     * {@inheritdoc}
     */
    public function findUserNotifications(UserInterface $user, $page, $limit = null)
    {
        $query = $this->notificationRepository->createQueryBuilder('n')
            ->where('n.user = :userId')->setParameter('userId', $user)
            ->orderBy('n.createdAt', 'desc')
            ->getQuery();

        return $this->createPaginator($query, $page, $limit);
    }

    /**
     * {@inheritdoc}
     */
    public function readNotifications($notifications)
    {
        $notificationIds = [];
        foreach ($notifications as $notification) {
            $notificationIds[] = $notification->getId();
        }
        if (!$notificationIds) {
            return;
        }
        $qb = $this->entityManager->createQueryBuilder();
        $qb->update('PHPDishNotificationBundle:Notification', 'n')
            ->set('n.seen', true)
            ->where($qb->expr()->in('n.id', $notificationIds))
            ->getQuery()
            ->execute();
    }
}
