"use strict";

module.exports = function(grunt) {

    require("load-grunt-tasks")(grunt);

    grunt.initConfig({
        less: {
            style: {
                files: {
                    "build/css/style.css": "less/style.less"
                }
            }
        },

        postcss: {
            style: {
                options: {
                    processors: [require("autoprefixer")({
                        overrideBrowserslist: ["last 2 versions"]
                    })]
                },
                src: "build/css/*.css"
            }
        },

        browserSync: {
            server: {
                bsFiles: {
                    src: ["build/*.html", "build/css/*.css"]
                },
                options: {
                    server: "build",
                    watchTask: true,
                    notify: false,
                    open: true,
                    cors: true,
                    ui: false
                }
            }
        },

        watch: {
            html: {
                files: ["*.html"],
                tasks: ["copy:html"]
            },

            style: {
                files: ["less/**/*.less"],
                tasks: ["less", "postcss", "csso"]
            }
        },

        csso: {
            style: {
                options: {
                    report: "gzip"
                },
                files: {
                    "build/css/style.min.css": ["build/css/style.css"]
                }
            }
        },

        imagemin: {
            images: {
                options: {
                    optimizationLevel: 3
                },
                files: [{
                    expand: true,
                    src: ["build/img/**/*{png,jpg,gif}"]
                }]
            }
        },

        svgmin: {
            symbols: {
                files: [{
                    expand: true,
                    cwd: "build/img",
                    src: ["*.svg"],
                    dest: "build/img"
                }]
            }
        },

        svgstore: {
            options: {
                svg: {
                    style: "display: none"
                }
            },
            symbols: {
                files: {
                    "build/img/symbols.svg": ["img/*.svg"]
                }
            }
        },

        copy: {
            html: {
                files: [{
                    expand: true,
                    src: ["*.html"],
                    dest: "build"
                }]
            },
            build: {
                files: [{
                    expand: true,
                    src: ["css/**", "fonts/**/*.{woff,woff2}", "img/**", "js/**", "*.html"],
                    dest: "build"
                }]
            }
        },


        clean: {
            build: ["build"]
        }
    });

    grunt.registerTask("serve", ["browserSync", "watch"]);
    grunt.registerTask("symbols", ["svgmin", "svgstore"]);
    grunt.registerTask("build", ["clean",
        "copy",
        "less",
        "postcss",
        "csso",
        "symbols",
        // "imagemin"
    ]);
};
