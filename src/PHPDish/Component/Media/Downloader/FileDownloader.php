<?php

namespace PHPDish\Component\Media\Downloader;

use Http\Client\HttpClient;
use Http\Message\MessageFactory;
use PHPDish\Component\Media\Manager\FileManagerInterface;
use PHPDish\Component\Media\Model\File;
use PHPDish\Component\Media\Namer\NamerInterface;
use PHPDish\Component\Util\ExtensionFinder;
use Symfony\Component\HttpFoundation\File\MimeType\ExtensionGuesser;

class FileDownloader implements FileDownloaderInterface
{
    /**
     * @var FileManagerInterface
     */
    protected $fileManager;

    /**
     * @var NamerInterface
     */
    protected $namer;

    /**
     * @var MessageFactory
     */
    protected $messageFactory;

    /**
     * @var HttpClient
     */
    protected $httpClient;

    public function __construct(
        HttpClient $httpClient,
        MessageFactory $messageFactory,
        FileManagerInterface $fileManager,
        NamerInterface $namer
    ) {
        $this->httpClient = $httpClient;
        $this->messageFactory = $messageFactory;
        $this->fileManager = $fileManager;
        $this->namer = $namer;
    }

    /**
     * {@inheritdoc}
     */
    public function download($mediaUrl)
    {
        $request = $this->messageFactory->createRequest('GET', $mediaUrl);

        try {
            $response = $this->httpClient->sendRequest($request);
        } catch(\Exception $exception) {
            throw new \RuntimeException(sprintf('Fail to donwload the resource "%s"', $mediaUrl));
        }
        $content = (string)$response->getBody();

        $extension = ExtensionFinder::find($mediaUrl);
        if ($extension === false) {
            $contentType = $response->getHeaderLine('content-type');
            $extension = $contentType ? ExtensionGuesser::getInstance()->guess($contentType) : 'jpg';
        }

        $file = new File();
        $file->setContent($content)
            ->setKey($this->namer->transformWithExtension($extension));
        $this->fileManager->upload($file);

        return $file;
    }
}
