<?php

/*
 * This file is part of the PHPDish package.
 *
 * (c) Tao <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */
namespace PHPDish\Component\Mention;


interface AdapterInterface
{
    /**
     * Finds the users by given names
     * @param array $names
     * @return array
     */
    public function findUsers($names);

    /**
     * Creates the link of the user
     * @param array|object $user
     * @return string
     */
    public function createUserLink($user);
}