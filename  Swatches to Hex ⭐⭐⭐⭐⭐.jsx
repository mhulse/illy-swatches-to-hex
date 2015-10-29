/* jshint unused:false */
/* exported main */
/* globals app */

#target illustrator

/**
 * @@@BUILDINFO@@@ swatch-name-to-hex.jsx !Version! Wed Oct 28 2015 20:04:24 GMT-0700
 */

Array.prototype.indexOf = Array.prototype.indexOf || function(value, start) {
	var i;
	var l;
	for (i = 0, l = this.length; i < l; i++) {
		if (this[i] == value) {
			return i;
		}
	}
	return -1;
};

// https://forums.adobe.com/community/illustrator/illustrator_scripting
var main = (function() {
	
	'use strict';
	
	var doc;
	var swatches;
	var i;
	var l;
	var name;
	var skip = ['[None]', '[Registration]'];
	var color;
	var kind;
	var names = [];
	var updated;
	var rgb2hex = function(red, green, blue) {
		var i;
		var rgb = [red.toString(16), green.toString(16), blue.toString(16)];
		for (i = 0; i < 3; i++) {
			if (rgb[i].length == 1) {
				rgb[i] = (rgb[i] + rgb[i]);
			}
		}
		if ((rgb[0][0] == rgb[0][1]) && (rgb[1][0] == rgb[1][1]) && (rgb[2][0] == rgb[2][1])) {
			return '#' + rgb[0][0] + rgb[1][0] + rgb[2][0];
		}
		return '#' + rgb[0] + rgb[1] + rgb[2];
	};
	var counted;
	var count = function(a, i) {
		var result = 0;
		var o;
		for (o in a) {
			if (a[o] == i) {
				result++;
			}
		}
		return result;
	};
	
	if (app.documents.length) {
		
		doc = app.activeDocument;
		swatches = doc.swatches;
		
		for (i = 0, l = swatches.length; i < l; i++) {
			
			name = swatches[i].name;
			
			if (skip.indexOf(name) === -1) {
				
				color = swatches[i].color;
				
				// Note that `switch` statement is not supported.
				if (color == '[SpotColor]') {
					
					kind = color.spot.color;
					
				} else if (color == '[RGBColor]') {
					
					kind = color;
					
				}
				
				if (kind) {
					
					updated = rgb2hex(kind.red, kind.green, kind.blue);
					
					names.push(updated);
					
					// Illustrator will not allow swatches of the same name, so we have to add an iterator:
					counted = count(names, updated);
					
					updated += ((counted > 1) ? ' ' + counted : '');
					
					doc.swatches[i].name = updated;
					
				 }
				
			}
			
		}
	
	}
	
})();
