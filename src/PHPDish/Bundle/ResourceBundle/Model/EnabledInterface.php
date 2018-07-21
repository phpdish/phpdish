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

/**
 * Interface EnabledInterface.
 */
interface EnabledInterface
{
    /**
     * Set isEnabled.
     *
     * @param bool $enabled enabled value
     *
     * @return $this Self object
     */
    public function setEnabled($enabled);

    /**
     * Get if entity is enabled.
     *
     * @return bool Enabled
     */
    public function isEnabled();

    /**
     * Disable the entity.
     *
     * @return $this
     */
    public function disable();

    /**
     * Enable the entity.
     *
     * @return $this
     */
    public function enable();
}
