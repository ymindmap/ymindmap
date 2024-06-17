import { topic, mindmap, text } from '@ymindmap/view'
import { Schema } from '@ymindmap/model'

export const schema = new Schema({
    nodes: {
        topic,
        text
    },
    topNodeType: mindmap
});

export default schema;
