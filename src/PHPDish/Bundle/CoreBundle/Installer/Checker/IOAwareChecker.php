<?php

namespace PHPDish\Bundle\CoreBundle\Installer\Checker;

use Symfony\Component\Console\Output\OutputInterface;

abstract class IOAwareChecker implements CheckInterface
{
    /**
     * @var OutputInterface
     */
    protected $output;

    /**
     * 设置输出实例.
     *
     * @param OutputInterface $output
     */
    public function setOutput($output)
    {
        $this->output = $output;
    }
}
