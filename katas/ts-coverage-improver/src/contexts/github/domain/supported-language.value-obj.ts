
export type TypeSupportedLanguage = keyof typeof SupportedLanguages

export const SupportedLanguages = {
  TYPESCRIPT: { extension: '.ts', name: 'TypeScript', testExtension: ['.spec.ts', '.test.ts'] },
  JAVASCRIPT: { extension: '.js', name: 'JavaScript', testExtension: ['.spec.js', '.test.js'] },
} as const;