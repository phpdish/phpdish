<?php

namespace PHPDish\Component\QCloud;

class QCloudFactory
{
    protected $secretId;

    protected $secretKey;

    public function __construct($secretId, $secretKey)
    {
        $this->secretId = $secretId;
        $this->secretKey = $secretKey;
    }

    /**
     * 获取模块
     * @param string $module
     * @param array $options
     * @return Object
     */
    public function create($module, $options = [])
    {
        dump(array_merge([
            'SecretId' => $this->secretId,
            'SecretKey' => $this->secretKey,
            'RequestMethod'  => 'POST',
            'DefaultRegion'  => 'gz'
        ], $options));
        return \QcloudApi::load($module, array_merge([
            'SecretId' => $this->secretId,
            'SecretKey' => $this->secretKey,
            'RequestMethod'  => 'POST',
            'DefaultRegion'  => 'gz'
        ], $options));
    }
}