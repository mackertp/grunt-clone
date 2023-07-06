var fs = require("fs");
var _ = require('lodash');
var sprintf = require('sprintf-js').sprintf;
_.mixin(require('underscore.string')); 

module.exports = function(grunt) {
    var mime = require('mime'); 
    var Table = require('cli-table'); 
    grunt.registerMultiTask(
        'file-report', 'Generates a report of file types & sizes used within a project', function() { 
            var report = { 
                'mimeTypes': {}, 
                'largest': null, 
                'smallest': null 
            }; 

            var table = new Table({ 
                'head': [
                    'Content Type', 
                    'Files Found', 
                    'Total Size', 
                    'Average Size', 
                    'Largest', 
                    'Smallest'
                ] 
            }); 
            
            var addFile = function(file) { 
                if (grunt.file.isDir(file)) return;
                var mimeType = mime.getType(file); 
                if (!report.mimeTypes[mimeType]) { 
                    report.mimeTypes[mimeType] = { 
                        'count': 0, 
                        'sizes': [], 
                        'largest': null,
                        'smallest': null,
                        'oldest': null,
                        'newest': null
                    }; 
                } 
                var details = report.mimeTypes[mimeType]; 
                details.count++; 
                var stats = fs.statSync(file); 
                details.sizes.push(stats.size); 
                if (!details.largest || stats.size > details.largest.size) { 
                    details.largest = { 
                        'file': file, 'size': stats.size 
                    }; 
                } 
                if (!report.largest || stats.size > report.largest.size) { 
                    report.largest = { 
                        'file': file, 'size': stats.size 
                    };
                } 
                if (!details.smallest || stats.size < details.smallest.size) { details.smallest = { 
                    'file': file, 'size': stats.size 
                }; 
            } 
            if (!report.smallest || stats.size < report.smallest.size) { 
                report.smallest = { 
                    'file': file, 'size': stats.size 
                }; 
            } 
        }; 
        var sum = function(arr) { 
            return arr.reduce(function(a, b) { 
                return a + b; 
            }); 
        }; 
        
        var displayReport = function() { 
            var totalSum = 0; 
            var totalFiles = 0; 
            var totalSizes = []; 
            _.each(report.mimeTypes, function(data, mType) {
                var fileSum = sum(data.sizes); 
                totalSum += fileSum; 
                totalFiles += data.sizes.length; 
                totalSizes = totalSizes.concat(data.sizes); 
                table.push([
                    mType, 
                    data.count, 
                    fileSum, 
                    fileSum / data.sizes.length, 
                    sprintf('%s (%s)', data.largest.file, data.largest.size), 
                    sprintf('%s (%s)', data.smallest.file, data.smallest.size), 
                ]); 
            }); 
            
            table.push(
                [
                    '-', 
                    totalFiles, 
                    totalSum, 
                    totalSum / totalSizes.length, 
                    sprintf('%s (%s)', report.largest.file, report.largest.size),
                    sprintf('%s (%s)', report.smallest.file, report.smallest.size), 
                ]); 
                console.log(table.toString()); 
            }; 

            this.files.forEach(function(files) { 
                files.src.forEach(addFile); 
            }); 

            displayReport(); 
        }); 
    };



