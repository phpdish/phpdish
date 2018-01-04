<?php

namespace PHPDish\Bundle\ForumBundle\Form\DataTransformer;

use Overtrue\Pinyin\Pinyin;
use PHPDish\Bundle\ForumBundle\Model\ThreadInterface;
use PHPDish\Bundle\ForumBundle\Service\ThreadManagerInterface;
use Symfony\Component\Form\DataTransformerInterface;
use Symfony\Component\Form\Exception\UnexpectedTypeException;

class StringToThreadsTransformer implements DataTransformerInterface
{
    /**
     * @var ThreadManagerInterface
     */
    protected $threadManager;

    public function __construct(ThreadManagerInterface $threadManager)
    {
        $this->threadManager = $threadManager;
    }

    /**
     * @param ThreadManagerInterface $threadManager
     */
    public function setThreadManager($threadManager)
    {
        $this->threadManager = $threadManager;
    }

    /**
     * {@inheritdoc}
     */
    public function transform($value)
    {
        if (null === $value) {
            return '';
        }
        $threadNames = [];
        foreach ($value as $thread) {
            if (!$thread instanceof ThreadInterface) {
                throw new UnexpectedTypeException($thread, ThreadInterface::class);
            }
            $threadNames[] = $thread->getName();
        }
        return implode(',', $threadNames);
    }

    /**
     * {@inheritdoc}
     */
    public function reverseTransform($value)
    {
        if (null === $value || '' === $value) {
            return null;
        }

        $threadNames = array_unique(array_filter(array_map('trim', explode(',', $value))));
        if (count($threadNames) === 0) {
            return null;
        }
        $threads =  $this->threadManager->findThreadsByNames($threadNames);
        $existingThreadNames = array_map(function(ThreadInterface $thread){
            return $thread->getName();
        }, $threads);

        //创建新的thread
        $nonExistThreads = $this->threadManager->createThreadsByNames(array_diff($threadNames, $existingThreadNames));
        return array_slice(array_merge($threads, $nonExistThreads), 0, 5); //只要五个
    }
}