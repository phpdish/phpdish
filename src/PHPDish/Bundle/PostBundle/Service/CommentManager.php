<?php

namespace PHPDish\Bundle\PostBundle\Service;

use Carbon\Carbon;
use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use PHPDish\Bundle\CoreBundle\Service\PaginatorTrait;
use PHPDish\Bundle\PostBundle\Model\Comment;
use PHPDish\Bundle\PostBundle\Event\CommentMentionUserEvent;
use PHPDish\Bundle\PostBundle\Event\Events;
use PHPDish\Bundle\PostBundle\Event\VoteCommentEvent;
use PHPDish\Bundle\PostBundle\Model\CommentInterface;
use PHPDish\Bundle\PostBundle\Model\PostInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;
use PHPDish\Bundle\CmsBundle\BodyProcessor\BodyProcessorInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;

class CommentManager implements CommentManagerInterface
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

    public function __construct(
        EntityManagerInterface $entityManager,
        EventDispatcherInterface $eventDispatcher,
        BodyProcessorInterface $bodyProcessor
    ) {
        $this->entityManager = $entityManager;
        $this->eventDispatcher = $eventDispatcher;
//        $this->commentRepository = $entityManager->getRepository('PHPDishPostBundle:Comment');
        $this->bodyProcessor = $bodyProcessor;
    }

    /**
     * {@inheritdoc}
     */
    public function findCommentById($id)
    {
        return $this->commentRepository->find($id);
    }

    /**
     * {@inheritdoc}
     */
    public function findCommentsPager(Criteria $criteria, $page = 1, $limit = null)
    {
        $query = $this->commentRepository->createQueryBuilder('c')
            ->addCriteria($criteria)
            ->getQuery();

        return $this->createPaginator($query, $page, $limit);
    }

    /**
     * {@inheritdoc}
     */
    public function findComments(Criteria $criteria)
    {
        return $this->commentRepository->createQueryBuilder('c')
            ->addCriteria($criteria)
            ->getQuery()
            ->getResult();
    }


    /**
     * {@inheritdoc}
     */
    public function createComment(PostInterface $post, UserInterface $user)
    {
        $comment = new Comment();
        $comment->setPost($post)->setUser($user)
            ->setCreatedAt(Carbon::now());
        $post->increaseCommentCount();

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
        return $this->commentRepository;
    }
}
