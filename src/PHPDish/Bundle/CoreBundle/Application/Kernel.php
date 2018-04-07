<?php

namespace PHPDish\Bundle\CoreBundle\Application;

use PHPDish\Bundle\CoreBundle\Application\Plugin\Finder\PluginFinder;
use PHPDish\Bundle\CoreBundle\Application\Plugin\SimplePluginInterface;
use Symfony\Component\HttpKernel\Kernel as HttpKernel;

abstract class Kernel extends HttpKernel
{
    /**
     * @var SimplePluginInterface[]
     */
    protected $simplePlugins = [];

    /**
     * {@inheritdoc}
     */
    public function registerBundles()
    {
        $bundles = [
            new \Symfony\Bundle\FrameworkBundle\FrameworkBundle(),
            new \Symfony\Bundle\SecurityBundle\SecurityBundle(),
            new \Symfony\Bundle\TwigBundle\TwigBundle(),
            new \Symfony\Bundle\MonologBundle\MonologBundle(),
            new \Symfony\Bundle\SwiftmailerBundle\SwiftmailerBundle(),
            new \Doctrine\Bundle\DoctrineBundle\DoctrineBundle(),
            new \Sensio\Bundle\FrameworkExtraBundle\SensioFrameworkExtraBundle(),
            new \Symfony\Bundle\AsseticBundle\AsseticBundle(),
            new \Doctrine\Bundle\MigrationsBundle\DoctrineMigrationsBundle(),
            new \Doctrine\Bundle\FixturesBundle\DoctrineFixturesBundle(),
            new \Stof\DoctrineExtensionsBundle\StofDoctrineExtensionsBundle(),

            new \JMS\SerializerBundle\JMSSerializerBundle(),
            new \FOS\UserBundle\FOSUserBundle(),
            new \FOS\RestBundle\FOSRestBundle(),
            new \FOS\MessageBundle\FOSMessageBundle(),

            new \Knp\Bundle\PaginatorBundle\KnpPaginatorBundle(),
            new \Knp\Bundle\MarkdownBundle\KnpMarkdownBundle(),
            new \Knp\Bundle\GaufretteBundle\KnpGaufretteBundle(),
            new \Knp\Bundle\MenuBundle\KnpMenuBundle(),
            new \WhiteOctober\PagerfantaBundle\WhiteOctoberPagerfantaBundle(),
            new \Liip\ImagineBundle\LiipImagineBundle(),
            new \Http\HttplugBundle\HttplugBundle(),
            new \HWI\Bundle\OAuthBundle\HWIOAuthBundle(),
            new \Algolia\SearchBundle\AlgoliaSearchBundle(),
            new \Exercise\HTMLPurifierBundle\ExerciseHTMLPurifierBundle(),
            new \Sylius\Bundle\ThemeBundle\SyliusThemeBundle(),
            new \Gregwar\CaptchaBundle\GregwarCaptchaBundle(),

            new \Sonata\SeoBundle\SonataSeoBundle(),
            new \Sonata\CoreBundle\SonataCoreBundle(),
            new \Sonata\BlockBundle\SonataBlockBundle(),

            new \PHPDish\Bundle\CoreBundle\PHPDishCoreBundle(),
            new \PHPDish\Bundle\UserBundle\PHPDishUserBundle(),
            new \PHPDish\Bundle\PostBundle\PHPDishPostBundle(),
            new \PHPDish\Bundle\ForumBundle\PHPDishForumBundle(),
            new \PHPDish\Bundle\MediaBundle\PHPDishMediaBundle(),
            new \PHPDish\Bundle\NotificationBundle\PHPDishNotificationBundle(),
            new \PHPDish\Bundle\ChatBundle\PHPDishChatBundle(),
            new \PHPDish\Bundle\ResumeBundle\PHPDishResumeBundle(),
            new \PHPDish\Bundle\PaymentBundle\PHPDishPaymentBundle(),
        ];

        if (in_array($this->getEnvironment(), ['dev', 'test'], true)) {
            $bundles[] = new \Symfony\Bundle\DebugBundle\DebugBundle();
            $bundles[] = new \Symfony\Bundle\WebProfilerBundle\WebProfilerBundle();
            $bundles[] = new \Sensio\Bundle\DistributionBundle\SensioDistributionBundle();

            if ('dev' === $this->getEnvironment()) {
                $bundles[] = new \Sensio\Bundle\GeneratorBundle\SensioGeneratorBundle();
                $bundles[] = new \Symfony\Bundle\WebServerBundle\WebServerBundle();
            }
        }

        return $bundles;
    }

    /**
     * {@inheritdoc}
     */
    public function boot()
    {
        if (!$this->booted) {
            $this->initializeSimplePlugins();
        }
        parent::boot();
    }

    /**
     * {@inheritdoc}
     */
    public function getKernelParameters()
    {
        return array_merge(parent::getKernelParameters(), [
            'kernel.simple_plugins' => $this->simplePlugins
        ]);
    }

    /**
     * 获取全部的插件
     *
     * @return SimplePluginInterface[]
     */
    public function getSimplePlugins()
    {
        return $this->simplePlugins;
    }

    /**
     * 初始化插件
     */
    protected function initializeSimplePlugins()
    {
        $finder = new PluginFinder($this->getProjectDir());
        $this->simplePlugins = $finder->findAll();
    }
}