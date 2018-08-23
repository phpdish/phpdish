<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace PHPDish\Bundle\ThemeBundle\CacheWarmer;

use PHPDish\Bundle\ThemeBundle\Model\ThemeInterface;
use PHPDish\Bundle\ThemeBundle\Theming\ThemeManagerInterface;
use Symfony\Bundle\FrameworkBundle\CacheWarmer\TemplateFinder as BaseTemplateFinder;
use Symfony\Component\Finder\Finder;
use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Component\Templating\TemplateNameParserInterface;
use Symfony\Component\Templating\TemplateReferenceInterface;

class TemplateFinder extends BaseTemplateFinder
{

    /**
     * @var string
     */
    protected $themeDir;

    /**
     * @var KernelInterface
     */
    private $kernel;
    /**
     * @var TemplateNameParserInterface
     */
    private $parser;
    /**
     * @var string
     */
    private $rootDir;
    /**
     * @var array
     */
    private $templates;

    protected $themeManager;

    /**
     * @var ThemeInterface
     */
    protected $themes;

    public function __construct(
        ThemeManagerInterface $themeManager,
        KernelInterface $kernel,
        TemplateNameParserInterface $parser,
        string $rootDir,
        ?string $themeDir = null
    )
    {
        parent::__construct($kernel, $parser, $rootDir);
        $this->themeManager = $themeManager;
        $this->kernel = $kernel;
        $this->parser = $parser;
        $this->rootDir = $rootDir;
        $this->themeDir =$themeDir;
    }

    /**
     * Find all the templates in the bundle and in the kernel Resources folder.
     *
     * @return TemplateReferenceInterface[]
     */
    public function findAllTemplates()
    {
        if (null !== $this->templates) {
            return $this->templates;
        }
        //All themes
        $this->themes = $this->themeManager->getThemes();

        $templates = array();

        foreach ($this->kernel->getBundles() as $bundle) {
            $templates = array_merge($templates, $this->findTemplatesInBundle($bundle));
        }

        $templates = array_merge($templates, $this->findTemplatesInFolder($this->rootDir.'/views'));

        return $this->templates = $templates;
    }

    /**
     * Find templates in the given bundle.
     *
     * @param BundleInterface $bundle The bundle where to look for templates
     *
     * @return TemplateReferenceInterface[]
     */
    private function findTemplatesInBundle(BundleInterface $bundle)
    {
        $name = $bundle->getName();
        $templates = array_merge(
            $this->findTemplatesInFolder($bundle->getPath().'/Resources/views'),
            $this->findTemplatesInFolder($this->rootDir.'/'.$name.'/views')
        );
        //追踪主题下的模板
        foreach ($this->themes as $theme) {
            $templates = array_merge($templates,
                $this->findTemplatesInFolder($this->themeDir.'/'.$name.'/views')
            );
        }
        $templates = array_unique($templates);

        foreach ($templates as $i => $template) {
            $templates[$i] = $template->set('bundle', $name);
        }

        return $templates;
    }

    /**
     * Find templates in the given directory.
     *
     * @param string $dir The folder where to look for templates
     *
     * @return TemplateReferenceInterface[]
     */
    private function findTemplatesInFolder($dir)
    {
        $templates = array();

        if (is_dir($dir)) {
            $finder = new Finder();
            foreach ($finder->files()->followLinks()->in($dir) as $file) {
                $template = $this->parser->parse($file->getRelativePathname());
                if (false !== $template) {
                    $templates[] = $template;
                }
            }
        }

        return $templates;
    }
}