# auto-require
[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## It's the best way to automatically require your packages

Checkout [changelog](changelog.md) also

## Motivation

I was so tired to write a lot constiable definitions in my build scripts, so I have decided to write a tiny library for including them automatically. So it's basically the library for those purposes, but you can use it everywhere.

## Features

- Requires and caches modules
- Avoid including all packages from `node_modules` instead include packages specified in `packages.json` only
- `globaly` option, so you can avoid using any var (like `$` in examples)

## install

```
npm install auto-require
```

## Get started

There are examples using `gulp`, but you can use this package with anything else.

```js
// get all modules from 'node_modules/' only
const $ = require('auto-require')()

// Do you see any gulp, plumber, pug const definitions here?
$.gulp.task('default', () => {
	$.gulp.src('src/*.plumber')
		.pipe($.plumber())
		.pipe($.pug())
		.pipe($.gulp.dest('dest/'))
})
```

## Options

#### 1. Get modules you only need

```js
const options = {
	only: ['gulp', 'gulp-stylus', 'gulp-plumber']
}

const $ = require('auto-require')(options)

// $.gulp, $.stylus, $.plumber only avaliable
```

#### 2. Get modules you only need from different places

Note that paths are absolute and begins from the root of your project (it's where the `package.json` is)

```js
const options = {
	search: ['src/my-folder/'],
	only: ['customize']
}

const $ = require('auto-require')(options)

// $.customize only avaliable
```

#### 3. Get all modules without any

```js
const options = {
	without: ['kaktuz', 'zepto']
}

const $ = require('auto-require')(options)

// $.kaktuz and $.zepto are not avaiable at all
```

#### 4. If only and without, then without will be ignored

```js
const options = {
	without: ['gulp', 'zepto']
	only: ['gulp', 'zepto']
}

const $ = require('auto-require')(options)

// $.zepto and $.gulp avaliable only
```

#### 5. Globaly

By using it that way you can get all vars as you specified them, but be careful as it's global namespace.

```js
const options = {
	only: ['gulp', 'gulp-notify'],
	globaly: true
}

require('auto-require')(options)

// gulp and notify avaliable globaly (only)

//All global imports are guarded and can't be overriden:
gulp = {}
// Error: gulp is already defined
}
```

#### 6. As

You can rename module before import.

```js
const options = {
	only: ['gulp', 'gulp-notify'],
  as: {gulp: 'g', 'gulp-notify': 'gn'}
}

const $ = require('auto-require')(options)

// You can access gulp and gulp-notify as $.g and $.gn
```


#### 7. toRoot

You can import all functions of module into root object.

```js
const options = {
	only: ['request'],
	toRoot: ['request']
}

const $ = require('auto-require')(options)

// $.get, $.post, $.head (all function from request). But not $.request
```


## What it does?

It takes all modules in your `node_modules` folder by default using data from `package.json` and exports it as one module.

Quick example
- `express` via `$.express` or `express` if `globaly` set to `true` (and in next examples as well)
- `browser-sync` via `$.browserSync`
- `gulp` via `$.gulp`
- `gulp-inline-css` via `$.inlineCss`

## What about jQuery or build tools?

No, you'll not need to write full module name.
The first part of the module name will be cut in this case.
For example we have `gulp-pug` module. How we can access it?
Actually it's pretty straightforward - via `$.pug`.
As you can see the first part of the `gulp-pug` has been cut.

This tool works fine with `gulp`, `grunt`, `broccoli`.

## Other access examples

- `gulp` via `$.gulp`
- `gulp-plumber` via `$.plumber`
- `gulp-inline-css` via `$.inlineCss`
- `grunt` via `$.grunt`
- `grunt-shell` via `$.shell`
- `grunt-conventional-changelog` via `$.conventionalChangelog`
- `broccoli-file-contents-to-json` via `$.fileContentsToJson`
- `express` via `$.express`
- `browser-sync` via `$.browserSync`
- `andyet-express-auth` via `$.andyetExpressAuth`

## Test

```
npm install
npm test
```

## License

Licensed under [MIT](./LICENSE.md).
