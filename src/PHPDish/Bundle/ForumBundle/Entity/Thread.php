<?php
namespace PHPDish\Bundle\ForumBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use PHPDish\Bundle\ForumBundle\Model\ThreadInterface;
use PHPDish\Bundle\CoreBundle\Model\DateTimeTrait;
use PHPDish\Bundle\CoreBundle\Model\EnabledTrait;
use PHPDish\Bundle\CoreBundle\Model\IdentifiableTrait;
use PHPDish\Bundle\CoreBundle\Model\Taxonomy;

/**
 * @ORM\Entity
 * @ORM\Table(name="threads")
 */
class Thread extends Taxonomy implements ThreadInterface
{
    use EnabledTrait;
}
