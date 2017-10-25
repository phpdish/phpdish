<?php

namespace PHPDish\Bundle\CoreBundle\Installer\Checker;

use PHPDish\Bundle\CoreBundle\Installer\Requirement\PHPDishRequirements;
use Symfony\Component\Console\Helper\Table;

class PHPDishRequirementsChecker extends IOAwareChecker
{
    /**
     * @var PHPDishRequirements
     */
    protected $requirements;

    public function __construct(PHPDishRequirements $requirements)
    {
        $this->requirements = $requirements;
    }

    /**
     * {@inheritdoc}
     */
    public function check()
    {
        $table = new Table($this->output);
        foreach ($this->requirements as $requirement) {
            $row = [$requirement->getLabel()];
            if ($requirement->isFulfilled()) {
                $row[] = '<success>Yes</success>';
            } elseif ($requirement->isRequired()) {
                $row[] = '<error>Error</error>';
            } else {
                $row[] = '<comment>Warning</comment>';
            }
            $table->addRow($row);
        }
        $table->render();
    }
}