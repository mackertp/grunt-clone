module.exports = function(grunt) { 
    grunt.loadNpmTasks('grunt-contrib-watch'); 
    grunt.config('unitTest', { 
        'scss': { 
            'files': [ 
                'src/**/*.js' 
            ], 
            'tasks': [
                'mochaTest'
            ], 
            'options': { 
                'spawn': true 
            } 
        } 
    }); 
};