<?php

namespace PHPDish\Bundle\CoreBundle\Command;

use RuntimeException;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

final class CheckRequirementsCommand extends AbstractInstallCommand
{
    /**
     * {@inheritdoc}
     */
    protected function configure()
    {
        $this
            ->setName('phpdish:install:check-requirements')
            ->setDescription('Checks if all PHPDish requirements are satisfied.')
            ->setHelp(
                <<<EOT
The <info>%command.name%</info> command checks system requirements.
EOT
            )
        ;
    }

    /**
     * {@inheritdoc}
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $checker = $this->getContainer()->get('phpdish.installer.requirements_checker');
        $checker->setOutput($output);
        $fulfilled = $checker->check($output);

        if (!$fulfilled) {
            throw new RuntimeException(
                'Some system requirements are not fulfilled. Please check output messages and fix them.'
            );
        }

        $output->writeln('<info>Success! Your system can run PHPDish properly.</info>');
    }
}
