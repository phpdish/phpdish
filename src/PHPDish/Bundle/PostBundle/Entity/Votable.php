<?php
/**
 * PHPDish comment component
 * @author Tao <taosikai@yeah.net>
 */
namespace PHPDish\Bundle\PostBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

trait Votable
{
    /**
     * @ORM\Column(type="integer", nullable=true, options={"default": 0})
     */
    protected $voteCount;
}