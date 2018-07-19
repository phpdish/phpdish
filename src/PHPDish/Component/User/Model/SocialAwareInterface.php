<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Component\User\Model;

interface SocialAwareInterface
{
    /**
     * 获取微博id.
     *
     * @return string
     */
    public function getWeiboId();

    /**
     * 设置获取微博id.
     *
     * @param string $weiboId
     *
     * @return $this
     */
    public function setWeiboId($weiboId);

    /**
     * 获取微博授权token.
     *
     * @return string
     */
    public function getWeiboAccessToken();

    /**
     * 设置微博token.
     *
     * @param string $weiboAccessToken
     *
     * @return $this
     */
    public function setWeiboAccessToken($weiboAccessToken);

    /**
     * 获取GitHub ID.
     *
     * @return string
     */
    public function getGithubId();

    /**
     * 设置GitHub id.
     *
     * @param string $githubId
     *
     * @return $this
     */
    public function setGithubId($githubId);

    /**
     * 获取github  token.
     *
     * @return string
     */
    public function getGithubAccessToken();

    /**
     * 设置Github token.
     *
     * @param string $githubAccessToken
     *
     * @return $this
     */
    public function setGithubAccessToken($githubAccessToken);
}
