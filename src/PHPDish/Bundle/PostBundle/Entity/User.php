<?php
/**
 * PHPDish comment component
 * @author Tao <taosikai@yeah.net>
 */
namespace PHPDish\Bundle\PostBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use FOS\UserBundle\Model\User as BaseUser;

/**
 * @ORM\Entity
 * @ORM\Table(name="users")
 */
class User extends BaseUser
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(type="smallint", length=1, nullable=true, options={"default": 0});
     */
    protected $gender;

    /**
     * @ORM\Column(type="boolean");
     */
    protected $isBlocked;

    /**
     * @ORM\Column(type="datetime", name="created_at");
     */
    protected $createdAt;

    /**
     * @ORM\Column(type="datetime", name="updated_at");
     */
    protected $updatedAt;

    /**
     * @ORM\OneToMany(targetEntity="Comment", mappedBy="author")
     */
    protected $comments;

    /**
     * @ORM\OneToMany(targetEntity="Post", mappedBy="author")
     */
    protected $posts;

    /**
     * @ORM\OneToMany(targetEntity="Vote", mappedBy="author")
     */
    protected $votes;

    /**
     * @ORM\OneToMany(targetEntity="Question", mappedBy="author")
     */
    protected $questions;

    /**
     * @ORM\ManyToMany(targetEntity="Blog", mappedBy="subscribers")
     */
    protected $subscribedBlogs;

    /**
     * @ORM\OneToMany(targetEntity="Blog", mappedBy="author")
     */
    protected $blogs;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->comments = new \Doctrine\Common\Collections\ArrayCollection();
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
     * @param \PHPDish\Bundle\PostBundle\Entity\Comment $comment
     *
     * @return User
     */
    public function addComment(\PHPDish\Bundle\PostBundle\Entity\Comment $comment)
    {
        $this->comments[] = $comment;

        return $this;
    }

    /**
     * Remove comment
     *
     * @param \PHPDish\Bundle\PostBundle\Entity\Comment $comment
     */
    public function removeComment(\PHPDish\Bundle\PostBundle\Entity\Comment $comment)
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
     * @param \PHPDish\Bundle\PostBundle\Entity\Blog $subscribedBlog
     *
     * @return User
     */
    public function addSubscribedBlog(\PHPDish\Bundle\PostBundle\Entity\Blog $subscribedBlog)
    {
        $this->subscribedBlogs[] = $subscribedBlog;

        return $this;
    }

    /**
     * Remove subscribedBlog
     *
     * @param \PHPDish\Bundle\PostBundle\Entity\Blog $subscribedBlog
     */
    public function removeSubscribedBlog(\PHPDish\Bundle\PostBundle\Entity\Blog $subscribedBlog)
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
     * @param \PHPDish\Bundle\PostBundle\Entity\Blog $blog
     *
     * @return User
     */
    public function addBlog(\PHPDish\Bundle\PostBundle\Entity\Blog $blog)
    {
        $this->blogs[] = $blog;

        return $this;
    }

    /**
     * Remove blog
     *
     * @param \PHPDish\Bundle\PostBundle\Entity\Blog $blog
     */
    public function removeBlog(\PHPDish\Bundle\PostBundle\Entity\Blog $blog)
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
}
