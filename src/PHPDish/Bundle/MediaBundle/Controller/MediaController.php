<?php

namespace PHPDish\Bundle\MediaBundle\Controller;

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
        $file = $this->get('phpdish.media.file_uploader')->upload($uploadedFile);

        return $this->json([
            'key' => $file->getKey(),
            'path' => $this->get('phpdish.media.url_builder')->build($file)
        ]);
    }
}
