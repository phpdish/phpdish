<?php

namespace PHPDish\Bundle\CoreBundle\DataFixtures\ORM;

use Carbon\Carbon;
use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use PHPDish\Bundle\ForumBundle\Entity\Thread;

class ThreadFixtures extends Fixture
{
    /**
     * {@inheritdoc}
     */
    public function load(ObjectManager $manager)
    {
        $job = new Thread();
        $job->setCreatedAt(Carbon::now())
            ->setUpdatedAt(Carbon::now())
            ->setEnabled(true)
            ->setName('招聘')
            ->setSlug('job')
            ->setDescription('招聘节点');

        $question = new Thread();
        $question->setCreatedAt(Carbon::now())
            ->setUpdatedAt(Carbon::now())
            ->setEnabled(true)
            ->setName('问答')
            ->setSlug('question')
            ->setDescription('问答节点');

        $share = new Thread();
        $share->setCreatedAt(Carbon::now())
            ->setUpdatedAt(Carbon::now())
            ->setEnabled(true)
            ->setName('创造与分享')
            ->setSlug('creation-share')
            ->setDescription('创造与分享');

        $manager->persist($job);
        $manager->persist($question);
        $manager->persist($share);
        $manager->flush();

        $this->addReference('thread-share', $share);
    }
}
