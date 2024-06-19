import { topic, mindmap, text, doc } from '@ymindmap/view'
import { Schema } from '@ymindmap/model'

export const schema = new Schema({
    nodes: {
        mindmap,
        topic,
        text
    },
    topNodeType: doc
});

export default schema;
