<?php
namespace PHPDish\Bundle\PostBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="questions")
 */
class Question
{
    use Commentable, Votable;
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(type="string", length=150)
     */
    protected $title;

    /**
     * @ORM\Column(type="text")
     */
    protected $body;

    /**
     * @ORM\Column(type="text")
     */
    protected $originalBody;

    /**
     * @ORM\Column(type="datetime")
     */
    protected $createdAt;

    /**
     * @ORM\Column(type="datetime")
     */
    protected $updatedAt;

    /**
     * @ORM\ManyToOne(targetEntity="PHPDish\Bundle\UserBundle\Entity\User", inversedBy="questions")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     */
    protected $author;

    /**
     * @ORM\OneToMany(targetEntity="QuestionVote", mappedBy="question")
     * @ORM\JoinColumn(name="votable_id", referencedColumnName="id")
     */
    protected $votes;

    /**
     * @ORM\OneToMany(targetEntity="QuestionComment", mappedBy="question")
     * @ORM\JoinColumn(name="commentable_id", referencedColumnName="id")
     */
    protected $comments;
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->votes = new \Doctrine\Common\Collections\ArrayCollection();
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
     * Set title
     *
     * @param string $title
     *
     * @return Question
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title
     *
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set body
     *
     * @param string $body
     *
     * @return Question
     */
    public function setBody($body)
    {
        $this->body = $body;

        return $this;
    }

    /**
     * Get body
     *
     * @return string
     */
    public function getBody()
    {
        return $this->body;
    }

    /**
     * Set originalBody
     *
     * @param string $originalBody
     *
     * @return Question
     */
    public function setOriginalBody($originalBody)
    {
        $this->originalBody = $originalBody;

        return $this;
    }

    /**
     * Get originalBody
     *
     * @return string
     */
    public function getOriginalBody()
    {
        return $this->originalBody;
    }

    /**
     * Set createdAt
     *
     * @param \DateTime $createdAt
     *
     * @return Question
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
     * @return Question
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
     * Set commentCount
     *
     * @param integer $commentCount
     *
     * @return Question
     */
    public function setCommentCount($commentCount)
    {
        $this->commentCount = $commentCount;

        return $this;
    }

    /**
     * Get commentCount
     *
     * @return integer
     */
    public function getCommentCount()
    {
        return $this->commentCount;
    }

    /**
     * Set voteCount
     *
     * @param integer $voteCount
     *
     * @return Question
     */
    public function setVoteCount($voteCount)
    {
        $this->voteCount = $voteCount;

        return $this;
    }

    /**
     * Get voteCount
     *
     * @return integer
     */
    public function getVoteCount()
    {
        return $this->voteCount;
    }

    /**
     * Set author
     *
     * @param \PHPDish\Bundle\PostBundle\Entity\User $author
     *
     * @return Question
     */
    public function setAuthor(\PHPDish\Bundle\PostBundle\Entity\User $author = null)
    {
        $this->author = $author;

        return $this;
    }

    /**
     * Get author
     *
     * @return \PHPDish\Bundle\PostBundle\Entity\User
     */
    public function getAuthor()
    {
        return $this->author;
    }

    /**
     * Add vote
     *
     * @param \PHPDish\Bundle\PostBundle\Entity\QuestionVote $vote
     *
     * @return Question
     */
    public function addVote(\PHPDish\Bundle\PostBundle\Entity\QuestionVote $vote)
    {
        $this->votes[] = $vote;

        return $this;
    }

    /**
     * Remove vote
     *
     * @param \PHPDish\Bundle\PostBundle\Entity\QuestionVote $vote
     */
    public function removeVote(\PHPDish\Bundle\PostBundle\Entity\QuestionVote $vote)
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
     * Add comment
     *
     * @param \PHPDish\Bundle\PostBundle\Entity\QuestionComment $comment
     *
     * @return Question
     */
    public function addComment(\PHPDish\Bundle\PostBundle\Entity\QuestionComment $comment)
    {
        $this->comments[] = $comment;

        return $this;
    }

    /**
     * Remove comment
     *
     * @param \PHPDish\Bundle\PostBundle\Entity\QuestionComment $comment
     */
    public function removeComment(\PHPDish\Bundle\PostBundle\Entity\QuestionComment $comment)
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
}
