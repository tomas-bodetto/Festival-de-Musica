const { src, dest, watch, parallel } = require('gulp');

// CSS
const sass = require('gulp-sass')(require('sass'));  
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

// Imagenes
const webp = require('gulp-webp');
const avif = require('gulp-avif');

// Javascript
const terser = require('gulp-terser-js');

function css(done) {
   
    src('src/scss/**/*.scss') // Paso 1: Identificar el archivo de SASS
      .pipe(sourcemaps.init())
      .pipe(plumber())
      .pipe(sass()) // Paso 2: Compilarlo
      .pipe(postcss([ autoprefixer(), cssnano() ]))
      .pipe(sourcemaps.write('.'))
      .pipe(dest('build/css')) // Paso 3: Almacenarla en el disco duro



    done(); // Callback que avisa a gulp cuando llegamos al final
}

function versionWebp(done) {
  
  const opciones = {
    quality: 50
  }

  src('src/img/**/*.{png,jpg}')
      .pipe( webp(opciones) )
      .pipe( dest('build/img'))
  done();    
}

function versionAvif(done) {
  
  const opciones = {
    quality: 50
  }

  src('src/img/**/*.{png,jpg}')
      .pipe( avif(opciones) )
      .pipe( dest('build/img'))
  done();    
}

function javascript( done ) {
  src('src/js/**/*.js')
      .pipe(sourcemaps.init())
      .pipe(terser())
      .pipe(sourcemaps.write('.'))
      .pipe(dest('build/js'));

  done();    
}

function dev(done) {
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javascript);
    done();
}

exports.css = css;
exports.js = javascript;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel( versionWebp, versionAvif, javascript, dev);