<?php

namespace PHPDish\Bundle\CoreBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

/**
 * @ORM\Entity(repositoryClass="PHPDish\Bundle\CoreBundle\Repository\FriendLinkRepository")
 * @ORM\Table(name="friend_links")
 * @Vich\Uploadable
 */
class FriendLink
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(type="string", length=50)
     */
    protected $name;

    /**
     * @ORM\Column(type="string")
     */
    protected $url;

    /**
     * @ORM\Column(type="string")
     */
    protected $logo = '';

    /**
     * @Vich\UploadableField(mapping="user_avatar", fileNameProperty="logo")
     * @var File
     */
    protected $logoFile;

    /**
     * @ORM\Column(type="integer")
     */
    protected $priority = 0;

    /**
     * Get id.
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name.
     *
     * @param string $name
     *
     * @return FriendLink
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name.
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set url.
     *
     * @param string $url
     *
     * @return FriendLink
     */
    public function setUrl($url)
    {
        $this->url = $url;

        return $this;
    }

    /**
     * Get url.
     *
     * @return string
     */
    public function getUrl()
    {
        return $this->url;
    }

    /**
     * Set logo.
     *
     * @param string $logo
     *
     * @return FriendLink
     */
    public function setLogo($logo)
    {
        $this->logo = $logo;

        return $this;
    }

    /**
     * Get logo.
     *
     * @return string
     */
    public function getLogo()
    {
        return $this->logo;
    }

    /**
     * Set priority.
     *
     * @param int $priority
     *
     * @return FriendLink
     */
    public function setPriority($priority)
    {
        $this->priority = $priority;

        return $this;
    }

    /**
     * Get priority.
     *
     * @return int
     */
    public function getPriority()
    {
        return $this->priority;
    }

    public function setLogoFile(File $image = null)
    {
        $this->logoFile = $image;
    }

    public function getLogoFile()
    {
        return $this->logoFile;
    }
}
