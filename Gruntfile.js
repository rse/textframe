/*
**  TextFrame -- Re-Frame Multi-Line Text
**  Copyright (c) 2017 Ralf S. Engelschall <rse@engelschall.com>
**
**  Permission is hereby granted, free of charge, to any person obtaining
**  a copy of this software and associated documentation files (the
**  "Software"), to deal in the Software without restriction, including
**  without limitation the rights to use, copy, modify, merge, publish,
**  distribute, sublicense, and/or sell copies of the Software, and to
**  permit persons to whom the Software is furnished to do so, subject to
**  the following conditions:
**
**  The above copyright notice and this permission notice shall be included
**  in all copies or substantial portions of the Software.
**
**  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
**  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
**  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
**  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
**  CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
**  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
**  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/* global module: true */
module.exports = function (grunt) {
    grunt.loadNpmTasks("grunt-eslint")
    grunt.loadNpmTasks("grunt-browserify")
    grunt.loadNpmTasks("grunt-babel")
    grunt.loadNpmTasks("grunt-mocha-test")
    grunt.loadNpmTasks("grunt-contrib-clean")
    grunt.loadNpmTasks("grunt-contrib-watch")
    grunt.initConfig({
        eslint: {
            options: {
                configFile: "eslint.yaml"
            },
            "textframe": [ "src/**/*.js", "tst/**/*.js" ]
        },
        browserify: {
            "textframe": {
                files: {
                    "lib/textframe.browser.js": [ "src/textframe.js" ]
                },
                options: {
                    transform: [
                        [ "envify", { PLATFORM: "browser" } ],
                        [ "babelify", {
                            presets: [ "es2015", "es2016", "es2017", "stage-3", "stage-2" ],
                            plugins: [ [ "transform-runtime", {
                                "helpers":     false,
                                "polyfill":    false,
                                "regenerator": false,
                                "moduleName":  "babel-runtime"
                            } ] ]
                        } ],
                        [ "uglifyify", { sourceMap: false, global: true } ]
                    ],
                    plugin: [
                        [ "browserify-derequire" ],
                        [ "browserify-header" ]
                    ],
                    browserifyOptions: {
                        standalone: "textframe",
                        debug: false
                    }
                }
            }
        },
        babel: {
            "textframe": {
                files: {
                    "lib/textframe.node.js": [ "src/textframe.js" ]
                },
                options: {
                    sourceMap: false,
                    presets: [ "es2015", "es2016", "es2017", "stage-3", "stage-2" ],
                    plugins: [
                        [ "transform-runtime", {
                            "helpers":     false,
                            "polyfill":    false,
                            "regenerator": false,
                            "moduleName":  "babel-runtime"
                        } ]
                    ]
                }
            }
        },
        mochaTest: {
            "stdarg": {
                src: [ "tst/*.js" ]
            },
            options: {
                reporter: "spec"
            }
        },
        clean: {
            clean: [ "lib" ],
            distclean: [ "node_modules" ]
        },
        watch: {
            "src": {
                files: [ "src/**/*.js" ],
                tasks: [ "default" ],
                options: {}
            }
        }
    })
    grunt.registerTask("default", [ "eslint", "browserify", "babel", "test" ])
    grunt.registerTask("dev", [ "default", "watch" ])
    grunt.registerTask("test", [ "mochaTest" ])
}

