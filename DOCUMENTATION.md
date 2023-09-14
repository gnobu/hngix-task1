# API Documentation
This endpoint is used to perform CRUD operations on a "person" resource. See the list of request endpoints and their specifications below. Examples of successful requests and a few failed requests are also provided in the response fields. 

```
{
    "requests": [
        {
            "name": "create a person",
            "request": {
                "description": "This request creates a person in the database.",
                "method": "POST",
                "header": [],
                "body": {
                    "mode": "raw",
                    "raw": "{\r\n    \"name\": \"John Doe\"\r\n}",
                    "options": {
                        "raw": {
                            "language": "json"
                        }
                    }
                },
                "url": {
                    "raw": "{{baseUrl}}/api/",
                    "host": [
                        "{{baseUrl}}"
                    ],
                    "path": [
                        "api",
                        ""
                    ]
                }
            },
            "response": [
                {
                    "id": "2d0c3a52-fdee-49e8-9f4e-c3f402b9e028",
                    "name": "create person named \"John Doe\"",
                    "originalRequest": {
                        "method": "POST",
                        "header": [],
                        "body": {
                            "mode": "raw",
                            "raw": "{\r\n    \"name\": \"John Doe\"\r\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": {
                            "raw": "{{baseUrl}}/api/",
                            "host": [
                                "{{baseUrl}}"
                            ],
                            "path": [
                                "api",
                                ""
                            ]
                        }
                    },
                    "status": "Created",
                    "code": 201,
                    "_postman_previewlanguage": "json",
                    "header": [
                        {
                            "key": "X-Powered-By",
                            "value": "Express"
                        },
                        {
                            "key": "Access-Control-Allow-Origin",
                            "value": "*"
                        },
                        {
                            "key": "Content-Type",
                            "value": "application/json; charset=utf-8"
                        },
                        {
                            "key": "Content-Length",
                            "value": "51"
                        },
                        {
                            "key": "ETag",
                            "value": "W/\"33-M4e5W/o3o3zkBNR5oKzui8Zst8U\""
                        },
                        {
                            "key": "Date",
                            "value": "Thu, 14 Sep 2023 13:18:48 GMT"
                        },
                        {
                            "key": "Connection",
                            "value": "keep-alive"
                        },
                        {
                            "key": "Keep-Alive",
                            "value": "timeout=5"
                        }
                    ],
                    "cookie": [],
                    "responseTime": null,
                    "body": "{\n    \"name\": \"John Doe\",\n    \"id\": \"6503083702bbb10b27b24e8d\"\n}",
                    "uid": "21264552-2d0c3a52-fdee-49e8-9f4e-c3f402b9e028"
                }
            ],
            "uid": "21264552-26229a1f-4773-4bae-87b8-78d55791bbe5"
        },
        {
            "name": "update a person",
            "request": {
                "description": "This request updates a person in the database.",
                "method": "PUT",
                "header": [],
                "body": {
                    "mode": "raw",
                    "raw": "{\r\n    \"name\": \"Jane Doe\"\r\n}",
                    "options": {
                        "raw": {
                            "language": "json"
                        }
                    }
                },
                "url": {
                    "raw": "{{baseUrl}}/api/:id",
                    "host": [
                        "{{baseUrl}}"
                    ],
                    "path": [
                        "api",
                        ":id"
                    ],
                    "variable": [
                        {
                            "key": "id",
                            "value": "650211a75b0220757e8a0013"
                        }
                    ]
                }
            },
            "response": [
                {
                    "id": "c88c33dd-fecb-4866-b59a-c3787984c0a2",
                    "name": "update a person",
                    "originalRequest": {
                        "method": "PUT",
                        "header": [],
                        "body": {
                            "mode": "raw",
                            "raw": "{\r\n    \"name\": \"Jane Doe\"\r\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": {
                            "raw": "{{baseUrl}}/api/:id",
                            "host": [
                                "{{baseUrl}}"
                            ],
                            "path": [
                                "api",
                                ":id"
                            ],
                            "variable": [
                                {
                                    "key": "id",
                                    "value": "650211a75b0220757e8a0013"
                                }
                            ]
                        }
                    },
                    "status": "OK",
                    "code": 200,
                    "_postman_previewlanguage": "json",
                    "header": [
                        {
                            "key": "X-Powered-By",
                            "value": "Express"
                        },
                        {
                            "key": "Access-Control-Allow-Origin",
                            "value": "*"
                        },
                        {
                            "key": "Content-Type",
                            "value": "application/json; charset=utf-8"
                        },
                        {
                            "key": "Content-Length",
                            "value": "51"
                        },
                        {
                            "key": "ETag",
                            "value": "W/\"33-+0Q8M3D8OhnPgMKd5ej+Db1cxwE\""
                        },
                        {
                            "key": "Date",
                            "value": "Thu, 14 Sep 2023 13:22:20 GMT"
                        },
                        {
                            "key": "Connection",
                            "value": "keep-alive"
                        },
                        {
                            "key": "Keep-Alive",
                            "value": "timeout=5"
                        }
                    ],
                    "cookie": [],
                    "responseTime": null,
                    "body": "{\n    \"name\": \"Jane Doe\",\n    \"id\": \"650211a75b0220757e8a0013\"\n}",
                    "uid": "21264552-c88c33dd-fecb-4866-b59a-c3787984c0a2"
                }
            ],
            "uid": "21264552-04b384f0-7ad9-4e8a-9bd0-a6791138bb42"
        },
        {
            "name": "find all persons",
            "request": {
                "description": "This request retrieves all persons in the database.",
                "method": "GET",
                "header": [],
                "url": {
                    "raw": "{{baseUrl}}/api/",
                    "host": [
                        "{{baseUrl}}"
                    ],
                    "path": [
                        "api",
                        ""
                    ]
                }
            },
            "response": [
                {
                    "id": "1eaa5e4b-97f1-4f07-a727-e90fc4511445",
                    "name": "find all persons",
                    "originalRequest": {
                        "method": "GET",
                        "header": [],
                        "url": {
                            "raw": "{{baseUrl}}/api/",
                            "host": [
                                "{{baseUrl}}"
                            ],
                            "path": [
                                "api",
                                ""
                            ]
                        }
                    },
                    "status": "OK",
                    "code": 200,
                    "_postman_previewlanguage": "json",
                    "header": [
                        {
                            "key": "X-Powered-By",
                            "value": "Express"
                        },
                        {
                            "key": "Access-Control-Allow-Origin",
                            "value": "*"
                        },
                        {
                            "key": "Content-Type",
                            "value": "application/json; charset=utf-8"
                        },
                        {
                            "key": "Content-Length",
                            "value": "105"
                        },
                        {
                            "key": "ETag",
                            "value": "W/\"69-U9M9bfQCKuMJXw2Sif2qI7Ko8+k\""
                        },
                        {
                            "key": "Date",
                            "value": "Thu, 14 Sep 2023 13:25:23 GMT"
                        },
                        {
                            "key": "Connection",
                            "value": "keep-alive"
                        },
                        {
                            "key": "Keep-Alive",
                            "value": "timeout=5"
                        }
                    ],
                    "cookie": [],
                    "responseTime": null,
                    "body": "[\n    {\n        \"name\": \"Jane Doe\",\n        \"id\": \"650211a75b0220757e8a0013\"\n    },\n    {\n        \"name\": \"John Doe\",\n        \"id\": \"6503083702bbb10b27b24e8d\"\n    }\n]",
                    "uid": "21264552-1eaa5e4b-97f1-4f07-a727-e90fc4511445"
                }
            ],
            "uid": "21264552-ea0bf9be-5006-45d5-9c67-f82acbece801"
        },
        {
            "name": "find a person",
            "request": {
                "description": "This request retrieves a person from the database.",
                "method": "GET",
                "header": [],
                "url": {
                    "raw": "{{baseUrl}}/api/:id",
                    "host": [
                        "{{baseUrl}}"
                    ],
                    "path": [
                        "api",
                        ":id"
                    ],
                    "variable": [
                        {
                            "key": "id",
                            "value": "650211a75b0220757e8a0013"
                        }
                    ]
                }
            },
            "response": [
                {
                    "id": "00a74116-fcb0-4bd9-a507-cfcd7d53cd5f",
                    "name": "person found",
                    "originalRequest": {
                        "method": "GET",
                        "header": [],
                        "url": {
                            "raw": "{{baseUrl}}/api/:id",
                            "host": [
                                "{{baseUrl}}"
                            ],
                            "path": [
                                "api",
                                ":id"
                            ],
                            "variable": [
                                {
                                    "key": "id",
                                    "value": "650211a75b0220757e8a0013"
                                }
                            ]
                        }
                    },
                    "status": "OK",
                    "code": 200,
                    "_postman_previewlanguage": "json",
                    "header": [
                        {
                            "key": "X-Powered-By",
                            "value": "Express"
                        },
                        {
                            "key": "Access-Control-Allow-Origin",
                            "value": "*"
                        },
                        {
                            "key": "Content-Type",
                            "value": "application/json; charset=utf-8"
                        },
                        {
                            "key": "Content-Length",
                            "value": "51"
                        },
                        {
                            "key": "ETag",
                            "value": "W/\"33-+0Q8M3D8OhnPgMKd5ej+Db1cxwE\""
                        },
                        {
                            "key": "Date",
                            "value": "Thu, 14 Sep 2023 13:23:37 GMT"
                        },
                        {
                            "key": "Connection",
                            "value": "keep-alive"
                        },
                        {
                            "key": "Keep-Alive",
                            "value": "timeout=5"
                        }
                    ],
                    "cookie": [],
                    "responseTime": null,
                    "body": "{\n    \"name\": \"Jane Doe\",\n    \"id\": \"650211a75b0220757e8a0013\"\n}",
                    "uid": "21264552-00a74116-fcb0-4bd9-a507-cfcd7d53cd5f"
                },
                {
                    "id": "32fd7017-94c1-44e3-9214-498208ff8590",
                    "name": "person not found",
                    "originalRequest": {
                        "method": "GET",
                        "header": [],
                        "url": {
                            "raw": "{{baseUrl}}/api/:id",
                            "host": [
                                "{{baseUrl}}"
                            ],
                            "path": [
                                "api",
                                ":id"
                            ],
                            "variable": [
                                {
                                    "key": "id",
                                    "value": "650211a75b0220757e8a0014"
                                }
                            ]
                        }
                    },
                    "status": "OK",
                    "code": 200,
                    "_postman_previewlanguage": "json",
                    "header": [
                        {
                            "key": "X-Powered-By",
                            "value": "Express"
                        },
                        {
                            "key": "Access-Control-Allow-Origin",
                            "value": "*"
                        },
                        {
                            "key": "Content-Type",
                            "value": "application/json; charset=utf-8"
                        },
                        {
                            "key": "Content-Length",
                            "value": "4"
                        },
                        {
                            "key": "ETag",
                            "value": "W/\"4-K+iMpCQsduglOsYkdIUQZQMtaDM\""
                        },
                        {
                            "key": "Date",
                            "value": "Thu, 14 Sep 2023 13:24:50 GMT"
                        },
                        {
                            "key": "Connection",
                            "value": "keep-alive"
                        },
                        {
                            "key": "Keep-Alive",
                            "value": "timeout=5"
                        }
                    ],
                    "cookie": [],
                    "responseTime": null,
                    "body": "null",
                    "uid": "21264552-32fd7017-94c1-44e3-9214-498208ff8590"
                }
            ],
            "uid": "21264552-7017a43a-47a2-4ee3-ac8d-fc38b85ce34c"
        },
        {
            "name": "delete a person",
            "request": {
                "description": "This request deletes a person from the database.",
                "method": "DELETE",
                "header": [],
                "url": {
                    "raw": "{{baseUrl}}/api/:id",
                    "host": [
                        "{{baseUrl}}"
                    ],
                    "path": [
                        "api",
                        ":id"
                    ],
                    "variable": [
                        {
                            "key": "id",
                            "value": "650306e935563c718b5250c8"
                        }
                    ]
                }
            },
            "response": [
                {
                    "id": "17f04a72-8e42-4c1e-80e0-c385724de304",
                    "name": "successful delete",
                    "originalRequest": {
                        "method": "DELETE",
                        "header": [],
                        "url": {
                            "raw": "{{baseUrl}}/api/:id",
                            "host": [
                                "{{baseUrl}}"
                            ],
                            "path": [
                                "api",
                                ":id"
                            ],
                            "variable": [
                                {
                                    "key": "id",
                                    "value": "650306e935563c718b5250c8"
                                }
                            ]
                        }
                    },
                    "status": "OK",
                    "code": 200,
                    "_postman_previewlanguage": "json",
                    "header": [
                        {
                            "key": "X-Powered-By",
                            "value": "Express"
                        },
                        {
                            "key": "Access-Control-Allow-Origin",
                            "value": "*"
                        },
                        {
                            "key": "Content-Type",
                            "value": "application/json; charset=utf-8"
                        },
                        {
                            "key": "Content-Length",
                            "value": "53"
                        },
                        {
                            "key": "ETag",
                            "value": "W/\"35-gf3jpcAvIXOs4/hqPx/BPrMMSq0\""
                        },
                        {
                            "key": "Date",
                            "value": "Thu, 14 Sep 2023 13:19:59 GMT"
                        },
                        {
                            "key": "Connection",
                            "value": "keep-alive"
                        },
                        {
                            "key": "Keep-Alive",
                            "value": "timeout=5"
                        }
                    ],
                    "cookie": [],
                    "responseTime": null,
                    "body": "{\n    \"name\": \"John Koffi\",\n    \"id\": \"650306e935563c718b5250c8\"\n}",
                    "uid": "21264552-17f04a72-8e42-4c1e-80e0-c385724de304"
                },
                {
                    "id": "52abebc4-4053-437a-907f-5b6cd8311056",
                    "name": "standard error",
                    "originalRequest": {
                        "method": "DELETE",
                        "header": [],
                        "url": {
                            "raw": "{{baseUrl}}/api/:id",
                            "host": [
                                "{{baseUrl}}"
                            ],
                            "path": [
                                "api",
                                ":id"
                            ],
                            "variable": [
                                {
                                    "key": "id",
                                    "value": "650306e935563c718b5250c8"
                                }
                            ]
                        }
                    },
                    "status": "Not Found",
                    "code": 404,
                    "_postman_previewlanguage": "json",
                    "header": [
                        {
                            "key": "X-Powered-By",
                            "value": "Express"
                        },
                        {
                            "key": "Access-Control-Allow-Origin",
                            "value": "*"
                        },
                        {
                            "key": "Content-Type",
                            "value": "application/json; charset=utf-8"
                        },
                        {
                            "key": "Content-Length",
                            "value": "36"
                        },
                        {
                            "key": "ETag",
                            "value": "W/\"24-20/QkAYVV7WS2xhewDlbaaGiki8\""
                        },
                        {
                            "key": "Date",
                            "value": "Thu, 14 Sep 2023 13:20:53 GMT"
                        },
                        {
                            "key": "Connection",
                            "value": "keep-alive"
                        },
                        {
                            "key": "Keep-Alive",
                            "value": "timeout=5"
                        }
                    ],
                    "cookie": [],
                    "responseTime": null,
                    "body": "{\n    \"errors\": [\n        {\n            \"message\": \"Not Found\"\n        }\n    ]\n}",
                    "uid": "21264552-52abebc4-4053-437a-907f-5b6cd8311056"
                }
            ],
            "uid": "21264552-d9a12c66-a206-42de-a6e2-09e82ead81bd"
        }
    ]
}
```