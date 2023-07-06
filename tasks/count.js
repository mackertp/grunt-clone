module.exports = function(grunt) {
    grunt.registerTask('count', 'counts to limit', function() { 
        var limit = parseInt(grunt.option('limit'), 10); 
        if (isNaN(limit)) grunt.fail.fatal('A limit must be provided (e.g. --limit=10)');
            console.log('Counting to: %s', limit); 
        for (var i = 1; i <= limit; i++) 
            console.log(i); 
    }); 
};