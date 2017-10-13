<?php
/**
 * PHPDish forum component.
 *
 * @author Tao <taosikai@yeah.net>
 */

namespace PHPDish\Bundle\ForumBundle\Model;

use PHPDish\Bundle\CoreBundle\Model\EnabledInterface;
use PHPDish\Bundle\CoreBundle\Model\IdentifiableInterface;
use PHPDish\Bundle\CoreBundle\Model\TaxonomyInterface;
use PHPDish\Bundle\CoreBundle\Model\DateTimeInterface;

interface ThreadInterface extends IdentifiableInterface, DateTimeInterface, TaxonomyInterface, EnabledInterface
{
}
