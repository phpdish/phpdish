<?php

use Symfony\Bundle\FrameworkBundle\HttpCache\HttpCache;

class AppCache extends HttpCache
{
    /**
     * {@inheritdoc}
     */
    public function getOptions()
    {
        return [
            'debug' => true,
            'default_ttl' => 0,
            'private_headers' => ['Authorization', 'Cookie'],
            'allow_reload' => false,
            'allow_revalidate' => false,
            'stale_while_revalidate' => 2,
            'stale_if_error' => 60,
        ];
    }
}
