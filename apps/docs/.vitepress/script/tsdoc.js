import { generateDocumentation } from 'tsdoc-markdown';
import path from 'path';
const rootPath = path.join(import.meta.url.replace('file://', ''), '..', '..', '..', '..', '..');

// 核心仓库
generateDocumentation({
    inputFiles: [
        path.join(rootPath, 'packages/browser/index.ts'),
        path.join(rootPath, 'packages/schema/index.ts'),
        path.join(rootPath, 'packages/core/index.ts'),
        path.join(rootPath, 'packages/state/index.ts'),
        path.join(rootPath, 'packages/view/index.ts'),
    ],
    outputFile: path.join(rootPath, 'apps', 'docs', 'ref', 'packages.md'),
    buildOptions: {
        types: true,
        explore: true
      }
});

generateDocumentation({
    inputFiles: [
        path.join(rootPath, 'extensions/extension-mindmap/index.ts'),
    ],
    outputFile: path.join(rootPath, 'apps', 'docs', 'ref', 'extensions.md'),
    buildOptions: {
        types: true,
        explore: true
      }
});