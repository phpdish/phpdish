<?php

namespace PHPDish\Bundle\MediaBundle\Controller;

use PHPDish\Component\Media\Model\Image;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class MediaController extends Controller
{
    const UPLOAD_FIELD_NAME = 'file';

    /**
     * 附件上传接口.
     *
     * @Route("/uploads", name="upload")
     *
     * @param Request $request
     *
     * @return Response
     */
    public function upload(Request $request)
    {
        $uploadedFile = $request->files->get(static::UPLOAD_FIELD_NAME);
        if (is_null($uploadedFile)) {
            throw new \InvalidArgumentException('Bad arguments');
        }

        list($uploader, $urlBuilder) = $this->getUploaderAndBuilder($request);

        $file = $uploader->upload($uploadedFile);
        $response = [
            'key' => $file->getKey(),
            'path' => $file->getUrl()
        ];
        if ($file instanceof Image) {
            $response['thumb'] = $urlBuilder->buildImageResizeUrl($file, 'middle_square');
        }
        return $this->json($response);
    }

    /**
     * 获取上传处理器和url构建
     * @param Request $request
     * @return array
     */
    protected function getUploaderAndBuilder(Request $request)
    {
        if ($request->headers->has('upload_avatar')) {
            $uploader = $this->get('phpdish.media.avatar_file_uploader');
            $urlBuilder = $this->get('phpdish.media.avatar_url_builder');
        } else {
            $uploader = $this->get('phpdish.media.file_uploader');
            $urlBuilder = $this->get('phpdish.media.url_builder');
        }
        return [$uploader, $urlBuilder];
    }
}
