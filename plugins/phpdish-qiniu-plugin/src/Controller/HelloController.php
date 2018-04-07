<?php

namespace PHPDish\QiNiuPlugin\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Translation\TranslatorInterface;

class HelloController extends Controller
{
    protected $translator;


    public function indexAction()
    {
        $this->translator = $this->get('translator');
        return new Response($this->translator->trans('qiniu.hello.world', [], 'qiniu'));
    }
}