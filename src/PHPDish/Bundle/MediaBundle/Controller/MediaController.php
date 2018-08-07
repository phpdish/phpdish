<?php

/*
 * This file is part of the phpdish/phpdish
 *
 * (c) Slince <taosikai@yeah.net>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

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
            'path' => $urlBuilder->build($file)
        ];
        if ($file instanceof Image) {
            $response['thumb'] = $urlBuilder->buildImageResizeUrl($file, 'middle_square');
        }
        $file->getContent()->close();
        return $this->json($response);
    }

    /**
     * 获取上传处理器和url构建
     * @param Request $request
     * @return array
     */
    protected function getUploaderAndBuilder(Request $request)
    {
        if ($configKey = $request->headers->get('media_mapping')) {
            $uploader = $this->get('phpdish_media.file_uploader.' . $configKey);
            $urlBuilder = $this->get('phpdish_media.url_builder.' . $configKey);
        } else {
            $uploader = $this->get('phpdish_media.file_uploader');
            $urlBuilder = $this->get('phpdish_media.url_builder');
        }
        return [$uploader, $urlBuilder];
    }
}
