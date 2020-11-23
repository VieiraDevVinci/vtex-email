const gulp = require('gulp');
const handlebars = require('handlebars');
const gulpHandlebars = require('gulp-handlebars-html')(handlebars); //default to require('handlebars') if not provided
const rename = require('gulp-rename');
const templateData = require('./src/data/data');
const concat = require('gulp-concat');

const helpers = {
  _formatDateTime: function( value ) {
    return helpers._formatDateTime( value, 'dd/MM/yyyy h:mm:ss' );
  }
}

handlebars.registerHelper('formatCurrency',function( value ) {
	return value
});
  
handlebars.registerHelper('formatDate',function( value ) {
	return value
});
  

gulp.task('default', function () {    

	const options = {
		
	}

	return gulp.src('src/*.hbs')
        .pipe(gulpHandlebars(templateData, options))
        .pipe(rename({extname: ".html"}))
		.pipe(gulp.dest('build'));
});

 
