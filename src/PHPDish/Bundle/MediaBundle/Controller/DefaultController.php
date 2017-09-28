<?php

namespace PHPDish\Bundle\MediaBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class DefaultController extends Controller
{
    const UPLOAD_FIELD_NAME = 'file';

    /**
     * 附件上传接口
     * @Route("/uploads", name="upload")
     * @param Request $request
     * @return Response
     */
    public function upload(Request $request)
    {
        $file = $request->files->get(static::UPLOAD_FIELD_NAME);
        if (is_null($file)) {
            throw new \InvalidArgumentException('Bad arguments');
        }
        $uploadedFile = $this->get('phpdish.file_uploader')->upload($file);
        return $this->json([
            'key' => $uploadedFile->getKey(),
            'path' => '/web/uploads/'. $uploadedFile->getKey()
        ]);
    }
}
