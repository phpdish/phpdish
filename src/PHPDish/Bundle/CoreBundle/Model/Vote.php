<?php
/**
 * PHPDish comment component
 * @author Tao <taosikai@yeah.net>
 */
namespace PHPDish\Bundle\CoreBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use PHPDish\Bundle\UserBundle\Entity\User;
use DateTime;

abstract class Vote implements VoteInterface
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(type="datetime")
     */
    protected $createdAt;

    /**
     * {@inheritdoc}
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * {@inheritdoc}
     */
    public function setCreatedAt(DateTime $createdAt)
    {
        $this->createdAt = $createdAt;
        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }
}
