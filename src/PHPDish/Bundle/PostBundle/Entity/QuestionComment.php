<?php
/**
 * PHPDish comment component
 * @author Tao <taosikai@yeah.net>
 */
namespace PHPDish\Bundle\PostBundle\Entity;

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
}
