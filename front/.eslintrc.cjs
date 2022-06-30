/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    root: true,
    extends: [
        'plugin:vue/vue3-essential',
        'prettier',
        'eslint:recommended',
        '@vue/eslint-config-typescript/recommended',
        '@vue/eslint-config-prettier'
    ],
    plugins: ['prettier'],
    overrides: [
        {
            files: ['cypress/e2e/**.{cy,spec}.{js,ts,jsx,tsx}'],
            extends: ['plugin:cypress/recommended']
        }
    ]
};
