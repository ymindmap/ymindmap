import { Mindmap, getDefaultData, schema } from '@ymindmap/core';
import "./style.css";

const mindmap = new Mindmap({
  data: getDefaultData(),
  schema,
});

// document.querySelector<HTMLDivElement>("#app")?.appendChild(mindmap.getElement() as HTMLElement)

console.log(mindmap);
Reflect.set(window, 'mindmap', mindmap);