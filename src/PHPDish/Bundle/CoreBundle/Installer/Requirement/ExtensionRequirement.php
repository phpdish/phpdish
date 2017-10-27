<?php

namespace PHPDish\Bundle\CoreBundle\Installer\Requirement;

class ExtensionRequirement extends Requirement
{
    public function __construct($label, $extension, $required = null)
    {
        parent::__construct($label, extension_loaded($extension), $required);
    }
}
