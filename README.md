# directory-colorfy [![Build Status](https://secure.travis-ci.org/filamentgroup/directory-colorfy.png?branch=master)](http://travis-ci.org/filamentgroup/directory-colorfy)

Color up those SVGs

## Getting Started
Install the module with: `npm install directory-colorfy`

```javascript
var DirectoryColorfy = require('directory-colorfy');
var dc = new DirectoryColorfy( input, output, options );
dc.convert();
```

## Documentation

### Required Params

#### Input
Type: `String`

Input folder of SVGs

#### Output
Type: `String`

Output folder


### Optional Params

#### options.colors
Type: `Object`
Default value: `{}`

A hash of colors to pass in with names.

Example:
```
{ "primary": "#ff0000" }
```

## Examples

If the input directory has this file in it:

```
bear.colors-primary-blue-red.svg
```

And the color hash that is passed through is:

```
{ "primary": "green" }
```

The output folder should end up with:

```
bear-green.svg
bear-blue.svg
bear-red.svg
```

Which will all be completely filled in with their specific color.


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
* 0.1.0 First release

## License
Copyright (c) 2013 Jeffrey Lembeck & Filament Group  
Licensed under the MIT license.
