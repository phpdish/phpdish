<?php

namespace PHPDish\Bundle\CoreBundle\Command;

use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

class InstallCommand extends AbstractInstallCommand
{
    /**
     * @var array
     */
    protected $commands = [
        [
            'command' => 'phpdish:install:check-requirements',
            'message' => 'Checking system requirements.',
        ],
        [
            'command' => 'phpdish:install:database',
            'message' => 'Setting up the database.',
        ],
        [
            'command' => 'phpdish:install:fixture',
            'message' => 'Install sample data.',
        ],
        [
            'command' => 'fos:user:create',
            'message' => 'Creats the super admin acount.',
            'options' =>  [
                '--super-admin' => true
            ]
        ],
    ];

    /**
     * {@inheritdoc}
     */
    protected function configure()
    {
        $this
            ->setName('phpdish:install')
            ->setDescription('Install PHPDish in your machine');
    }

    /**
     * {@inheritdoc}
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $outputStyle = new SymfonyStyle($input, $output);
        $outputStyle->writeln('<info>Installing PHPDish...</info>');
        $outputStyle->writeln(static::PHPDISH_LOGO);

        $this->ensureDirectoryWritableAndExists($this->getContainer()->getParameter('kernel.cache_dir'), $output);

        $this->getApplication()->setAutoExit(false);

        foreach ($this->commands as $index => $command) {
            $outputStyle->newLine();
            $outputStyle->section(sprintf(
                'Step %d of %d. <info>%s</info>',
                $index + 1,
                count($this->commands),
                $command['message']
            ));
            $this->executeCommand($command['command'], $output, isset($command['options']) ? $command['options'] : []);
        }

        $output->writeln('PHPDish has been successfully installed.');
    }
}
