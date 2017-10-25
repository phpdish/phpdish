<?php

namespace PHPDish\Bundle\CoreBundle\Installer\Requirement;

class ExtensionRequirement extends Requirement
{
    public function __construct($extension, $required = null)
    {
        parent::__construct(extension_loaded($extension), $required);
    }
}