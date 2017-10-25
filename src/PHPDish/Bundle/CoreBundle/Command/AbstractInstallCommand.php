<?php

namespace PHPDish\Bundle\CoreBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
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
}
