<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\ResourceBundle\Model;

trait EnabledTrait
{
    protected $enabled = true;

    /**
     * Set if is enabled.
     *
     * @param bool $enabled enabled value
     *
     * @return $this Self object
     */
    public function setEnabled($enabled)
    {
        $this->enabled = $enabled;

        return $this;
    }

    /**
     * Get is enabled.
     *
     * @return bool is enabled
     */
    public function isEnabled()
    {
        return $this->enabled;
    }

    /**
     * Enable.
     *
     * @return $this Self object
     */
    public function enable()
    {
        return $this->setEnabled(true);
    }

    /**
     * Disable.
     *
     * @return $this Self object
     */
    public function disable()
    {
        return $this->setEnabled(false);
    }
}
