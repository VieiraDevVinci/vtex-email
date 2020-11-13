const gulp = require('gulp');
const handlebars = require('handlebars');
const gulpHandlebars = require('gulp-handlebars-html')(handlebars); //default to require('handlebars') if not provided
const rename = require('gulp-rename');
const templateData = require('./src/data/data');
const concat = require('gulp-concat');



handlebars.registerHelper('eq', function(a,b,c){
  console.log(a,b,c)
    return a == b ? c : 'false'
  });
  

gulp.task('default', function () {    

	const options = {
		
	}

	return gulp.src('src/**/*.hbs')
        .pipe(gulpHandlebars(templateData, options))
        .pipe(rename({extname: ".html"}))
		.pipe(gulp.dest('build'));
});

 
