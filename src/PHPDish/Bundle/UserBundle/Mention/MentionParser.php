<?php
namespace PHPDish\Bundle\UserBundle\Mention;

use PHPDish\Bundle\UserBundle\Service\UserManagerInterface;
use Symfony\Component\Routing\RouterInterface;

class MentionParser
{
    protected $originalBody;

    protected $mentionedUserNames = [];

    protected $mentionedUsers;

    /**
     * @var UserManagerInterface
     */
    protected $userManager;

    /**
     * @var RouterInterface
     */
    protected $router;

    public function getMentionedUsernames()
    {

    }

    public static function extractUserNames($body)
    {
        preg_match_all("/(\S*)\@([^\r\n\s]*)/i", $body, $mentionItems);
        $users = [];
        foreach ($mentionItems[2] as $k => $v) {
            if ($mentionItems[1][$k] || strlen($v) >25) {
                continue;
            }
            $users[] = $v;
        }
        return array_unique($users);
    }

    public function parse($body)
    {
        $this->originalBody = $body;
        $this->mentionedUserNames = static::extractUserNames($body);
        $this->mentionedUsers = $this->userManager->findUsersByNames($this->mentionedUserNames);
        $parsedBody = $this->originalBody;
      foreach ($this->mentionedUsers as $user) {
          $search = '@' . $user->getUsername();
          $replace = sprintf('<a href="%s">%s</a>', $this->router->generate('user_view', [
              'username' => $user->getUsername()
          ]), $user->getUsername());
          $parsedBody = str_replace($search, $replace, $this->body_parsed);
      }
      $this
    }
}