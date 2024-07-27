# 可以使用extension-collab实现协同

实际上因为底层就是yjs实现的数据模型，所以协同的实现非常容易

在demo里提供了一个基于本地indexdb + tab的协同demo

具体请直接参考对应的插件

```typescript
import { Mindmap } from '@ymindmap/browser';
import { TextMindmapExtension } from '@ymindmap/extension-text'
import { MindmapExtension } from '@ymindmap/extension-mindmap'
import { CollabExtension } from '@ymindmap/extension-collab'
import { LocalForageProvider } from 'y-localforage'
import { applyUpdate } from 'yjs';
import qs from 'qs';
import localforage from 'localforage';
import "./style.css";

import { Doc } from 'yjs';
import type { IExtensionConfig } from '@ymindmap/browser';

let data: string | undefined = undefined;
const options: Record<string, any> = {};
const extensions: Record<string, IExtensionConfig> = {
  Text: TextMindmapExtension,
  Mindmap: MindmapExtension
}

const query = qs.parse(location.search.replace(/^\?/, ''));
const collabId = query.collab;

async function init() {
  if (collabId) {
    await localforage.ready(function () {
      const DocStore = localforage.createInstance({
        name: 'Yjs-Persistence'
      })
      extensions.Collab = CollabExtension;
      options.Collab = {
        defaultData: getDefaultData(),
        handlerYdoc(ydoc: Doc, callback: () => void) {
          const provider = new LocalForageProvider(DocStore, ydoc);
          provider.on('synced', callback);

          if (BroadcastChannel) {
            const bc = new BroadcastChannel("yjs")

            ydoc.on("update", (update: Uint8Array) => {
              bc.postMessage({ client: ydoc.clientID, update })
            })

            bc.addEventListener("message", (msg) => {
              const { data } = msg
              if (data.client !== ydoc.clientID) {
                applyUpdate(ydoc, data.update)
              }
            })
          }

          return provider;
        }
      }
    })
  } else {
    data = getDefaultData();
  }

  const mindmap = new Mindmap({
    el: '#app',
    data,
    editable: true,
    extensions,
    options
  });

  mindmap.on('change', (value) => {
    localStorage.setItem('data', value)
  })

  Reflect.set(window, 'mindmap', mindmap);
}

init();

```

<div class="demo-container" style="width: 100%;display: flex;justify-content: center;align-items: center;height: 300px;margin-top: 64px;">
  <div class="demo" style="width: 100%;height: 100%;overflow: hidden;border-radius:8px;"></div>
</div>

<script setup>
import { onMounted } from 'vue'

onMounted(async () => {
  const { Mindmap, getDefaultData } = await import('@ymindmap/browser');
  const { TextMindmapExtension } = await import('@ymindmap/extension-text');
  const { MindmapExtension } = await import('@ymindmap/extension-mindmap');
  const { CollabExtension } = await import('@ymindmap/extension-collab');
  const { LocalForageProvider } = await import('y-localforage');
  const { applyUpdate } = await import('yjs');
  const localforage = await import('localforage');

  new Mindmap({
    el: '.demo',
    editable: true,
    options: {
        Collab: {
            defaultData: getDefaultData(),
            handlerYdoc(ydoc, callback) {
                const provider = new LocalForageProvider(localforage, ydoc);
                provider.on('synced', callback);

                if (BroadcastChannel) {
                    const bc = new BroadcastChannel("yjs")

                    ydoc.on("update", (update) => {
                    bc.postMessage({ client: ydoc.clientID, update })
                })

                bc.addEventListener("message", (msg) => {
                    const { data } = msg
                    if (data.client !== ydoc.clientID) {
                        applyUpdate(ydoc, data.update)
                    }
                })
          }

          return provider;
        }
        }
    },
    extensions: {
      Collab: CollabExtension,
      Text: TextMindmapExtension,
      Mindmap: MindmapExtension
    },
  })
})
</script>
