/**
 * Grunt is a task runner for JavaScript. It is a good starting place to learn about functional programming
 * and how to work with JavaScript.
 * 
 * https://gruntjs.com/
 * 
 * Helpful functions:
 * --------------------------------------------------
 * grunt.log.write() Prints a message to the console 
 * grunt.log.writeln() Prints a message to the console, followed by a newline character 
 * grunt.log.oklns() Prints a success message to the console, followed by a newline character 
 * grunt.log.error() Prints an error message to the console, followed by a newline character 
 * grunt.log.subhead() Prints a bold message to the console, followed by a newline character
 * grunt.log.debug() Prints a message to the console only if the --debug flag was passed
 * grunt.fail.warn() Displays a warning and aborts Grunt immediately. Tasks will continue to run if the --force option is passed 
 * grunt.fail.fatal() Displays a warning and aborts Grunt immediately
 * grunt.file.read() Reads and returns file’s contents 
 * grunt.file.readJSON() Reads a file’s contents, parsing the data as JSON, and returns the result 
 * grunt.file.write() Writes the specified contents to a file, creating intermediate directories, if necessary 
 * grunt.file.copy() Copies a source file to a destination path, creating intermediate directories, if necessary 
 * grunt.file.delete() Deletes the specified file path; deletes files and folders recursively 
 * grunt.file.mkdir() Creates a directory, along with any missing intermediate directories 
 * grunt.file.recurse() Recurses into a directory, executing a callback for every file that is found
 * 
 * @author Preston Mackert
 */

module.exports = function(grunt) { 
    // custom grunt tasks -- with technology, anything is possible
    grunt.loadTasks('tasks'); 
    grunt.config('file-report', { 
        'options': { 
        }, 
        'public': { 
            'src': ['public/**/*'] 
        }, 
        'styles': {
            'src': ['public/assets/css/**/*']
        },
        'images': { 
            'src': ['public/assets/images/**/*'] 
        }
    }); 
    grunt.loadTasks('tasks'); 
    grunt.registerTask('default', ['watch']); 
};
