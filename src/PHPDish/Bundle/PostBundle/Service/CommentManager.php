<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\PostBundle\Service;

use Carbon\Carbon;
use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use PHPDish\Bundle\CoreBundle\Service\PaginatorTrait;
use PHPDish\Bundle\PostBundle\Event\CommentMentionUserEvent;
use PHPDish\Bundle\PostBundle\Event\Events;
use PHPDish\Bundle\PostBundle\Event\VoteCommentEvent;
use PHPDish\Bundle\PostBundle\Model\CommentInterface;
use PHPDish\Bundle\PostBundle\Model\PostInterface;
use PHPDish\Bundle\ResourceBundle\Service\ServiceManagerInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;
use PHPDish\Bundle\CmsBundle\BodyProcessor\BodyProcessorInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;

class CommentManager implements CommentManagerInterface, ServiceManagerInterface
{
    use PaginatorTrait;

    /**
     * @var EntityManagerInterface
     */
    protected $entityManager;

    /**
     * @var EntityRepository
     */
    protected $commentRepository;

    /**
     * @var EventDispatcherInterface
     */
    protected $eventDispatcher;

    /**
     * @var BodyProcessorInterface
     */
    protected $bodyProcessor;

    protected $commentEntity;

    public function __construct(
        $commentEntity,
        EntityManagerInterface $entityManager,
        EventDispatcherInterface $eventDispatcher,
        BodyProcessorInterface $bodyProcessor
    ) {
        $this->commentEntity = $commentEntity;
        $this->entityManager = $entityManager;
        $this->eventDispatcher = $eventDispatcher;
        $this->bodyProcessor = $bodyProcessor;
    }

    /**
     * {@inheritdoc}
     */
    public function findCommentById($id)
    {
        return $this->getCommentRepository()->find($id);
    }

    /**
     * {@inheritdoc}
     */
    public function findCommentsPager(Criteria $criteria, $page = 1, $limit = null)
    {
        $query = $this->getCommentRepository()->createQueryBuilder('c')
            ->addCriteria($criteria)
            ->getQuery();

        return $this->createPaginator($query, $page, $limit);
    }

    /**
     * {@inheritdoc}
     */
    public function findComments(Criteria $criteria)
    {
        return $this->getCommentRepository()->createQueryBuilder('c')
            ->addCriteria($criteria)
            ->getQuery()
            ->getResult();
    }


    /**
     * {@inheritdoc}
     */
    public function createComment(PostInterface $post, UserInterface $user)
    {
        $comment = new $this->commentEntity;
        $comment->setPost($post)->setUser($user);
        $post->addCommentCount();
        return $comment;
    }

    /**
     * {@inheritdoc}
     */
    public function saveComment(CommentInterface $comment)
    {
        $new = !$comment->getId();
        $parsedBody = $this->bodyProcessor->process($comment->getOriginalBody());

        $comment->setUpdatedAt(Carbon::now())
            ->setBody($parsedBody);
        $this->entityManager->persist($comment);
        $this->entityManager->flush();

        //如果评论中有艾特用户则触发事件
        $mentionParser = $this->bodyProcessor->getMentionParser();
        if ($new && $mentionParser->getMentionedUsers()) {
            $this->eventDispatcher->dispatch(Events::USER_MENTIONED_COMMENT, new CommentMentionUserEvent(
                $comment,
                $mentionParser->getMentionedUsers()
            ));
        }

        return true;
    }

    /**
     * {@inheritdoc}
     */
    public function blockComment(CommentInterface $comment)
    {
        $comment->disable();
        $this->saveComment($comment);
    }

    /**
     * {@inheritdoc}
     */
    public function addVoter(CommentInterface $comment, UserInterface $user)
    {
        $comment->addVoter($user)
            ->addVoteCount();
        $this->entityManager->persist($comment);
        $this->entityManager->flush();

        //触发事件
        $this->eventDispatcher->dispatch(Events::COMMENT_VOTED,
            new VoteCommentEvent($comment->getPost(), $comment, $user)
        );
    }

    /**
     * {@inheritdoc}
     */
    public function removeVoter(CommentInterface $comment, UserInterface $user)
    {
        $comment->removeVoter($user)
            ->addVoteCount(-1);
        $this->entityManager->persist($comment);
        $this->entityManager->flush();
    }

    /**
     * {@inheritdoc}
     */
    public function getCommentRepository()
    {
        if ($this->commentRepository) {
            return $this->commentRepository;
        }
        return $this->entityManager->getRepository($this->commentEntity);
    }

    /**
     * {@inheritdoc}
     */
    public static function getSubscribedEntities()
    {
        return [
            'commentEntity' => CommentInterface::class
        ];
    }
}
