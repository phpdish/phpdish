<?php

namespace PHPDish\Bundle\CoreBundle\Command;

use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class InstallFixtureCommand extends AbstractInstallCommand
{
    /**
     * {@inheritdoc}
     */
    protected function configure()
    {
        $this
            ->setName('phpdish:install:fixture')
            ->setDescription('Install sample data into PHPDish.')
            ->setHelp(
                <<<EOT
The <info>%command.name%</info> command loads the sample data for PHPDish.
EOT
            );
    }

    /**
     * {@inheritdoc}
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $this->executeCommand('doctrine:fixtures:load', $output);
    }
}
