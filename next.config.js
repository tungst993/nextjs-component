/* eslint-disable @typescript-eslint/no-var-requires,@typescript-eslint/no-use-before-define,@typescript-eslint/no-empty-function,prefer-template */
const fs = require('fs');
const path = require('path');
const iniparser = require('iniparser');

// We don't use `next-images` because v1.4.0 has a bug with SVGs
const withPlugins = require('next-compose-plugins');
const reactSvg = require('next-react-svg');
// for transpiling all ESM @fullcalendar/* packages
// also, for piping fullcalendar thru babel (to learn why, see babel.config.js)
const withTM = require('next-transpile-modules')();
// const images = require('next-optimized-images'); Can't use because there's a conflict with 'next-react-svg'
const bundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

/**
 * If you are deploying your site under a directory other than `/` e.g.
 * GitHub pages, then you have to tell Next where the files will be served.
 * We don't need this during local development, because everything is
 * available under `/`.
 */
const usePathPrefix = process.env.PATH_PREFIX === 'true';

const pathPrefix = usePathPrefix ? derivePathPrefix() : '';

const config = require('config');
const APIConfig = config.get('API');

const nextConfig = {
    /** Disable the `X-Powered-By: Next.js` response header. */
    poweredByHeader: false,
    productionBrowserSourceMaps: true,
    publicRuntimeConfig: {
        APIConfig,
    },

    serverRuntimeConfig: {
        APIConfig,
    },

    /**
     * When set to something other than '', this field instructs Next to
     * expect all paths to have a specific directory prefix. This fact is
     * transparent to (almost all of) the rest of the application.
     */
    basePath: pathPrefix,

    /**
     * Set custom `process.env.SOMETHING` values to use in the application.
     * You can do this with Webpack's `DefinePlugin`, but this is more concise.
     * It's also possible to provide values via `publicRuntimeConfig`, but
     * this method is preferred as it can be done statically at build time.
     *
     * @see https://nextjs.org/docs/api-reference/next.config.js/environment-variables
     */
    env: {
        PATH_PREFIX: pathPrefix,
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        emitWarning: true,
        ignoreDuringBuilds: true,
    },
    /**
     * Next.js reports TypeScript errors by default. If you don't want to
     * leverage this behavior and prefer something else instead, like your
     * editor's integration, you may want to disable it.
     */
    // typescript: {
    //   ignoreDevErrors: true,
    // },
};

/**
 * Enhances the Next config with the ability to:
 * - Analyze the webpack bundle
 * - Load images from JavaScript.
 * - Load SCSS files from JavaScript.
 */
// module.exports = withBundleAnalyzer({
//   enabled: process.env.ANALYZE === 'true',
// })(withImages(nextConfig));

module.exports = withPlugins(
    [
        [bundleAnalyzer],
        [
            reactSvg,
            {
                include: path.resolve(__dirname, 'src/assets'),
            },
        ],
        withTM,
        // images,
    ],
    nextConfig,
    'plugin:@next/next/recommended',
);

/**
 * This starter assumes that if `usePathPrefix` is true, then you're serving the site
 * on GitHub pages. If that isn't the case, then you can simply replace the call to
 * this function with whatever is the correct path prefix.
 *
 * The implementation attempts to derive a path prefix for serving up a static site by
 * looking at the following in order.
 *
 *    1. The git config for "origin"
 *    2. The `name` field in `package.json`
 *
 * Really, the first should be sufficient and correct for a GitHub Pages site, because the
 * repository name is what will be used to serve the site.
 */
function derivePathPrefix() {
    const gitConfigPath = path.join(__dirname, '.git', 'config');

    if (fs.existsSync(gitConfigPath)) {
        const gitConfig = iniparser.parseSync(gitConfigPath);

        if (gitConfig['remote "origin"'] != null) {
            const originUrl = gitConfig['remote "origin"'].url;

            // eslint-disable-next-line prettier/prettier
            return (
                '/' +
                originUrl
                    .split('/')
                    .pop()
                    .replace(/\.git$/, '')
            );
        }
    }

    const packageJsonPath = path.join(__dirname, 'package.json');

    if (fs.existsSync(packageJsonPath)) {
        const { name: packageName } = require(packageJsonPath);
        // Strip out any username / namespace part. This works even if there is
        // no username in the package name.
        return '/' + packageName.split('/').pop();
    }

    throw new Error("Can't derive path prefix, as neither .git/config nor package.json exists");
}
