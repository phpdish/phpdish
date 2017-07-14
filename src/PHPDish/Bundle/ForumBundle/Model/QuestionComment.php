<?php
/**
 * PHPDish comment component
 * @author Tao <taosikai@yeah.net>
 */
namespace PHPDish\Bundle\ForumBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="question_comments")
 */
class QuestionComment extends Comment
{
    /**
     * @ORM\ManyToOne(targetEntity="Question", inversedBy="comments")
     */
    protected $post;

    /**
     * Set voteCount
     *
     * @param integer $voteCount
     *
     * @return QuestionComment
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
     * Set post
     *
     * @param \PHPDish\Bundle\PostBundle\Entity\Question $post
     *
     * @return QuestionComment
     */
    public function setPost(\PHPDish\Bundle\PostBundle\Entity\Question $post = null)
    {
        $this->post = $post;

        return $this;
    }

    /**
     * Get post
     *
     * @return \PHPDish\Bundle\PostBundle\Entity\Question
     */
    public function getPost()
    {
        return $this->post;
    }
}
