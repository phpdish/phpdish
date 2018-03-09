<?php

namespace PHPDish\Bundle\CoreBundle\Command;

use Doctrine\Bundle\DoctrineBundle\Registry;
use Doctrine\ORM\EntityManager;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

class DumpEntityCommand extends ContainerAwareCommand
{
    const MAP = [
        'post' => 'PHPDish\Bundle\PostBundle\Entity\Post',
        'category' => 'PHPDish\Bundle\PostBundle\Entity\Category',
        'comment' => 'PHPDish\Bundle\PostBundle\Entity\Comment',

        'thread' => 'PHPDish\Bundle\ForumBundle\Entity\Thread',
        'topic' => 'PHPDish\Bundle\ForumBundle\Entity\Topic',
        'reply' => 'PHPDish\Bundle\ForumBundle\Entity\Reply',

        'user' => 'PHPDish\Bundle\UserBundle\Entity\User',
        'notification' => 'PHPDish\Bundle\NotificationBundle\Entity\Notification',

        'wallet' => 'PHPDish\Bundle\PaymentBundle\Entity\Wallet',
        'payment' => 'PHPDish\Bundle\PaymentBundle\Entity\Payment',
    ];

    /**
     * @var Registry
     */
    protected $doctrine;

    /**
     * {@inheritdoc}
     */
    public function configure()
    {
        $this->setName('phpdish:entity:dump')
            ->addArgument('entity', InputArgument::OPTIONAL, '要打印的实体')
            ->addOption('export', null, InputOption::VALUE_NONE, '输出markdown文件')
            ->addOption('all', null, InputOption::VALUE_NONE, '打印所有');
    }

    /**
     * {@inheritdoc}
     */
    public function execute(InputInterface $input, OutputInterface $output)
    {
        if ($input->getOption('all')) {
            foreach (static::MAP as $alias => $entity) {
                $metadata = $this->getEntityManager()->getClassMetadata($entity);
                $this->handleOutput($entity, $metadata, $input, $output);
            }
        } else {
            $entity = $input->getArgument('entity');
            if (!$entity) {
                throw new \InvalidArgumentException(sprintf('Argument "Entity" is required'));
            }
            if (isset(static::MAP[$entity]) && class_exists(static::MAP[$entity])) {
                $entity = static::MAP[$entity];
            }
            if (!class_exists($entity)) {
                throw new \InvalidArgumentException(sprintf("[%s] is not exists", $entity));
            }
            $metadata = $this->getEntityManager()->getClassMetadata($entity);
            $this->handleOutput($entity, $metadata, $input, $output);
        }
    }

    protected function handleOutput($entity, $metadata, $input, $output)
    {
        $rows = $this->handleEntityMetadata($metadata);
        $headers = ['属性名', '字段名', '类型', '是否可以为空', '说明'];
        if ($input->getOption('export')) {
            array_unshift($rows, $headers, [
                '---',
                '---',
                '---',
                '---',
            ]);

            $markdownString = implode("\r\n", array_map(function($row){
                return '| ' . implode(' | ', $row) . '|';
            }, $rows));

            $filename = str_replace('\\', '-', $entity);
            file_put_contents(getcwd() . '/' . $filename . '.md', $markdownString);
        } else {
            $style = new SymfonyStyle($input, $output);
            $style->table($headers, $rows);
        }
    }

    protected function handleEntityMetadata(\Doctrine\ORM\Mapping\ClassMetadata $metadata)
    {
        $rows = [];

        foreach ($metadata->fieldMappings as $fieldMapping) {
            $rows[] = [
                $fieldMapping['fieldName'],
                $fieldMapping['columnName'],
                $fieldMapping['type'] . (isset($fieldMapping['length']) ? "({$fieldMapping['length']})" : ''),
                (isset($fieldMapping['nullable']) && $fieldMapping['nullable'] === true) ? '是' : '否',
                ''
            ];
        }

        foreach ($metadata->associationMappings as $associationMapping) {
            $rows[] = [
                $associationMapping['fieldName'],
                '-',
                $associationMapping['targetEntity'],
               '-',
                ''
            ];
        }

        return $rows;
    }

    /**
     * @return EntityManager
     */
    protected function getEntityManager()
    {
        return $this->getContainer()->get('doctrine.orm.entity_manager');
    }
}