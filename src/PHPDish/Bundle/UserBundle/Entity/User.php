<?php
/**
 * PHPDish comment component
 * @author Tao <taosikai@yeah.net>
 */
namespace PHPDish\Bundle\UserBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\JoinColumn;
use PHPDish\Bundle\CoreBundle\Model\DateTimeTrait;
use PHPDish\Bundle\CoreBundle\Model\EnabledTrait;
use PHPDish\Bundle\CoreBundle\Model\IdentifiableTrait;
use Symfony\Component\Validator\Constraints as Assert;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

/**
 * @ORM\Entity
 * @ORM\Table(name="users")
 * @ORM\HasLifecycleCallbacks
 */
class User implements UserInterface
{
    use IdentifiableTrait, DateTimeTrait, EnabledTrait;

    /**
     * @ORM\Column(type="string")
     */
    protected $username;

    /**
     * @ORM\Column(type="string")
     */
    protected $email;

    /**
     * @Assert\NotBlank()
     * @Assert\Length(max=4096)
     */
    private $plainPassword;

    /**
     * @ORM\Column(type="string")
     */
    protected $password;

    /**
     * @ORM\Column(type="smallint", length=1);
     */
    protected $gender = 0;

    /**
     * @ORM\Column(type="string")
     */
    protected $description = '';

    /**
     * @ORM\Column(type="integer")
     */
    protected $followingCount = 0;

    /**
     * @ORM\Column(type="integer")
     */
    protected $followerCount = 0;

    /**
     * 关注我的用户
     * @ORM\ManyToMany(targetEntity="PHPDish\Bundle\UserBundle\Entity\User", inversedBy="following")
     * @ORM\JoinTable(name="users_followers",
     *     joinColumns={@JoinColumn(name="user_id", referencedColumnName="id")},
     *     inverseJoinColumns={@JoinColumn(name="follower_id", referencedColumnName="id")}
     * )
     * @var ArrayCollection|UserInterface[]
     */
    protected $followers;

    /**
     * 我关注的用户
     * @ORM\ManyToMany(targetEntity="PHPDish\Bundle\UserBundle\Entity\User", mappedBy="followers")
     * @var ArrayCollection|UserInterface[]
     */
    protected $following;

    /**
     * @ORM\ManyToMany(targetEntity="Role", inversedBy="users")
     * @ORM\JoinTable(name="users_roles",
     *      joinColumns={@JoinColumn(name="user_id", referencedColumnName="id")},
     *      inverseJoinColumns={@JoinColumn(name="role_id", referencedColumnName="id")}
     * )
     */
    protected $roles;

    /**
     * Constructor
     */
    public function __construct()
    {
        //关注我的
        $this->followers = new ArrayCollection();
        //我关注的
        $this->following =  new ArrayCollection();
    }

    public function getSalt()
    {
        return null;
    }

    public function eraseCredentials()
    {
    }

    public function getRoles()
    {
        return ['ROLE_USER'];
    }

    public function avatar($width = 120, $height = 120)
    {
        return '/uploads/avatar/user1.jpg';
    }


    /**
     * Set email
     * @param string $email
     * @return User
     */
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Get email
     * @return string
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set username
     * @param string $username
     * @return User
     */
    public function setUsername($username)
    {
        $this->username = $username;

        return $this;
    }

    /**
     * Get username
     *
     * @return string
     */
    public function getUsername()
    {
        return $this->username;
    }

    /**
     * @param string $plainPassword
     */
    public function setPlainPassword($plainPassword)
    {
        $this->plainPassword = $plainPassword;
    }

    /**
     * @return string
     */
    public function getPlainPassword()
    {
        return $this->plainPassword;
    }

    /**
     * Set password
     * @param string $password
     * @return User
     */
    public function setPassword($password)
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Get password
     * @return string
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * Set gender
     * @param integer $gender
     * @return User
     */
    public function setGender($gender)
    {
        $this->gender = $gender;

        return $this;
    }

    /**
     * Get gender
     * @return integer
     */
    public function getGender()
    {
        return $this->gender;
    }

    /**
     * {@inheritdoc}
     */
    public function setFollowingCount($followingCount)
    {
        $this->followingCount = $followingCount;

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function getFollowingCount()
    {
        return $this->followingCount;
    }

    /**
     * {@inheritdoc}
     */
    public function setFollowerCount($count)
    {
        $this->followerCount = $count;
        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function getFollowerCount()
    {
        return $this->followerCount;
    }

    /**
     * 检查用户是否被某个用户关注
     * @param UserInterface $user
     * @return boolean
     */
    public function isFollowedBy(UserInterface $user)
    {
        return $this->followers->contains($user);
    }

    /**
     * Set description
     *
     * @param string $description
     *
     * @return User
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * {@inheritdoc}
     */
    public function addFollower(UserInterface $follower)
    {
        $this->followers[] = $follower;
        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function removeFollower(User $follower)
    {
        $this->followers->removeElement($follower);
    }


    /**
     * Add role
     *
     * @param Role $role
     *
     * @return User
     */
    public function addRole(Role $role)
    {
        $this->roles[] = $role;
        return $this;
    }

    /**
     * Remove role
     * @param Role $role
     */
    public function removeRole(Role $role)
    {
        $this->roles->removeElement($role);
    }
}
