<?php

namespace PHPDish\Bundle\CoreBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Helper\ProgressBar;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\NullOutput;
use Symfony\Component\Console\Output\OutputInterface;

abstract class AbstractInstallCommand extends ContainerAwareCommand
{
    /**
     * 文字logo
     * @var string
     */
    const PHPDISH_LOGO = <<<EOT
    
 _____   _   _   _____   _____   _   _____   _   _  
|  _  \ | | | | |  _  \ |  _  \ | | /  ___/ | | | | 
| |_| | | |_| | | |_| | | | | | | | | |___  | |_| | 
|  ___/ |  _  | |  ___/ | | | | | | \___  \ |  _  | 
| |     | | | | | |     | |_| | | |  ___| | | | | | 
|_|     |_| |_| |_|     |_____/ |_| /_____/ |_| |_| 

EOT;

    /**
     * 确认文件目录存在并且可读
     *
     * @param string $directory
     * @param OutputInterface $output
     */
    protected function ensureDirectoryWritableAndExists($directory, $output)
    {
        $checker = $this->getContainer()->get('phpdish.installer.directory_checker');
        $checker->setOutput($output);
        $checker->setDirectory($directory);
        $checker->check();
    }

    /**
     * Execute a command
     *
     * @param string $command
     * @param OutputInterface $output
     * @param array  $options Command options
     *
     * @return $this Self object
     */
    protected function executeCommand($command, OutputInterface $output = null, array $options = [])
    {
        if (is_null($output)) {
            $output = new NullOutput();
        }

        $options = array_merge($options, [
            'command' => $command
        ]);

        $this
            ->getApplication()
            ->run(new ArrayInput($options), $output);

        return $this;
    }

    /**
     * 批量执行命令
     * @param array $commands
     * @param OutputInterface|null $output
     * @param bool $renderProgressbar
     */
    protected function bulkRunCommands(array $commands, OutputInterface $output = null, $renderProgressbar = false)
    {
        if ($renderProgressbar) {
            $progressbar = new ProgressBar($output, count($commands));
        }
        foreach ($commands as $commandItem) {
            if (is_string($commandItem)) {
                $command = $commandItem;
                $options = [];
            } else {
                $command = $commandItem['command'];
                $options = $commandItem['options'];
            }
            $this->executeCommand($command, $output, $options);
            $renderProgressbar && $progressbar->advance(1);
        }
        $renderProgressbar && $progressbar->finish();
    }
}
