
/*global require:true*/
(function( exports ){
	"use strict";

	var path = require( 'path' );
	var fs = require( 'fs' );
	var DirectoryColorfy = require( path.join( '..', '..', 'lib', 'directory-colorfy' ) );

	exports.convertDir = {
		setUp: function( done ) {
			this.dcHuge = new DirectoryColorfy( "test/files/directory-colorfy/large" , path.resolve( path.join( "test", "files", "temp" )),
																		{ colors: {
																				"primary": "green",
																				"secondary": "orange"
																			}
																		});
			done();
		},
		tearDown: function( done ){
			["bear", "cat", "cat-primary", "cat-secondary"].forEach( function( base ){
				if( fs.existsSync( "test/files/temp/" + base + ".svg" ) ){
					fs.unlinkSync( "test/files/temp/" + base + ".svg" );
				}
			});
			done();
		},
		convertHugeDirectory: function( test ){
			this.dcHuge.convert()
			.then(function(){
				test.ok( true , "Test completed" );
				test.done();
			})
			.catch(function(err){
				console.log(err);
				test.done();
			});
		}
	};


}(typeof exports === 'object' && exports || this));

