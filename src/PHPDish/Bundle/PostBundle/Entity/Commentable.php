<?php
namespace PHPDish\Bundle\PostBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

trait Commentable
{
    /**
     * @ORM\Column(type="integer", nullable=true, options={"default": 0})
     */
    protected $commentCount;
}
