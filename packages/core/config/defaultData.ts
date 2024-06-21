import { js2xml } from 'xml-js';

export function getDefaultData() {
    return js2xml({
        "doc": {
            "mindmap": [
                {
                    "topic": [
                        {
                            "_attributes": {
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
                        {
                            "_attributes": {
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
            ]
        }
    }, { compact: true })
}