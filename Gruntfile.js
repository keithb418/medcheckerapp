'use strict';
var LIVERELOAD_PORT = 9000;
var SERVER_PORT = 9000;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var pkg = require('./package.json');
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  var yeomanConfig = {
    app: 'app',
    dist: 'dist',
    unitTests: 'test/unit_tests'
  };

  grunt.initConfig({
    yeoman: yeomanConfig,
    watch: {
      options: {
        spawn: false,
        livereload: true
      },
      lint: {
        files: [
          '<%= yeoman.app %>/js/**/*.js',
        ],
        tasks: ['jshint']
      },
      build: {
        files: [
          '<%= yeoman.app %>/js/**/*',
          '<%= yeoman.app %>/css/**/*',
          '<%= yeoman.app %>/html/**/*'
        ],
        tasks: ['devBuild']
      }
    },
    notify: {
      gradle: {
        options: {
          title: 'GSA Application',
          message: 'Deployment Successful'
        }
      }
    },
    connect: {
      options: {
        port: grunt.option('port') || SERVER_PORT,
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, yeomanConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'test'),
              mountFolder(connect, yeomanConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, yeomanConfig.dist)
            ];
          }
        }
      }
    },
    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>'
      },
      test: {
        path: 'http://localhost:<%= connect.test.options.port %>'
      }
    },
    clean: {
      dist: ['.tmp', '<%= yeoman.dist %>/*'],
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/js/**/*.js',
        'test/spec/{,*/}*.js',
        '!<%= yeoman.app %>/js/lib/**/*'
      ]
    },
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/css',
        cssDir: '.tmp/css',
        imagesDir: ['<%= yeoman.app %>/assets'],
        javascriptsDir: '<%= yeoman.app %>/js',
        fontsDir: '<%= yeoman.app %>/css/fonts',
        importPath: '<%= yeoman.app %>/lib',
        relativeAssets: true
      },
      dist: {},
      dev: {},
      server: {
        options: {
          debugInfo: true
        }
      }
    },
    requirejs: {
      dist: {
        options: {
          baseUrl: '<%= yeoman.app %>/js',
          optimize: 'none',
          preserveLicenseComments: false,
          useStrict: true,
          wrap: true
        }
      }
    },
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>'
      }
    },
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html', '<%= yeoman.dist %>/js/*.js'],
      css: ['<%= yeoman.dist %>/css/{,*/}*.css'],
      options: {
        dirs: ['<%= yeoman.dist %>']
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/assets',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= yeoman.dist %>/assets'
        }]
      }
    },
    cssmin: {
      dist: {
        files: {
          '<%= yeoman.dist %>/css/gsa.css': [
            '.tmp/css/{,*/}*.css',
            '<%= yeoman.app %>/css/{,*/}*.css'
          ]
        }
      }
    },
    jasmine: {
			app: {
				options: {
					outfile: '<%= yeoman.unitTests %>/runner/SpecRunner.html',
					keepRunner: true,
					specs: '<%= yeoman.unitTests %>/specs/*Spec.js',
					helpers: '<%= yeoman.unitTests %>/spec_helpers/*Helpers.js',
					template: require('grunt-template-jasmine-requirejs'),
					templateOptions: {
						requireConfigFile: ['<%= yeoman.app %>/js/config.js', '<%= yeoman.unitTests %>/testConfig.js']
					}
				}
			}
		},
    htmlmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          src: '*.html',
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,txt,png}',
            '.htaccess',
            'assets/{,*/}*.{webp,gif}',
            'css/fonts/{,*/}*.*',
            'lib/sass-bootstrap/fonts/*.*'
          ]
        },
        {
          expand: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: ['lib/lv-widgets/src/assets/*.gif']
        }]
      },
      dev: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%= yeoman.app %>',
            dest: '<%= yeoman.dist %>',
            src: ['**', '!**/*.scss']
          },
          {
            expand: true,
            flatten: true,
            dest: '<%= yeoman.dist %>/css/',
            src: ['.tmp/css/{,*/}*.css']
          }
        ]
      }
    },
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/js/{,*/}*.js',
            '<%= yeoman.dist %>/css/{,*/}*.css',
            '/css/fonts/{,*/}*.*',
            'lib/sass-bootstrap/fonts/*.*'
          ]
        }
      }
    },
    shell: {
      seleniumClean: {
        command: 'rm -rf ./test/reports/'
      },
      selenium: {
        command: 'rspec',
        options : {
          stdout: true,
          stderr: true,
          failOnError: true,
          execOptions : {
            cwd: 'test/selenium-ruby'
          }
        }
      },
      deploywar: {
        command: './gradlew deploywar',
        options : {
          stdout: true,
          stderr: true,
          failOnError: true
        }
      }
    },
    nodemon: {
      dev: {
        script: 'server.js'
      }
    },
    concurrent: {
      dev: {
        tasks: ['nodemon', 'open:server', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    tomcat_deploy: {
      host: 'localhost',
      login: 'manager',
      password: 'localMagicPass',
      path: '/' + pkg['artifact-name'],
      port: 8080,
      dist: 'dist',
      war: 'build/libs/' + pkg['artifact-name'] + '.war',
      deploy: '/manager/text/deploy',
      undeploy: '/manager/text/undeploy'
    },
    compress: {
      war: {
        options: {
          archive: 'build/libs/' + pkg['artifact-name'] + '.war',
          mode: 'zip'
        },
        files: [
          {
            cwd: 'dist/', 
            expand: true, 
            src: ['**/*', '!**/*.tgz']
          }
        ]
      }
    } //end compress
  });
  grunt.loadNpmTasks('grunt-tomcat-deploy');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('default', [
    'devBuild'
  ]);

  grunt.registerTask('build', [
    'jshint',
    'clean:dist',
    'compass:dist',
    'useminPrepare',
    'requirejs',
    'imagemin',
    'htmlmin',
    'concat',
    'cssmin',
    'uglify',
    'copy:dist',
    'rev',
    'usemin'
  ]);
  grunt.registerTask('devBuild', [
    'clean:dist',
    'compass:dev',
    'copy:dev'
  ]);

  grunt.registerTask('selenium', [
    'jshint',
    'shell:selenium'
  ]);
  
  grunt.registerTask('serve', ['devBuild', 'concurrent:dev']);
  
  grunt.registerTask('test', ['jasmine:app']);
  grunt.registerTask('deploy', function(arg) {
    if(arg==='d') {
      grunt.task.run(['devBuild','compress:war','tomcat_redeploy']);
    }
    else if (arg==='production') {
      //right now the login is admin on prod, but manager on local envs
      grunt.config('tomcat_deploy.login','admin');
      grunt.config('tomcat_deploy.host', process.env.PROD_TC_HOST);
      grunt.config('tomcat_deploy.password', process.env.PROD_TC_PWD);
      grunt.task.run(['build', 'test','compress:war','tomcat_redeploy']);
      //grunt.task.run(['devBuild','compress:war','tomcat_redeploy']);
    }
    else if (arg==='docker') {
      grunt.config('tomcat_deploy.login','admin');
      grunt.config('tomcat_deploy.host', process.env.DOCKER_TC_HOST);
      grunt.config('tomcat_deploy.password', 'dockerTom');
      grunt.task.run(['devBuild','compress:war','tomcat_redeploy']);
    }
  });
};
