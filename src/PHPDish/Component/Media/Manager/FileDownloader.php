<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

declare(strict_types=1);

namespace PHPDish\Component\Media\Manager;

use GuzzleHttp\Client as HttpClient;
use PHPDish\Component\Media\ExtensionFinder;
use Psr\Http\Message\ResponseInterface;
use Symfony\Component\HttpFoundation\File\MimeType\ExtensionGuesser;

class FileDownloader implements FileDownloaderInterface
{
    /**
     * @var FileFactoryInterface
     */
    protected $fileFactory;

    /**
     * @var FileManagerInterface
     */
    protected $fileManager;

    /**
     * @var HttpClient
     */
    protected $httpClient;

    public function __construct(
        HttpClient $httpClient,
        FileManagerInterface $fileManager,
        FileFactoryInterface $fileFactory
    ) {
        $this->httpClient = $httpClient;
        $this->fileManager = $fileManager;
        $this->fileFactory = $fileFactory;
    }

    /**
     * {@inheritdoc}
     */
    public function download($mediaUrl)
    {
        try {
            $response = $this->httpClient->get($mediaUrl);
        } catch(\Exception $exception) {
            throw new \RuntimeException(sprintf('Fail to donwload the resource "%s"', $mediaUrl));
        }
        //查找扩展名
        $extension = $this->resolveExtension($mediaUrl, $response);

        $file = $this->fileFactory->createFileWithExtension($extension);
        $file->setContent($response->getBody());
        $this->fileManager->upload($file);

        return $file;
    }

    protected function resolveExtension($mediaUrl, ResponseInterface $response)
    {
        $extension = ExtensionFinder::find($mediaUrl);
        if ($extension === false) {
            $contentType = $response->getHeaderLine('content-type');
            $extension = $contentType ? ExtensionGuesser::getInstance()->guess($contentType) : 'jpg';
        }
        return $extension;
    }
}
