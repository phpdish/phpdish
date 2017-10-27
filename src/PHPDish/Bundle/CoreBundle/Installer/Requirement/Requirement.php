<?php

namespace PHPDish\Bundle\CoreBundle\Installer\Requirement;

class Requirement implements RequirementInterface
{
    /**
     * @var string
     */
    protected $label;

    /**
     * @var boolean
     */
    protected $fulfilled;

    /**
     * @var boolean
     */
    protected $required;

    public function __construct($label, $fulfilled, $required = null)
    {
        $this->label = $label;
        $this->fulfilled = $fulfilled;
        if (!is_null($required)) {
            $this->required = $required;
        }
    }

    /**
     * {@inheritdoc}
     */
    public function getLabel()
    {
        return $this->label;
    }

    /**
     * {@inheritdoc}
     */
    public function isFulfilled()
    {
        return $this->fulfilled;
    }

    /**
     * {@inheritdoc}
     */
    public function isRequired()
    {
        return $this->required;
    }
}
