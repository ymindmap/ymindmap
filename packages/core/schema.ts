import { topic, mindmap } from '@ymindmap/view'
import { Schema } from '@ymindmap/model'

export const schema = new Schema({
    nodes: {
        topic
    },
    topNodeType: mindmap
});

export default schema;
