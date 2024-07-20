import { generateDocumentation } from 'tsdoc-markdown';
import path from 'path';
const rootPath = path.join(import.meta.url.replace('file://', ''), '..', '..', '..', '..', '..');

const docs = [
    {
        source: 'packages/view/index.ts',
        dist: "@ymindmap-view"
    },
    {
        source: 'packages/model/index.ts',
        dist: "@ymindmap-model"
    },
    {
        source: 'packages/state/index.ts',
        dist: "@ymindmap-state"
    },
    {
        source: 'packages/core/index.ts',
        dist: "@ymindmap-core"
    },
    {
        source: 'packages/browser/index.ts',
        dist: "@ymindmap-browser"
    },
    {
        source: 'extensions/extension-mindmap/index.ts',
        dist: "@ymindmap-extension-mindmap"
    }
]
docs.forEach(({ source, dist }) => {
// 核心仓库
generateDocumentation({
    inputFiles: [
        path.join(rootPath, source),
    ],
    outputFile: path.join(rootPath, 'apps', 'docs', 'ref', `${dist}.md`),
    markdownOptions: {
        headingLevel: '#'
    },
    buildOptions: {
        types: true,
        explore: true
      }
});
})