const sass = require('node-sass');

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            src: {
                files: ['src/customs/*.scss', 'src/mybootstrap.scss'],
                tasks: ['default'],
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
          }
          
    });

  //Nạp package
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-postcss');

  grunt.registerTask('runwatch', ['watch']);
  grunt.registerTask('default', ['sass','postcss', 'cssmin']);

}
