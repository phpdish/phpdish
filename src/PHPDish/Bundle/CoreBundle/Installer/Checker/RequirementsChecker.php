<?php

namespace PHPDish\Bundle\CoreBundle\Installer\Checker;

use PHPDish\Bundle\CoreBundle\Installer\Requirement\PHPDishRequirements;
use Symfony\Component\Console\Helper\Table;

class RequirementsChecker extends IOAwareChecker
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
        $fulfilled = true;
        foreach ($this->requirements as $requirement) {
            $row = [$requirement->getLabel()];
            if ($requirement->isFulfilled()) {
                $row[] = '<info>Yes</info>';
                $fulfilled = $fulfilled && true;
            } elseif ($requirement->isRequired()) {
                $row[] = '<error>Error</error>';
                $fulfilled = $fulfilled && false;
            } else {
                $row[] = '<comment>Warning</comment>';
                $fulfilled = $fulfilled && true;
            }
            $table->addRow($row);
        }
        $table->render();

        return $fulfilled;
    }
}
