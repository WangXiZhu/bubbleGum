/*
 * @vbuilder.config.js
 */

module.exports = ({ userFolder, srcFolder, buildFolder, taskName, webpack, webpackDevServer }) => {
    return {
        // [必填]；发布相关；所属的 gitlab 分组
        gitlabGroup: 'm',

        // [必填]；发布相关；所属的 project 名称
        gitlabProject: 'demo',

        buildFolder: './build', // 重置打包目录，默认 './build

        // debugPort: 9000, // 调试端口号，默认 9000

        replace: {
            // '$$_TEST_$$': {
            //     'dev-daily': 'test',
            //     'dev-pre': 'test',
            //     'dev-prod': 'test',
            //     'build-daily': 'test',
            //     'build-pre': 'test',
            //     'build-prod': 'test',
            // },
        },

        // 可以合并到 webpack 的配置，按照 webpack 的配置风格
        webpackConfig: {

        }
    };
};
