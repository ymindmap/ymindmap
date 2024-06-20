import { Mindmap, getDefaultData } from '@ymindmap/browser';
import "./style.css";

const mindmap = new Mindmap({
  data: getDefaultData(),
  editable: true,
});

mindmap.on('change', (value) => {
  localStorage.setItem('data', value)
})

document.querySelector<HTMLDivElement>("#app")?.appendChild(mindmap.dom as HTMLElement)

Reflect.set(window, 'mindmap', mindmap);