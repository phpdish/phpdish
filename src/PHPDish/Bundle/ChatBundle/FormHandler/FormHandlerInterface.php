<?php

namespace PHPDish\Bundle\ChatBundle\FormHandler;

use Symfony\Component\Form\Form;

interface FormHandlerInterface
{
    /**
     * 处理表单
     * @param Form $form
     */
    public function process(Form $form);
}