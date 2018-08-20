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


use Symfony\Component\HttpKernel\CacheWarmer\CacheWarmer;

class TemplatePathsCacheWarmer extends CacheWarmer
{
    /**
     * {@inheritdoc}
     */
    public function warmUp($cacheDir)
    {
        $filesystem = new Filesystem();
        $templates = array();

        foreach ($this->finder->findAllTemplates() as $template) {
            $templates[$template->getLogicalName()] = rtrim($filesystem->makePathRelative($this->locator->locate($template), $cacheDir), '/');
        }

        $templates = str_replace("' => '", "' => __DIR__.'/", var_export($templates, true));

        $this->writeCacheFile($cacheDir.'/templates.php', sprintf("<?php return %s;\n", $templates));
    }

    /**
     * {@inheritdoc}
     */
    public function isOptional()
    {
        return false;
    }
}