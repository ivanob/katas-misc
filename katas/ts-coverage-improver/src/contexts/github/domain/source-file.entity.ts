import { SupportedLanguages } from "./supported-language.value-obj";

export class SourceFile {
  constructor(
    readonly path: string,
    readonly language: SupportedLanguages
  ) {}
}
