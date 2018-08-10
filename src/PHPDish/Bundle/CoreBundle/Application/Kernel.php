<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\CoreBundle\Application;

use PHPDish\Bundle\CoreBundle\Application\Plugin\Finder\CachedPluginFinder;
use PHPDish\Bundle\CoreBundle\Application\Plugin\Finder\PluginFinder;
use PHPDish\Bundle\CoreBundle\Application\Plugin\SimplePluginInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;
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
//            new \Sylius\Bundle\ThemeBundle\SyliusThemeBundle(),
            new \Gregwar\CaptchaBundle\GregwarCaptchaBundle(),
            new \Bazinga\Bundle\JsTranslationBundle\BazingaJsTranslationBundle(),
            new \Oneup\UploaderBundle\OneupUploaderBundle(), //多文件上传

            //Sonata
            new \Sonata\SeoBundle\SonataSeoBundle(),
            new \Sonata\CoreBundle\SonataCoreBundle(),
            new \Sonata\BlockBundle\SonataBlockBundle(),

            new \PHPDish\Bundle\ResourceBundle\PHPDishResourceBundle(),
            new \PHPDish\Bundle\CmsBundle\PHPDishCmsBundle(),
            new \PHPDish\Bundle\UserBundle\PHPDishUserBundle(),
            new \PHPDish\Bundle\PostBundle\PHPDishPostBundle(),
            new \PHPDish\Bundle\ForumBundle\PHPDishForumBundle(),
            new \PHPDish\Bundle\MediaBundle\PHPDishMediaBundle(),
            new \PHPDish\Bundle\NotificationBundle\PHPDishNotificationBundle(),
            new \PHPDish\Bundle\ChatBundle\PHPDishChatBundle(),
            new \PHPDish\Bundle\ResumeBundle\PHPDishResumeBundle(),
            new \PHPDish\Bundle\PaymentBundle\PHPDishPaymentBundle(),
            new \PHPDish\Bundle\CoreBundle\PHPDishCoreBundle(),
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

        //动态查找
        $this->simplePlugins = $this->findSimplePlugins();
        $bundles = array_merge($bundles, $this->simplePlugins);
        return $bundles;
    }

    /**
     * {@inheritdoc}
     */
    protected function getKernelParameters()
    {
        $simplePlugins = [];
        $simplePluginMetas = [];
        foreach ($this->simplePlugins as $simplePlugin) {
            $simplePlugins[$simplePlugin->getName()] = get_class($simplePlugin);
            $simplePluginMetas[$simplePlugin->getName()] = [
                'path' => $simplePlugin->getPath(),
                'routerSource' => $simplePlugin->getRouterResource(),
                'servicesSource' => $simplePlugin->getServicesSource(),
            ];
        }
        return array_merge(parent::getKernelParameters(), [
            'kernel.simple_plugins' => $simplePlugins,
            'kernel.simple_plugins_metadata' => $simplePluginMetas
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
    protected function findSimplePlugins()
    {
        $finder = new CachedPluginFinder($this->getCacheDir() . '/phpdish_plugins.php',
            new PluginFinder($this->getProjectDir())
        );
        return $finder->findAll();
    }
}