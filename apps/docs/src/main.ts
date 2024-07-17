import { Mindmap, getDefaultData } from '@ymindmap/browser';
import { TextMindmapExtension } from '@ymindmap/extension-text'
import { MindmapExtension } from '@ymindmap/extension-mindmap'
import "./style.css";

const mindmap = new Mindmap({
  data: getDefaultData(),
  editable: true,
  extensions: {
    Text: TextMindmapExtension,
    Mindmap: MindmapExtension
  },
  debug: true
});

mindmap.on('change', (value) => {
  localStorage.setItem('data', value)
})

document.querySelector<HTMLDivElement>("#app")?.appendChild(mindmap.dom as HTMLElement)

Reflect.set(window, 'mindmap', mindmap);