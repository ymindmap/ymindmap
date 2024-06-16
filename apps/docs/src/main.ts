import { Mindmap, getDefaultData, schema } from '@ymindmap/browser';
import "./style.css";

const mindmap = new Mindmap({
  data: getDefaultData(),
  schema,
  editable: true,
});

mindmap.on('change', (value) => {
  localStorage.setItem('data', value)
})

document.querySelector<HTMLDivElement>("#app")?.appendChild(mindmap.dom as HTMLElement)

console.log(mindmap);
Reflect.set(window, 'mindmap', mindmap);