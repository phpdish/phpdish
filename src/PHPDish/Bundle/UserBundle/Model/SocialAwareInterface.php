<?php

namespace PHPDish\Bundle\UserBundle\Model;

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

//    /**
//     * 获取Wechat id
//     * @return string
//     */
//    public function getWechatId();
//
//    /**
//     * 设置Wechat id
//     * @param string $wechatId
//     */
//    public function setWechatId($wechatId);
//
//    /**
//     * 获取wechat access token
//     * @return string
//     */
//    public function getWechatAccessToken();
//
//    /**
//     * 设置Wechat access token
//     * @param string $wechatAccessToken
//     */
//    public function setWechatAccessToken($wechatAccessToken);
}
