import { createMindmap } from 'ymindmap';
import { getDefaultData } from '@ymindmap/browser';
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
const extensions: Record<string, IExtensionConfig> = {}

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

  const mindmap = createMindmap("#app", {
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