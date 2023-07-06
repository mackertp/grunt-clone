module.exports = function(grunt) { 
    grunt.registerTask('step-two', function() {
        grunt.task.requires('step-one'); 
    }); 
};
