<?php
/**
 * PHPDish forum component
 * @author Tao <taosikai@yeah.net>
 */
namespace PHPDish\Bundle\ForumBundle\Entity;

use PHPDish\Bundle\CoreBundle\Model\EnabledInterface;
use PHPDish\Bundle\CoreBundle\Model\IdentifiableInterface;
use PHPDish\Bundle\CoreBundle\Model\TaxonomyInterface;
use PHPDish\Bundle\CoreBundle\Model\DateTimeInterface;

interface CollectionInterface extends
    IdentifiableInterface,
    DateTimeInterface,
    TaxonomyInterface,
    EnabledInterface
{
}