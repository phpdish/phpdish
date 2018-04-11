<?php

namespace PHPDish\Bundle\CoreBundle\Locale;

class LocaleManager
{
    /**
     * @var array
     */
    protected $enabledLocales = [];

    public function __construct(array $locales = [])
    {
        $this->enabledLocales = array_merge($this->enabledLocales, $locales);
    }

    /**
     * 添加支持的locale
     *
     * @param string $locale
     */
    public function addLocale($locale)
    {
        $this->enabledLocales[] = $locale;
    }

    /**
     * 添加多个支持的 locale
     *
     * @param array $locales
     */
    public function addLocales(array $locales)
    {
        $this->enabledLocales = array_merge($this->enabledLocales, $locales);
    }

    /**
     * 检查 locale 是否支持
     *
     * @param string $locale
     * @return bool
     */
    public function support($locale)
    {
        return in_array($locale, $this->enabledLocales);
    }

    /**
     * 所有支持的locale
     *
     * @return array
     */
    public function all()
    {
        return $this->enabledLocales;
    }

    /**
     * 移除 locale
     * @param string $locale
     */
    public function removeLocale($locale)
    {
        if (($key = array_search($this->enabledLocales, $locale)) !== false) {
            unset($this->enabledLocales[$key]);
        }
    }
}