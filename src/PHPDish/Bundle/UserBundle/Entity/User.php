<?php
/**
 * PHPDish comment component
 * @author Tao <taosikai@yeah.net>
 */
namespace PHPDish\Bundle\UserBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\JoinColumn;
use Symfony\Component\Validator\Constraints as Assert;
use PHPDish\Bundle\UserBundle\Model\UserInterface;

/**
 * @ORM\Entity
 * @ORM\Table(name="users")
 * @ORM\HasLifecycleCallbacks
 */
class User implements UserInterface
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

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
    protected $description;

    /**
     * @ORM\Column(type="boolean");
     */
    protected $isBlocked = false;

    /**
     * @ORM\Column(type="datetime", name="created_at");
     */
    protected $createdAt;

    /**
     * @ORM\Column(type="datetime", name="updated_at");
     */
    protected $updatedAt;

    /**
     * @ORM\Column(type="integer")
     */
    protected $followingCount = 0;

    /**
     * @ORM\Column(type="integer")
     */
    protected $fanCount = 0;

    /**
     * 关注我的
     * @ORM\ManyToMany(targetEntity="PHPDish\Bundle\UserBundle\Entity\User", mappedBy="following")
     * @var ArrayCollection|UserInterface[]
     */
    protected $followers;

    /**
     * 我关注的
     * @ORM\ManyToMany(targetEntity="PHPDish\Bundle\UserBundle\Entity\User", inversedBy="followers")
     * @ORM\JoinTable(name="user_followers",
     *     joinColumns={@JoinColumn(name="user_id", referencedColumnName="id")},
     *     inverseJoinColumns={@JoinColumn(name="follower_id", referencedColumnName="id", unique=true)}
     * )
     * @var ArrayCollection|UserInterface[]
     */
    protected $following;

    /**
     * @ORM\ManyToMany(targetEntity="Role", inversedBy="users")
     * @ORM\JoinTable(name="users_roles",
     *      joinColumns={@JoinColumn(name="user_id", referencedColumnName="id")},
     *      inverseJoinColumns={@JoinColumn(name="role_id", referencedColumnName="id", unique=true)}
     * )
     */
    protected $roles;

    /**
     * @ORM\ManyToMany(targetEntity="PHPDish\Bundle\PostBundle\Entity\Category", inversedBy="subscribers")
     * @ORM\JoinTable(name="category_subscribers",
     *     joinColumns={@JoinColumn(name="category_id", referencedColumnName="id")},
     *     inverseJoinColumns={@JoinColumn(name="user_id", referencedColumnName="id")}
     * )
     */
    protected $subscribedBlogs;

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

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
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

    /**
     * Set email
     *
     * @param string $email
     *
     * @return User
     */
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Get email
     *
     * @return string
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set username
     *
     * @param string $username
     *
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
     *
     * @param string $password
     *
     * @return User
     */
    public function setPassword($password)
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Get password
     *
     * @return string
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * Set gender
     *
     * @param integer $gender
     *
     * @return User
     */
    public function setGender($gender)
    {
        $this->gender = $gender;

        return $this;
    }

    /**
     * Get gender
     *
     * @return integer
     */
    public function getGender()
    {
        return $this->gender;
    }

    /**
     * Set isBlocked
     *
     * @param integer $isBlocked
     *
     * @return User
     */
    public function setIsBlocked($isBlocked)
    {
        $this->isBlocked = $isBlocked;

        return $this;
    }

    /**
     * Get isBlocked
     *
     * @return integer
     */
    public function getIsBlocked()
    {
        return $this->isBlocked;
    }

    /**
     * Set createdAt
     *
     * @param \DateTime $createdAt
     *
     * @return User
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * Get createdAt
     *
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * Set updatedAt
     *
     * @param \DateTime $updatedAt
     *
     * @return User
     */
    public function setUpdatedAt($updatedAt)
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    /**
     * Get updatedAt
     *
     * @return \DateTime
     */
    public function getUpdatedAt()
    {
        return $this->updatedAt;
    }

    /**
     * Add comment
     *
     * @param \PHPDish\Bundle\PostBundle\Entity\PostComment $comment
     *
     * @return User
     */
    public function addComment(\PHPDish\Bundle\PostBundle\Entity\PostComment $comment)
    {
        $this->comments[] = $comment;

        return $this;
    }

    /**
     * Remove comment
     *
     * @param \PHPDish\Bundle\PostBundle\Entity\PostComment $comment
     */
    public function removeComment(\PHPDish\Bundle\PostBundle\Entity\PostComment $comment)
    {
        $this->comments->removeElement($comment);
    }

    /**
     * Get comments
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getComments()
    {
        return $this->comments;
    }

    /**
     * Add post
     *
     * @param \PHPDish\Bundle\PostBundle\Entity\Post $post
     *
     * @return User
     */
    public function addPost(\PHPDish\Bundle\PostBundle\Entity\Post $post)
    {
        $this->posts[] = $post;

        return $this;
    }

    /**
     * Remove post
     *
     * @param \PHPDish\Bundle\PostBundle\Entity\Post $post
     */
    public function removePost(\PHPDish\Bundle\PostBundle\Entity\Post $post)
    {
        $this->posts->removeElement($post);
    }

    /**
     * Get posts
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getPosts()
    {
        return $this->posts;
    }

    /**
     * Add vote
     *
     * @param \PHPDish\Bundle\PostBundle\Entity\Vote $vote
     *
     * @return User
     */
    public function addVote(\PHPDish\Bundle\PostBundle\Entity\Vote $vote)
    {
        $this->votes[] = $vote;

        return $this;
    }

    /**
     * Remove vote
     *
     * @param \PHPDish\Bundle\PostBundle\Entity\Vote $vote
     */
    public function removeVote(\PHPDish\Bundle\PostBundle\Entity\Vote $vote)
    {
        $this->votes->removeElement($vote);
    }

    /**
     * Get votes
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getVotes()
    {
        return $this->votes;
    }

    /**
     * Add question
     *
     * @param \PHPDish\Bundle\PostBundle\Entity\Question $question
     *
     * @return User
     */
    public function addQuestion(\PHPDish\Bundle\PostBundle\Entity\Question $question)
    {
        $this->questions[] = $question;

        return $this;
    }

    /**
     * Remove question
     *
     * @param \PHPDish\Bundle\PostBundle\Entity\Question $question
     */
    public function removeQuestion(\PHPDish\Bundle\PostBundle\Entity\Question $question)
    {
        $this->questions->removeElement($question);
    }

    /**
     * Get questions
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getQuestions()
    {
        return $this->questions;
    }

    /**
     * Add subscribedBlog
     *
     * @param \PHPDish\Bundle\PostBundle\Entity\Category $subscribedBlog
     *
     * @return User
     */
    public function addSubscribedBlog(\PHPDish\Bundle\PostBundle\Entity\Category $subscribedBlog)
    {
        $this->subscribedBlogs[] = $subscribedBlog;

        return $this;
    }

    /**
     * Remove subscribedBlog
     *
     * @param \PHPDish\Bundle\PostBundle\Entity\Category $subscribedBlog
     */
    public function removeSubscribedBlog(\PHPDish\Bundle\PostBundle\Entity\Category $subscribedBlog)
    {
        $this->subscribedBlogs->removeElement($subscribedBlog);
    }

    /**
     * Get subscribedBlogs
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getSubscribedBlogs()
    {
        return $this->subscribedBlogs;
    }

    /**
     * Add blog
     *
     * @param \PHPDish\Bundle\PostBundle\Entity\Category $blog
     *
     * @return User
     */
    public function addBlog(\PHPDish\Bundle\PostBundle\Entity\Category $blog)
    {
        $this->blogs[] = $blog;

        return $this;
    }

    /**
     * Remove blog
     *
     * @param \PHPDish\Bundle\PostBundle\Entity\Category $blog
     */
    public function removeBlog(\PHPDish\Bundle\PostBundle\Entity\Category $blog)
    {
        $this->blogs->removeElement($blog);
    }

    /**
     * Get blogs
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getBlogs()
    {
        return $this->blogs;
    }


    /**
     * @ORM\PrePersist
     * @ORM\PreUpdate
     */
    public function updateTimestamps()
    {
        if (is_null($this->createdAt)) {
            $this->createdAt = new \DateTime();
        }
        $this->updatedAt = new \DateTime();
    }

    /**
     * Set followingCount
     *
     * @param integer $followingCount
     *
     * @return User
     */
    public function setFollowingCount($followingCount)
    {
        $this->followingCount = $followingCount;

        return $this;
    }

    /**
     * Get followingCount
     *
     * @return integer
     */
    public function getFollowingCount()
    {
        return $this->followingCount;
    }

    /**
     * Set fanCount
     *
     * @param integer $fanCount
     *
     * @return User
     */
    public function setFanCount($fanCount)
    {
        $this->fanCount = $fanCount;

        return $this;
    }

    /**
     * Get fanCount
     *
     * @return integer
     */
    public function getFanCount()
    {
        return $this->fanCount;
    }

    /**
     * 检查用户是否被某个用户关注
     * @param UserInterface $user
     * @return boolean
     */
    public function isFollowedBy(UserInterface $user)
    {
        return $this->followers->contain($user);
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
     * Add follower
     *
     * @param \PHPDish\Bundle\UserBundle\Entity\User $follower
     *
     * @return User
     */
    public function addFollower(\PHPDish\Bundle\UserBundle\Entity\User $follower)
    {
        $this->followers[] = $follower;

        return $this;
    }

    /**
     * Remove follower
     *
     * @param \PHPDish\Bundle\UserBundle\Entity\User $follower
     */
    public function removeFollower(\PHPDish\Bundle\UserBundle\Entity\User $follower)
    {
        $this->followers->removeElement($follower);
    }

    /**
     * Get followers
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getFollowers()
    {
        return $this->followers;
    }

    /**
     * Add following
     *
     * @param \PHPDish\Bundle\UserBundle\Entity\User $following
     *
     * @return User
     */
    public function addFollowing(\PHPDish\Bundle\UserBundle\Entity\User $following)
    {
        $this->following[] = $following;

        return $this;
    }

    /**
     * Remove following
     *
     * @param \PHPDish\Bundle\UserBundle\Entity\User $following
     */
    public function removeFollowing(\PHPDish\Bundle\UserBundle\Entity\User $following)
    {
        $this->following->removeElement($following);
    }

    /**
     * Get following
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getFollowing()
    {
        return $this->following;
    }

    /**
     * Add role
     *
     * @param \PHPDish\Bundle\UserBundle\Entity\Role $role
     *
     * @return User
     */
    public function addRole(\PHPDish\Bundle\UserBundle\Entity\Role $role)
    {
        $this->roles[] = $role;

        return $this;
    }

    /**
     * Remove role
     *
     * @param \PHPDish\Bundle\UserBundle\Entity\Role $role
     */
    public function removeRole(\PHPDish\Bundle\UserBundle\Entity\Role $role)
    {
        $this->roles->removeElement($role);
    }
}
