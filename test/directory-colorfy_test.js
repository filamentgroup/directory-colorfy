
/*global require:true*/
(function( exports ){
	"use strict";

	var path = require( 'path' );
	var fs = require( 'fs' );
	var DirectoryColorfy = require( path.join( '..', 'lib', 'directory-colorfy' ) );


	exports.constructor = {
		setUp: function( done ) {
			this.dc = new DirectoryColorfy( "test/files" , "test/files" );
			this.dc2 = new DirectoryColorfy( "test/files", "test/files/temp",
																			{ colors: {
																					"blue": "blue"
																				}
																			});
			this.dc3 = new DirectoryColorfy( ["test/files/bear.colors-blue-red.svg"] , "test/files" );
			done();
		},
		tearDown: function( done ){
			done();
		},
		emptyConstructor: function( test ){
			test.equal( Object.keys( this.dc.options ).length, 0 , "Empty options hash on constructor" );
			test.done();
		},
		constructor: function( test ){
			test.equal( this.dc.files.length , 4, "Amount of files correct" );
			test.equal( this.dc2.input, "test/files", "Input filled in on constuctor" );
			test.equal( this.dc2.output, "test/files/temp", "Output filled in on constuctor" );
			test.equal( Object.keys( this.dc2.options.colors ).length, 1, "Colors filled" );
			test.equal( Object.keys(this.dc2.options.colors)[0], "blue", "Colors filled" );
			test.equal( this.dc3.files.length , 1, "Amount of files correct" );
			test.done();
		}
	};
	exports.convert = {
		setUp: function( done ) {
			this.dc = new DirectoryColorfy( path.resolve( path.join( "test", "files", "directory-colorfy" )), path.resolve( path.join( "test", "files", "temp" )),
																		{ colors: {
																				"green": "green",
																				"orange": "orange"
																			}
																		});
			this.dc2 = new DirectoryColorfy( ["test/files/directory-colorfy/cat.svg"] , path.resolve( path.join( "test", "files", "temp" )),
																		{ colors: {
																				"green": "green",
																				"orange": "orange"
																			}
																		});
			done();
		},
		tearDown: function( done ){
			["bear", "bear-green", "bear-orange", "cat", "cat-green", "cat-orange"].forEach( function( base ){
				if( fs.existsSync( "test/files/temp/" + base + ".svg" ) ){
					fs.unlinkSync( "test/files/temp/" + base + ".svg" );
				}
			});
			done();
		},
		convert: function( test ){
			this.dc.convert();
			this.dc2.convert();
			test.ok( fs.existsSync( "test/files/temp/bear-green.svg" ) , "Green bear is there" );
			test.ok( fs.existsSync( "test/files/temp/bear-orange.svg" ) , "Orange bear is there" );
			test.ok( fs.existsSync( "test/files/temp/cat-green.svg" ) , "Green cat is there" );
			test.ok( fs.existsSync( "test/files/temp/cat-orange.svg" ) , "Orange cat is there" );
			test.done();
		}
	};

}(typeof exports === 'object' && exports || this));

