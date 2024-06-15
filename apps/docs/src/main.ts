import { Mindmap, getDefaultData, schema } from '@ymindmap/core';
import "./style.css";

const mindmap = new Mindmap({
  data: getDefaultData(),
  schema,
});

document.querySelector<HTMLDivElement>("#app")!.appendChild(mindmap.canvas.getElement());

console.log(mindmap);