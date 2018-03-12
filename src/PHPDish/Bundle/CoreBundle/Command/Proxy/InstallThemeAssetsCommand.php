<?php

namespace PHPDish\Bundle\CoreBundle\Command\Proxy;

use Sylius\Bundle\ThemeBundle\Command\AssetsInstallCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

class InstallThemeAssetsCommand extends Command
{
    /**
     * @var AssetsInstallCommand
     */
    protected $rawCommand;

    /**
     * {@inheritdoc}
     */
    public function configure()
    {
        $this->setName('phpdish:theme:assets:install')
            ->setDefinition([
                new InputArgument('target', InputArgument::OPTIONAL, 'The target directory', 'web'),
            ])
            ->addOption('symlink', null, InputOption::VALUE_NONE, 'Symlinks the assets instead of copying it')
            ->addOption('relative', null, InputOption::VALUE_NONE, 'Make relative symlinks')
            ->setDescription('Installs themes web assets under a public web directory');
    }

    /**
     * {@inheritdoc}
     */
    public function execute(InputInterface $input, OutputInterface $output)
    {
        $this->rawCommand = $this->getApplication()->get('sylius:theme:assets:install');
        $this->setHelp($this->rawCommand->getHelp());
        $arguments = array(
            'command' => 'sylius:theme:assets:install',
            'target'  => $input->getArgument('target'),
            '--symlink'  => $input->getOption('symlink'),
            '--relative'  => $input->getOption('relative'),
        );
        $greetInput = new ArrayInput($arguments);
        $this->rawCommand->run($greetInput, $output);
    }

    /**
     * {@inheritdoc}
     */
    public function getAliases()
    {
        return ['theme:assets:install'];
    }
}