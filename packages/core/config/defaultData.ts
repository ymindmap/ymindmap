import { js2xml } from 'xml-js';

export function getDefaultData(defaultTopic = '请输入内容') {
    return js2xml({
        "mindmap": {
            "topic": [
                {
                    "_attributes": {
                        "id": "root",
                    },
                    "_text": defaultTopic,
                    // "topic": [
                    //     {
                    //         "_attributes": {
                    //         },
                    //         "_text": defaultTopic
                    //     },
                    //     {
                    //         "_attributes": {
                    //         },
                    //         "_text": defaultTopic
                    //     },
                    // ]
                },
            ]
        }
    }, { compact: true })
}