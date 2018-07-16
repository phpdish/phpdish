const Encore = require('@symfony/webpack-encore');
const path = require('path');
const glob = require('glob');
const buildPath = 'web/build';

const config = {
    buildPath: path.resolve(buildPath),
    assetsPath: path.resolve("./assets"),
    cssPath: path.resolve("./assets/css"),
    scssPath: path.resolve("./assets/scss"),
    jsPath: path.resolve("./assets/js"),
    modulesPath: path.resolve("./assets/modules"),
    pluginsPath: path.resolve("./plugins"),
    mapPath: path.resolve(buildPath + '/manifest.json')
};

Encore
    .setOutputPath(buildPath)
    .setPublicPath('https://cdn.phpdish.com/build')
    .setManifestKeyPrefix('build/')
    .cleanupOutputBeforeBuild()
    .autoProvidejQuery()
    .enableSassLoader()
    .enableVersioning(true)
    .enableSourceMaps(!Encore.isProduction())
    .configureUglifyJsPlugin(function(options){
        "use strict";
        options.comments = false;
    })
    .addAliases({
        css: config.cssPath,
        js: config.jsPath,
        module: config.modulesPath,
        plugin: config.pluginsPath
    })
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
        'lodash': 'window._',
    })
    .addRule({
        test: /\.njk$/,
        loader: 'nunjucks-loader'
    });

if (!Encore.isProduction()) {
    Encore.enableVersioning(false);
    Encore.setPublicPath('http://127.0.0.1:8089')
        .setManifestKeyPrefix('build/');
}

//add js entries
function findEntries(entryPath){
    const entries = {};
    const srcDirName = entryPath + '/**/*.js';
    glob.sync(srcDirName).forEach(function (filepath) {
        const name = filepath.slice(filepath.indexOf('js'), -3);
        entries[name] = filepath;
    });
    return entries;
}
const foundEntries = findEntries(config.jsPath);
for (const entryName in foundEntries) {
    Encore.addEntry(entryName, foundEntries[entryName]);
}

//add shared entry
Encore.createSharedEntry('vendor', [
    path.resolve(config.modulesPath, 'common.js'),
    path.resolve(config.modulesPath, 'dialog.js'),

    'highlight.js',
    'codemirror',
    'codemirror/mode/markdown/markdown.js',
    'art-dialog/dist/dialog-plus.js',
    'art-dialog/css/dialog.css',
    'jquery-validation',
    'jquery-pjax',
    'bootstrap-select',
    'emojione',
    'twemoji',

    'github-markdown-css',
    'bootstrap-select/dist/css/bootstrap-select.min.css',
    'codemirror/lib/codemirror.css',
    'codemirror/theme/yeti.css',
    'simplemde/src/css/simplemde.css',
    'social-share-button.js/dist/social-share.min.css',
    'highlight.js/styles/tomorrow.css',
    'selectize/dist/css/selectize.bootstrap3.css',
    'nprogress/nprogress.css',
    'loaders.css'
]);

//add style entries
Encore.addStyleEntry('css/style', [
    config.scssPath + '/_all.scss',
    config.pluginsPath + '/phpdish-video/assets/scss/polyfill.scss'
]);
Encore.addStyleEntry('css/resume', config.scssPath + '/resume.scss');
Encore.addStyleEntry('css/video', config.pluginsPath + '/phpdish-video/assets/scss/all.scss');
Encore.addEntry('js/video', config.pluginsPath + '/phpdish-video/assets/js/video.js');

Encore.configureUglifyJsPlugin(function(options){
    options.comments = true;
});

//final webpack config
module.exports = Encore.getWebpackConfig();
