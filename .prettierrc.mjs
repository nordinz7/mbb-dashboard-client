/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  printWidth: 100,
  trailingComma: 'none',
  singleQuote: true,
  tabWidth: 2,
  semi: false,
  useTabs: false,
  jsxSingleQuote: false,
  quoteProps: 'as-needed',
  bracketSpacing: true,
  arrowParens: 'avoid',
  endOfLine: 'lf',
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  importOrder: [
    '<TYPES>^(node:)',
    '<TYPES>',
    '<TYPES>^[.]',
    '^App/types(.*)$',
    '^@/types(.*)$',
    '',
    '^react',
    '<BUILTIN_MODULES>',
    '<THIRD_PARTY_MODULES>',
    '',
    '^@/(.*)$',
    '^App/(.*)$',
    '^[./]',
    '',
    '^@/schemas/(.*)$'
  ]
}

export default config
