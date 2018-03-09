<?php

namespace PHPDish\Bundle\CoreBundle\Command\Proxy;

use Sylius\Bundle\ThemeBundle\Command\ListCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class ListThemeCommand extends Command
{
    /**
     * @var ListCommand
     */
    protected $rawCommand;

    /**
     * {@inheritdoc}
     */
    public function configure()
    {
        $this->setName('theme:list')
            ->setDescription('Shows list of detected themes.');
    }

    /**
     * {@inheritdoc}
     */
    public function execute(InputInterface $input, OutputInterface $output)
    {
        $this->rawCommand = $this->getApplication()->get('sylius:theme:list');
        $arguments = array(
            'command' => 'sylius:theme:list',
        );
        $greetInput = new ArrayInput($arguments);
        $this->rawCommand->run($greetInput, $output);
    }
}