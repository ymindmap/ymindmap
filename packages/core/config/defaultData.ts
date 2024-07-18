import { js2xml } from 'xml-js';

export function getDefaultData() {
    return js2xml({
        "doc": {
            "mindmap": [
                {
                    "topic": [
                        {
                            "_attributes": {
                                "title": "1"
                            },
                            "topic": [
                                // {
                                //     "_attributes": {
                                //         "title": "1.1"
                                //     },
                                // },
                                // {
                                //     "_attributes": {
                                //         "title": "1.2"
                                //     },
                                // },
                            ]
                        },
                        {
                            "_attributes": {
                                "title": "2"
                            },
                            "topic": [
                                // {
                                //     "_attributes": {
                                //         "title": "2.1"
                                //     },
                                // },
                                // {
                                //     "_attributes": {
                                //         "title": "2.2"
                                //     },
                                // },
                            ]
                        },
                        {
                            "_attributes": {
                                "title": "3"
                            },
                            "topic": [
                                // {
                                //     "_attributes": {
                                //         "title": "3.1"
                                //     },
                                // },
                                // {
                                //     "_attributes": {
                                //         "title": "3.2"
                                //     },
                                // },
                            ]
                        },
                    ]
                }
            ]
        }
    }, { compact: true })
}