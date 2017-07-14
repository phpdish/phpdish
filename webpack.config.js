var Encore = require('@symfony/webpack-encore');
var path = require('path');
var glob = require('glob');
var buildPath = 'web/build';

Encore
    .setOutputPath(buildPath)
    .setPublicPath('/build')
    .cleanupOutputBeforeBuild()
    .autoProvidejQuery()
    .enableSassLoader()
    .autoProvideVariables({
        '$': 'jquery',
        'jQuery': 'jquery',
        "window.jQuery": "jquery",
        '_': 'lodash',
        "window.lodash": "lodash"
    })
    .enableVersioning(true);

var config = {
    buildPath: path.resolve(buildPath),
    assetsPath: path.resolve("./assets"),
    cssPath: path.resolve("./assets/css"),
    jsPath: path.resolve("./assets/js"),
    modulesPath: path.resolve("./assets/modules"),
    pluginsPath: path.resolve("./assets/plugins"),
    mapPath: path.resolve(buildPath + '/manifest.json')
};

//add js entries
function findEntries(buildPath){
    var entries = {};
    var srcDirName = buildPath + '/**/*.js';
    glob.sync(srcDirName).forEach(function (filepath) {
        const name = filepath.slice(filepath.indexOf('js'), -3);
        entries[name] = filepath;
    });
    return entries;
}
var foundEntries = findEntries(config.jsPath);
for (var entryName in foundEntries) {
    Encore.addEntry(entryName, foundEntries[entryName]);
}
//add shared entry
Encore.createSharedEntry('common', [
    path.resolve(config.modulesPath, 'common.js')
]);

//add style entries
Encore.addStyleEntry('css/style', config.cssPath + '/_style.css');

if (Encore.isProduction()) {

}

//final webpack config
var webpackConfig = Encore.getWebpackConfig();
webpackConfig.resolve.alias = {
    css: config.cssPath,
    js: config.jsPath,
    module: config.modulesPath,
    plugin: config.pluginsPath
};
webpackConfig.externals = {
    'jquery': 'window.$',
    'lodash': 'window._',
};
module.exports = webpackConfig;