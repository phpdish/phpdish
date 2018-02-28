<?php

namespace PHPDish\Bundle\CoreBundle\Security\Core\Encoder;

use Symfony\Component\Security\Core\Encoder\MessageDigestPasswordEncoder;
use Symfony\Component\Security\Core\Encoder\PasswordEncoderInterface;

class GenericPasswordEncoder implements PasswordEncoderInterface
{
    /**
     * 简单加密，MD5
     * @var string
     */
    const DIFFICULTY_SIMPLE = 'simple';


    /**
     * 高级加密
     * @var string
     */
    const DIFFICULTY_STRONG = 'strong';

    /**
     * @var string
     */
    protected $difficulty;

    /**
     * @var MessageDigestPasswordEncoder
     */
    protected $messageDigestPasswordEncoder;

    public function __construct($difficulty)
    {
        $this->difficulty = $difficulty;
        $this->messageDigestPasswordEncoder = static::createEncoder($this->difficulty);
    }

    /**
     * {@inheritdoc}
     */
    public function encodePassword($raw, $salt)
    {
        if ($this->difficulty === static::DIFFICULTY_SIMPLE) {
            $salt = null;
        }
        return $this->messageDigestPasswordEncoder->encodePassword($raw, $salt);
    }

    /**
     * {@inheritdoc}
     */
    public function isPasswordValid($encoded, $raw, $salt)
    {
        if ($this->difficulty === static::DIFFICULTY_SIMPLE) {
            $salt = null;
        }
        return $this->messageDigestPasswordEncoder->isPasswordValid($encoded, $raw, $salt);
    }

    protected static function createEncoder($difficulty)
    {
        if ($difficulty === static::DIFFICULTY_SIMPLE) {
            $encoder = new MessageDigestPasswordEncoder('md5', false, 0);
        } else {
            $encoder = new MessageDigestPasswordEncoder('sha512', true, 5000);
        }
        return $encoder;
    }
}