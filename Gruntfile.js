const sass = require('node-sass');

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
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
        }
    });

  //Nạp package
  grunt.loadNpmTasks('grunt-sass');


  grunt.registerTask('default', ['sass']);

}
