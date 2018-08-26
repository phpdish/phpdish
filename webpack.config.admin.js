const Encore = require('@symfony/webpack-encore');
const path = require('path');
const glob = require('glob');
const buildPath = 'web/build_admin';

const config = {
    buildPath: path.resolve(buildPath),
    assetsPath: path.resolve("./assets"),
    cssPath: path.resolve("./assets/admin/css"),
    scssPath: path.resolve("./assets/admin/scss"),
    jsPath: path.resolve("./assets/admin/js"),
    modulesPath: path.resolve("./assets/modules"),
    mapPath: path.resolve(buildPath + '/manifest.json')
};

Encore
    .setOutputPath(buildPath)
    .setPublicPath('/build_admin')
    .cleanupOutputBeforeBuild()
    .autoProvidejQuery()
    .enableSassLoader()
    .enableVersioning(true)
    .enableSourceMaps(!Encore.isProduction())
    .configureUglifyJsPlugin(function(options){
        "use strict";
        options.comments = false;
    })
    // .addAliases({
    //     css: config.cssPath,
    //     js: config.jsPath,
    //     module: config.modulesPath,
    //     plugin: config.pluginsPath
    // })
    .autoProvideVariables({
        '$': 'jquery',
        'jQuery': 'jquery',
        "window.jQuery": "jquery",
        '_': 'lodash',
        "window.lodash": "lodash"
    })
    .addExternals({
        'jquery': 'window.$',
        'jQuery': 'window.$',
        'lodash': 'window._'
    })
    .addRule({
        test: /\.njk$/,
        loader: 'nunjucks-loader'
    });

if (!Encore.isProduction()) {
    Encore.enableVersioning(false);
    Encore.setPublicPath('http://127.0.0.1:8090')
        .setManifestKeyPrefix('build_admin/');
}

//add shared entry
Encore.createSharedEntry('vendor', [
    path.resolve(config.modulesPath, 'dialog.js'),
    'highlight.js',
    'codemirror',
    'codemirror/mode/markdown/markdown.js',
    'art-dialog',
    'art-dialog/css/dialog.css',
    'jquery-validation',
    'jquery-pjax',
    'bootstrap-select',
    'emojione',
    'twemoji'
]);

//add style entries
Encore.addStyleEntry('css/style', config.scssPath + '/_all.scss');
Encore.addEntry('js/app', config.jsPath + '/_all.js');

Encore.configureUglifyJsPlugin(function(options){
    options.comments = true;
});

//final webpack config
module.exports = Encore.getWebpackConfig();
