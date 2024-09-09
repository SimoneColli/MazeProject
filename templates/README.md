# Custom templates


Step 1 create/edit `.json` as follow

```json
[
    {
        "begin" : "{y-coord}-{x-coord}",
        "end" : "{y-coord}-{x-coord}",
        "i:{y-coord}-j:{x-coord}": {
            "valid": 0, // 1 if contains bush, 0 otherwise
            "start": 0, // 1 if corresponds to start of a path, 0 otherwise
            "end": 0 // 1 if corresponds to end of a path, 0 otherwise
        },
        // ...

    },
    {

    },
    // ...
    {

    }
]
```

