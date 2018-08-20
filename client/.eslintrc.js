module.exports = {
    "extends": "airbnb",
    "plugins": ["react"],
    "parser": "babel-eslint",
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "linebreak-style": ["error", "windows"]
    },
    "env": {
        "browser": true
    }
};