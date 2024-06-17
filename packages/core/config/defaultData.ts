import { js2xml } from 'xml-js';

export function getDefaultData() {
    return js2xml({
        "mindmap": {
            "topic": [
                {
                    "_attributes": {
                        "id": "root",
                    },
                    "topic": [
                        {
                            "_attributes": {
                            },
                        },
                        {
                            "_attributes": {
                            },
                        },
                    ]
                },
            ]
        }
    }, { compact: true })
}