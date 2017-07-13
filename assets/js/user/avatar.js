'use strict';
require('module/common.js');
require('module/user-common.js');

var Avatar  = require('module/avatar.js');

var $fileUploadArea = $('#file-upload-area');
var $avatarCropArea = $('#avatar-crop-area');
var $parameterForm = $('#parameter-form');
var $save = $('#save');
var $cancel = $('#cancel');

new Avatar($fileUploadArea, $avatarCropArea, $parameterForm, $save, $cancel);