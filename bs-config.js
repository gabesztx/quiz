module.exports = {
    "ui": {
        "port": 3001,
        "weinre": {
            "port": 8080
        }
    },
    "files": ['build/**/*.*','*.html'],
    "watchOptions": {},
    "server": './',
    "proxy": false,
    "port": 3000,
    "middleware": false,
    "serveStatic": [],
    "ghostMode": {
        "clicks": true,
        "scroll": true,
        "forms": {
            "submit": true,
            "inputs": true,
            "toggles": true
        }
    },
    "logLevel": "info",
    "logPrefix": "BS",
    "logConnections": false,
    "logFileChanges": true,
    "logSnippet": true,
    "rewriteRules": false,
    "open":true,
    "browser": "default",
    "xip": false,
    "hostnameSuffix": false,
    "reloadOnRestart": false,
    "notify": true,
    "scrollProportionally": false,
    "scrollThrottle": 0,
    "scrollRestoreTechnique": "window.name",
    "scrollElements": ['.scrolled'],
    "scrollElementMapping": [],
    "reloadDelay": 2000,
    "reloadDebounce": 0,
    "plugins": [],
    "injectChanges": true,
    "startPath": null,
    "minify": true,
    "host": null,
    "codeSync": true,
    "timestamps": true,
    "clientEvents": [
        "scroll",
        "scroll:element",
        "input:text",
        "input:toggles",
        "form:submit",
        "form:reset",
        "click"
    ],
    "socket": {
        "socketIoOptions": {
            "log": false
        },
        "socketIoClientConfig": {
            "reconnectionAttempts": 50
        },
        "path": "/browser-sync/socket.io",
        "clientPath": "/browser-sync",
        "namespace": "/browser-sync",
        "clients": {
            "heartbeatTimeout": 5000
        }
    },
    "tagNames": {
        "less": "link",
        "scss": "link",
        "css": "link",
        "jpg": "img",
        "jpeg": "img",
        "png": "img",
        "svg": "img",
        "gif": "img",
        "js": "script"
    }
};