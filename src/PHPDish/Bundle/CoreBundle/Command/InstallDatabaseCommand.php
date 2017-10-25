<?php

namespace PHPDish\Bundle\CoreBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

class InstallDatabaseCommand extends AbstractInstallCommand
{
    /**
     * 需要执行的命令
     * @var array
     */
    protected $commands = [
        'doctrine:database:create',
        'doctrine:migrations:migrate' => ['--no-interaction' => true],
        'cache:clear',
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
            )
        ;
    }

    /**
     * {@inheritdoc}
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $outputStyle = new SymfonyStyle($input, $output);
        $outputStyle->writeln('Creating PHPDish database.');


        $outputStyle->newLine();
    }

}
