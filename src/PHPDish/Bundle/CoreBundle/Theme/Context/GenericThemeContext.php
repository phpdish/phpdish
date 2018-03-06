<?php

declare(strict_types=1);

namespace PHPDish\Bundle\CoreBundle\Theme\Context;

use Sylius\Bundle\ThemeBundle\Context\ThemeContextInterface;
use Sylius\Bundle\ThemeBundle\Model\ThemeInterface;
use Sylius\Bundle\ThemeBundle\Repository\ThemeRepositoryInterface;

class GenericThemeContext implements ThemeContextInterface
{
    /**
     * @var ThemeRepositoryInterface
     */
    protected $themeRepository;

    /**
     * 当前主题名
     * @var string
     */
    protected $currentThemeName;

    public function __construct(ThemeRepositoryInterface $themeRepository, ?string $currentThemeName)
    {
        $this->themeRepository = $themeRepository;
        $this->currentThemeName = $currentThemeName;
    }

    /**
     * {@inheritdoc}
     */
    public function getTheme(): ?ThemeInterface
    {
        return $this->currentThemeName ?
            $this->themeRepository->findOneByName($this->currentThemeName) :
            null;
    }
}