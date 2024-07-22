# 安装和使用

如何使用 Ymindmap

## 通过脚本安装

::: warning
目前还需要编写对应平台的startkits，所以可以通过安装所有的包来手动进行使用
目前暂未发布到npm上
:::

```bash
npm install @ymindmap/browser @ymindmap/extension-mindmap
```

在需要使用的地方

```typescript
import { Mindmap, getDefaultData } from '@ymindmap/browser';
import { MindmapExtension } from '@ymindmap/extension-mindmap'

const mindmap = new Mindmap({
  el: '#app',
  data: getDefaultData(),
  editable: true,
  extensions: {
    Mindmap: MindmapExtension
  },
});
```

## 开发

开发架构依赖于 `monorepo` + `pnpm` 所以先需要安装这两个包

之后在项目根目录

安装`pnpm install`安装相关依赖即可

`Leaferjs`目前作为全局的依赖一次性安装了

之后进行开发的时候可以进入 `apps/demo` 进行开发

```bash
cd apps/demo
pnpm run dev
```

之后访问对应的`demo`页面进行开发即可
