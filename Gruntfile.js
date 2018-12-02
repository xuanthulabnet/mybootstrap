const sass = require('node-sass');

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            scss: {
                files: ['src/customs/*.scss', 'src/mybootstrap.scss'],
                tasks: ['default'],
              },
            js: {
            files: ['src/js/*.js'],
            tasks: ['buildjs'],
            },
        },

        sass: {
            options: {
                implementation: sass,
                sourceMap: true
    
            },
    
            build: {
                files: {
                    'build/mybootstrap.css' : 'src/mybootstrap.scss'
                }
            }
        },
        cssmin: {
            options: {
              mergeIntoShorthands: false,
              roundingPrecision: -1
            },
            build: {
              files: {
                'build/mybootstrap.min.css' : 'build/mybootstrap.css' 
              }
            }
          },
          postcss: {
            options: {                
                processors: [
                  require('pixrem')(),
                  require('autoprefixer')({browsers: 'last 2 versions'}),
                ]
              },
            build: {
                src: 'build/mybootstrap.css'
              } 
          },

          copy: {
            js: {
                expand: true,
                cwd: 'node_modules/bootstrap/js/src',
                src: '**',
                dest: 'tmp/bootstrap/',
              },
          },

    concat: {
      options: {
        // Custom function to remove all export and import statements
        process: function (src) {
          return src.replace(/^(export|import).*/gm, '');
        }
      },
      bootstrap: {
        src: [
          //Gộp các JS của bootstrap, không cần cái nào thì comment bỏ đi

          'node_modules/bootstrap/js/src/util.js',
          'node_modules/bootstrap/js/src/alert.js',
          'node_modules/bootstrap/js/src/button.js',
          'node_modules/bootstrap/js/src/carousel.js',
          'node_modules/bootstrap/js/src/collapse.js',
          'node_modules/bootstrap/js/src/dropdown.js',
          'node_modules/bootstrap/js/src/modal.js',
          'node_modules/bootstrap/js/src/scrollspy.js',
          'node_modules/bootstrap/js/src/tab.js',
          'node_modules/bootstrap/js/src/tooltip.js',
          'node_modules/bootstrap/js/src/popover.js',

          //Gộp JS riêng
          'src/js/*.js'


        ],
        dest: 'tmp/js/all.js'
      }
    },
 
    babel: {
            options: {
                presets: ['@babel/preset-env']
              },
           
              build: {
                options: {
                    presets: ['@babel/preset-env']
                },
                files: {
                  'tmp/js/mybootstrap.js' : 'tmp/js/all.js'
                }
              }
        },
          
    uglify: { 
        build: {
            files: {
                'build/mybootstrap.min.js' : ['tmp/js/mybootstrap.js']
            }
        },
    },

    clean: {
        tmp: {
            src: ['tmp/*']
          },
    },
    jshint: {
        options: {
            '-W015': true,
            "esversion": 6
          },
        build: {
          src: ['src/js/*.js']
        },
      },
    
          
    });

  //Nạp package
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-postcss');

  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.loadNpmTasks('grunt-contrib-copy');



  grunt.registerTask('runwatch', ['watch']);
  grunt.registerTask('default', ['sass','postcss', 'cssmin', 'clean']);
  grunt.registerTask('buildjs', ['jshint', 'concat', 'babel:build', 'uglify', 'clean']); 


}
