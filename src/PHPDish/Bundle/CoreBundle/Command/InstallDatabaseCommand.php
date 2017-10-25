<?php

namespace PHPDish\Bundle\CoreBundle\Command;

use Doctrine\DBAL\Connection;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Helper\ProgressBar;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Question\ConfirmationQuestion;
use Symfony\Component\Console\Style\SymfonyStyle;

class InstallDatabaseCommand extends AbstractInstallCommand
{
    /**
     * 需要执行的命令
     * @var array
     */
    protected $commands = [
        1 => [
            'command' => 'doctrine:database:create',
            'options' => [
                ' --if-not-exists' => true
            ]
        ],
        3 => 'doctrine:migrations:migrate',
        5 => 'cache:clear',
    ];
    /**
     * {@inheritdoc}
     */
    protected function configure()
    {
        $this
            ->setName('phpdish:install:database')
            ->setDescription('Install PHPDish database.')
            ->setHelp(<<<EOT
The <info>%command.name%</info> command creates PHPDish database.
EOT
            );
    }

    /**
     * {@inheritdoc}
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $outputStyle = new SymfonyStyle($input, $output);
        $outputStyle->writeln('Creating PHPDish database.');

        //如果数据表存在，则询问是否重置
        if ($this->isDatabasePresent() && $this->isSchemaPresent()) {
            $outputStyle->writeln('It appears that your database already exists.');
            $outputStyle->writeln('<error>Warning! This action will erase your database.</error>');
            $questionHelper = $this->getHelper('question');
            $question = new ConfirmationQuestion('Would you like to reset it? (y/N) ', false);

            if ($questionHelper->ask($input, $output, $question)) {
                $this->commands[2] = [
                    'command' => 'doctrine:schema:drop',
                    'options' => [
                        '--force' => true,
                        '--full-database' => true,
                    ]
                ];
            }
        }

        //执行创建命令
        $this->createSchemaWithProgressbar($output);
        $outputStyle->newLine();
    }

    /**
     * 执行创建命令
     * @param OutputInterface $output
     */
    protected function createSchemaWithProgressbar(OutputInterface $output)
    {
        $progressbar = new ProgressBar($output,count($this->commands));
        foreach ($this->commands as $commandItem) {
            if (is_string($commandItem)) {
                $command = $commandItem;
                $options = [];
            } else {
                $command = $commandItem['command'];
                $options = $commandItem['options'];
            }
            $this->executeCommand($command, $output, $options);
            $progressbar->advance(1);
        }
        $progressbar->finish();
    }

    /**
     * 检查是否已经创建过数据库
     * @throws \Exception
     * @return bool
     */
    protected function isDatabasePresent()
    {
        $connection = $this->getContainer()->get('doctrine.dbal.default_connection');
        $databaseName = $connection->getDatabase();

        try {
            return in_array($databaseName, $connection->getSchemaManager()->listDatabases());
        } catch (\Exception $exception) {
            $message = $exception->getMessage();
            $mysqlDatabaseError = false !== strpos($message, sprintf("Unknown database '%s'", $databaseName));
            $postgresDatabaseError = false !== strpos($message, sprintf('database "%s" does not exist', $databaseName));

            if ($mysqlDatabaseError || $postgresDatabaseError) {
                return false;
            }

            throw $exception;
        }
    }

    /**
     * 检查是否已经创建过表
     * @return bool
     */
    protected function isSchemaPresent()
    {
        $connection = $this->getContainer()->get('doctrine.dbal.default_connection');
        return count($connection->getSchemaManager()->listTables()) > 0;
    }
}
