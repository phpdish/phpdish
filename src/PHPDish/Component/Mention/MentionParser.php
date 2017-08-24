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

class MentionParser implements MentionParserInterface
{
    /**
     * @var AdapterInterface
     */
    protected $adapter;

    /**
     * @var string
     */
    protected $parsedBody;

    /**
     * @var array
     */
    protected $mentionedNames;

    /**
     * @var array
     */
    protected $mentionedUsers;

    public function __construct(AdapterInterface $adapter)
    {
        $this->adapter = $adapter;
    }

    /**
     * {@inheritdoc}
     */
    public function getMentionedNames()
    {
        return $this->mentionedNames;
    }

    /**
     * {@inheritdoc}
     */
    public function getParsedBody()
    {
        return $this->parsedBody;
    }

    /**
     * {@inheritdoc}
     */
    public function parse($body)
    {
        $this->parsedBody = $body;
        $this->mentionedNames = static::extractUserNames($body);
        $this->mentionedUsers = $this->adapter->findUsers($this->mentionedNames);
        foreach ($this->mentionedUsers as $user) {
            $search = '@' . $user->getUsername();
            $replace = $this->adapter->createUserLink($user);
            $this->parsedBody = str_replace($search, $replace, $this->parsedBody);
        }
        return $this;
    }

    protected static function extractUserNames($body)
    {
        preg_match_all("/@(\w+)/i", $body, $mentionItems);
        return array_unique($mentionItems[1]);
    }
}