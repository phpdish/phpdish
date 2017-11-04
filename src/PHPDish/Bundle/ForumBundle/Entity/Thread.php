<?php

namespace PHPDish\Bundle\ForumBundle\Entity;

use Carbon\Carbon;
use Doctrine\ORM\Mapping as ORM;
use PHPDish\Bundle\ForumBundle\Model\ThreadInterface;
use PHPDish\Bundle\CoreBundle\Model\EnabledTrait;
use PHPDish\Bundle\CoreBundle\Model\Taxonomy;

/**
 * @ORM\Entity
 * @ORM\Table(name="threads")
 */
class Thread extends Taxonomy implements ThreadInterface
{
    use EnabledTrait;

    public function __construct()
    {
        $this->createdAt = $this->updatedAt = Carbon::now();
    }

    public function __toString()
    {
        return $this->getName();
    }
}
