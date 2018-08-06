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

use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\EntityManagerInterface;
use PHPDish\Bundle\CoreBundle\Service\PaginatorTrait;
use PHPDish\Bundle\PostBundle\Event\Events;
use PHPDish\Bundle\PostBundle\Event\PostPersistEvent;
use PHPDish\Bundle\PostBundle\Event\VotePostEvent;
use PHPDish\Bundle\PostBundle\Model\CategoryInterface;
use PHPDish\Bundle\ResourceBundle\Service\ServiceManagerInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;
use PHPDish\Bundle\PostBundle\Model\PostInterface;
use Knp\Bundle\MarkdownBundle\MarkdownParserInterface;

class PostManager implements PostManagerInterface, ServiceManagerInterface
{
    use PaginatorTrait;

    /**
     * @var EventDispatcherInterface
     */
    protected $eventDispatcher;

    /**
     * @var EntityManagerInterface
     */
    protected $entityManager;

    /**
     * @var MarkdownParserInterface
     */
    protected $markdownParser;

    protected $postEntity;

    public function __construct(
        $postEntity,
        EntityManagerInterface $entityManager,
        EventDispatcherInterface $eventDispatcher,
        MarkdownParserInterface $markdownParser
    ) {
        $this->postEntity = $postEntity;
        $this->eventDispatcher = $eventDispatcher;
        $this->entityManager = $entityManager;
        $this->markdownParser = $markdownParser;
    }

    /**
     * {@inheritdoc}
     */
    public function createPost(UserInterface $user)
    {
        $post = new $this->postEntity;
        $post->setUser($user);

        return $post;
    }

    /**
     * {@inheritdoc}
     */
    public function savePost(PostInterface $post)
    {
        if (!$post->getId()) {
            $post->getCategory()->setPostCount($post->getCategory()->getPostCount() + 1);
        }
        //Transform markdown format body
        if ($post->getOriginalBody()) {
            $post->setBody($this->markdownParser->transformMarkdown($post->getOriginalBody()));
        }
        $event = new PostPersistEvent($post);
        $this->eventDispatcher->dispatch(Events::POST_PRE_PERSIST, $event);

        if ($event->isPersistenceAborted()) {
            return false;
        }
        $this->entityManager->persist($post);
        $this->entityManager->flush();

        return true;
    }

    /**
     * {@inheritdoc}
     */
    public function findPostById($id)
    {
        return $this->getPostRepository()
            ->find($id);
    }

    /**
     * {@inheritdoc}
     */
    public function findPosts(Criteria $criteria)
    {
        return $this->getPostRepository()->createQueryBuilder('p')
            ->addCriteria($criteria)
            ->getQuery()
            ->getResult();
    }

    /**
     * {@inheritdoc}
     */
    public function findPostsPager(Criteria $criteria, $page = 1, $limit = null)
    {
        $query = $this->getPostRepository()->createQueryBuilder('p')
            ->addCriteria($criteria)
            ->getQuery();

        return $this->createPaginator($query, $page, $limit);
    }

    /**
     * {@inheritdoc}
     */
    public function findUserEnabledPosts(UserInterface $user, $page = 1, $limit = null)
    {
        $criteria = Criteria::create()
            ->where(Criteria::expr()->eq('user', $user))
            ->andWhere(Criteria::expr()->eq('enabled', true))
            ->orderBy(['createdAt' => 'desc']);

        return $this->findPostsPager($criteria, $page, $limit);
    }

    /**
     * {@inheritdoc}
     */
    public function findCategoryPosts(CategoryInterface $category, $page = 1, $limit = null)
    {
        $criteria = Criteria::create()->where(Criteria::expr()->eq('category', $category->getId()));

        return $this->findPostsPager($criteria, $page, $limit);
    }

    /**
     * {@inheritdoc}
     */
    public function findLatestEnabledPosts($page, $limit = null)
    {
        $criteria = Criteria::create()
            ->where(Criteria::expr()->eq('enabled', true))
            ->andWhere(Criteria::expr()->neq('body', ''))
            ->orderBy(['createdAt' => 'desc']);

        return $this->findPostsPager($criteria, $page, $limit);
    }

    /**
     * {@inheritdoc}
     */
    public function blockPost(PostInterface $post)
    {
        $post->disable();
        $this->entityManager->persist($post);
        $this->entityManager->flush();
    }

    /**
     * {@inheritdoc}
     */
    public function increasePostViews(PostInterface $post, $views = 1)
    {
        $post->addViewCount($views);
        $this->entityManager->persist($post);
        $this->entityManager->flush();
    }

    /**
     * {@inheritdoc}
     */
    public function getUserPostCount(UserInterface $user, $ignoreEmptyPost = true)
    {
        $qb = $this->getPostRepository()->createQueryBuilder('p');
        $qb->select($qb->expr()->count('p'))
            ->where('p.enabled = :enabled')->setParameter('enabled', true)
            ->andWhere('p.user = :user')->setParameter('user', $user);
        if ($ignoreEmptyPost) {
            $qb->andWhere('p.originalBody is not null');
        }
        return $qb->getQuery()->getSingleScalarResult();
    }

    /**
     * {@inheritdoc}
     */
    public function addVoter(PostInterface $post, UserInterface $user)
    {
        $post->addVoter($user)
            ->addVoteCount();
        $this->entityManager->persist($post);
        $this->entityManager->flush();

        //触发事件
        $this->eventDispatcher->dispatch(Events::POST_VOTED,
            new VotePostEvent($post, $user)
        );
    }

    /**
     * {@inheritdoc}
     */
    public function removeVoter(PostInterface $post, UserInterface $user)
    {
        $post->removeVoter($user)
            ->addVoteCount(-1);
        $this->entityManager->persist($post);
        $this->entityManager->flush();
    }

    /**
     * {@inheritdoc}
     */
    public function getPostRepository()
    {
        return $this->entityManager->getRepository($this->postEntity);
    }

    /**
     * {@inheritdoc}
     */
    public static function getSubscribedEntities()
    {
        return [
            'postEntity' => PostInterface::class
        ];
    }
}
