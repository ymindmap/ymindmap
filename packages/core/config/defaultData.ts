import { js2xml } from 'xml-js';

export function getDefaultData(defaultTopic = '请输入内容') {
    return js2xml({
        "name": "doc",
        "attributes": {

        },
        "elements": [
            {
                "name": "topic",
                "elements": [
                    {
                        type: "text",
                        text: defaultTopic
                    }
                ]
            }
        ]
    })
}