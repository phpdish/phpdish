<?php

namespace PHPDish\Bundle\CoreBundle\Installer\Requirement;

class PHPDishRequirements implements \IteratorAggregate
{
    /**
     * @var RequirementInterface[]
     */
    protected $requirements;

    public function __construct()
    {
        $this->requirements = [
            new ExtensionRequirement('GD', 'gd', true),
            new ExtensionRequirement('Intl', 'intl', true),
            new ExtensionRequirement('APCu', 'apcu', false),
            new ExtensionRequirement('PDO', 'pdo', true),
            new ExtensionRequirement('PDO-Mysql', 'pdo_mysql', true),
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function getIterator()
    {
        return new \ArrayIterator($this->requirements);
    }
}
