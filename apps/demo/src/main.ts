import { Mindmap, getDefaultData } from '@ymindmap/browser';
import { TextMindmapExtension } from '@ymindmap/extension-text'
import { MindmapExtension } from '@ymindmap/extension-mindmap'
import "./style.css";

const mindmap = new Mindmap({
  el: '#app',
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

Reflect.set(window, 'mindmap', mindmap);