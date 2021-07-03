const webpack = require('webpack')

module.exports = {
    devServer: {
        port: 8001
    },
    //引入jquery
    chainWebpack: config => {
        config.plugin('provide').use(webpack.ProvidePlugin, [{
           /* $: 'jquery',
            jquery: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'*/
        }])
    }
}

