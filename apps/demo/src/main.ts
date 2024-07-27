import { Mindmap, getDefaultData } from '@ymindmap/browser';
import { TextMindmapExtension } from '@ymindmap/extension-text'
import { MindmapExtension } from '@ymindmap/extension-mindmap'
import { CollabExtension } from '@ymindmap/extension-collab'
import { LocalForageProvider } from 'y-localforage'
import qs from 'qs';
import localforage from 'localforage';
import "./style.css";

import type { Doc } from 'yjs';
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
        handlerYdoc(ydoc: Doc) {
          const provider = new LocalForageProvider(DocStore, ydoc);
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