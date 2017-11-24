<?php

namespace PHPDish\Bundle\WebBundle\Entity;

use PHPDish\Bundle\CoreBundle\Model\DateTimeTrait;
use PHPDish\Bundle\CoreBundle\Model\IdentifiableTrait;
use PHPDish\Bundle\WebBundle\Model\SongInterface;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="songs")
 */
class Song implements SongInterface
{
    use IdentifiableTrait;
    use DateTimeTrait;

    /**
     * @ORM\Column(type="string")
     * @var string
     */
    protected $name;

    /**
     * @ORM\Column(type="string")
     * @var string
     */
    protected $srcId;

    /**
     * @ORM\Column(type="string")
     * @var string
     */
    protected $src;

    /**
     * {@inheritdoc}
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * {@inheritdoc}
     */
    public function setName($name)
    {
        $this->name = $name;
        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function getSrcId()
    {
        return $this->srcId;
    }

    /**
     * {@inheritdoc}
     */
    public function setSrcId($srcId)
    {
        $this->srcId = $srcId;
        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function getSrc()
    {
        return $this->src;
    }

    /**
     * {@inheritdoc}
     */
    public function setSrc($src)
    {
        $this->src = $src;
        return $this;
    }
}