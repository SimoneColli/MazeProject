# Custom templates

Step 1 create/edit `NxN.json` as follow

```json
[
    {
        "begin": "{y-coord}-{x-coord}",
        "end": "{y-coord}-{x-coord}",
        "i:{y-coord}-j:{x-coord}": {
            "valid": 0, // 1 if contains bush, 0 otherwise
            "start": 0, // 1 if corresponds to start of a path, 0 otherwise
            "end": 0 // 1 if corresponds to end of a path, 0 otherwise
        }
        // ...
    },
    {},
    // ...
    {}
]
```

Step 2 save file in `templates/{folder}` where `{folder}` is:

-   `normal`, if labirint will used in normal mode.
-   `hidden`, if labirint will used in hidden mode.
