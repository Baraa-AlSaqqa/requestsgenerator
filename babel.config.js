const presets = [
    [ "@babel/preset-env",
        {
            targets: {
                edge: "17",
                firefox: "60",
                chrome: "67",
                safari: "11.1",
            },
            useBuiltIns: 'entry',
        },
    ],
];

module.exports = {
    presets,
    plugins: [ 
        require("@babel/polyfill"),
        require("@babel/plugin-proposal-export-default-from"),
        require("@babel/plugin-proposal-logical-assignment-operators"),
        require("@babel/plugin-proposal-optional-chaining"),
        require("@babel/plugin-syntax-dynamic-import"),
        [require("@babel/plugin-proposal-decorators"), {
            "legacy": true
        }],
        [require("@babel/plugin-proposal-class-properties"), {
            "loose": false
        }],
        ["@babel/plugin-transform-arrow-functions", {
            "spec": true
        }],
    ]
};
