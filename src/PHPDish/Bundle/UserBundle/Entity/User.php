<?php
/**
 * PHPDish comment component.
 *
 * @author Tao <taosikai@yeah.net>
 */

namespace PHPDish\Bundle\UserBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\JoinColumn;
use FOS\MessageBundle\Model\ParticipantInterface;
use PHPDish\Bundle\CoreBundle\Model\DateTimeTrait;
use PHPDish\Bundle\UserBundle\Model\ProfileInterface;
use PHPDish\Bundle\UserBundle\Model\UserInterface;
use FOS\UserBundle\Model\User as BaseUser;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 * @ORM\Table(name="users")
 * @ORM\HasLifecycleCallbacks
 */
class User extends BaseUser implements UserInterface, ParticipantInterface
{
    use DateTimeTrait;
    /**
     * @var int
     *
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(type="smallint", length=1);
     */
    protected $gender = 0;

    /**
     * @ORM\Column(type="string")
     */
    protected $description = '';

    /**
     * @ORM\Column(type="string")
     */
    protected $avatar = '';

    /**
     * @ORM\Column(type="integer")
     */
    protected $followingCount = 0;

    /**
     * @ORM\Column(type="integer")
     */
    protected $followerCount = 0;

    /**
     * 个人资料.
     *
     * @ORM\OneToOne(targetEntity="Profile", mappedBy="user", cascade={"persist"})
     *
     * @var ProfileInterface
     */
    protected $profile;

    /**
     * 关注我的用户.
     *
     * @ORM\ManyToMany(targetEntity="PHPDish\Bundle\UserBundle\Entity\User", inversedBy="following")
     * @ORM\JoinTable(name="users_followers",
     *     joinColumns={@JoinColumn(name="user_id", referencedColumnName="id")},
     *     inverseJoinColumns={@JoinColumn(name="follower_id", referencedColumnName="id")}
     * )
     *
     * @var ArrayCollection|UserInterface[]
     */
    protected $followers;

    /**
     * 我关注的用户.
     *
     * @ORM\ManyToMany(targetEntity="PHPDish\Bundle\UserBundle\Entity\User", mappedBy="followers")
     *
     * @var ArrayCollection|UserInterface[]
     */
    protected $following;

//    /**
//     * @ORM\ManyToMany(targetEntity="Role", inversedBy="users")
//     * @ORM\JoinTable(name="users_roles",
//     *      joinColumns={@JoinColumn(name="user_id", referencedColumnName="id")},
//     *      inverseJoinColumns={@JoinColumn(name="role_id", referencedColumnName="id")}
//     * )
//     */
//    protected $roles;

    /**
     * 订阅的专栏.
     *
     * @ORM\ManyToMany(targetEntity="PHPDish\Bundle\PostBundle\Entity\Category", mappedBy="followers")
     */
    protected $followingCategories;

    /**
     * 文章数量.
     *
     * @ORM\Column(type="integer")
     */
    protected $postCount = 0;

    /**
     * 话题数量.
     *
     * @ORM\Column(type="integer")
     */
    protected $topicCount = 0;

    /**
     * @ORM\Column(type="string", nullable=true))
     */
    protected $weiboId;

    /**
     * @ORM\Column(type="string", length=500, nullable=true))
     */
    protected $weiboAccessToken;

    /**
     * @ORM\Column(type="string", nullable=true))
     */
    protected $githubId;

    /**
     * @ORM\Column(type="string", length=500, nullable=true))
     */
    protected $githubAccessToken;

    public function __construct()
    {
        parent::__construct();
        //关注我的
        $this->followers = new ArrayCollection();
        //我关注的
        $this->following = new ArrayCollection();
    }

    /**
     * {@inheritdoc}
     */
    public function getSalt()
    {
        return null;
    }

    /**
     * Set gender.
     *
     * @param int $gender
     *
     * @return User
     */
    public function setGender($gender)
    {
        $this->gender = $gender;

        return $this;
    }

    /**
     * Get gender.
     *
     * @return int
     */
    public function getGender()
    {
        return $this->gender;
    }

    /**
     * {@inheritdoc}
     */
    public function isWomen()
    {
        return $this->gender == static::GENDER_WOMEN;
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
     * 检查用户是否被某个用户关注.
     *
     * @param UserInterface $user
     *
     * @return bool
     */
    public function isFollowedBy(UserInterface $user)
    {
        return $this->followers->contains($user);
    }

    /**
     * Set description.
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
     * Get description.
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
    public function removeFollower(UserInterface $follower)
    {
        $this->followers->removeElement($follower);
    }

    /**
     * @return int
     */
    public function getPostCount()
    {
        return $this->postCount;
    }

    /**
     * @param int $postCount
     *
     * @return User
     */
    public function setPostCount($postCount)
    {
        $this->postCount = $postCount;

        return $this;
    }

    /**
     * @return int
     */
    public function getTopicCount()
    {
        return $this->topicCount;
    }

    /**
     * @param int $topicCount
     *
     * @return User
     */
    public function setTopicCount($topicCount)
    {
        $this->topicCount = $topicCount;

        return $this;
    }

    /**
     * @return string
     */
    public function getAvatar()
    {
        return $this->avatar ?: 'avatar/user1.jpg';
    }

    /**
     * @param string $avatar
     *
     * @return User
     */
    public function setAvatar($avatar)
    {
        $this->avatar = $avatar;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getWeiboId()
    {
        return $this->weiboId;
    }

    /**
     * @param mixed $weiboId
     *
     * @return User
     */
    public function setWeiboId($weiboId)
    {
        $this->weiboId = $weiboId;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getWeiboAccessToken()
    {
        return $this->weiboAccessToken;
    }

    /**
     * @param mixed $weiboAccessToken
     *
     * @return User
     */
    public function setWeiboAccessToken($weiboAccessToken)
    {
        $this->weiboAccessToken = $weiboAccessToken;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getGithubId()
    {
        return $this->githubId;
    }

    /**
     * @param mixed $githubId
     *
     * @return User
     */
    public function setGithubId($githubId)
    {
        $this->githubId = $githubId;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getGithubAccessToken()
    {
        return $this->githubAccessToken;
    }

    /**
     * @param mixed $githubAccessToken
     *
     * @return User
     */
    public function setGithubAccessToken($githubAccessToken)
    {
        $this->githubAccessToken = $githubAccessToken;

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function enable()
    {
        $this->setEnabled(true);
    }

    /**
     * {@inheritdoc}
     */
    public function disable()
    {
        $this->setEnabled(false);
    }

    /**
     * {@inheritdoc}
     */
    public function getProfile()
    {
        return $this->profile;
    }

    /**
     * {@inheritdoc}
     */
    public function setProfile(ProfileInterface $profile)
    {
        $profile->setUser($this);
        $this->profile = $profile;
        return $this;
    }
}
