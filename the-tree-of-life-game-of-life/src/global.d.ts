// Markdown files are bundled as text by tsdown's default loader. Declare
// the module shape so TypeScript knows `import md from './foo.md'` yields
// the file contents as a string.
declare module '*.md' {
  const content: string
  export default content
}
