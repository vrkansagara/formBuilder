/**
 * Testing number data-type
 *
 * Regex type
 */
/*global jasmine:true, describe:true, xdescribe:true, it:true, xit:true, expect:true, spyOn:true, util:true*/
'use strict';
describe('The number data-type', function(){
	var chars = window.formBuilderTesting.chars;
	var batchTest = window.formBuilderTesting.batchTest;

	var typeName = 'number';
	var type = $.add123.inputField.types[typeName];

	it('is a valid data-type', function(){
		var input = $('<input type="text"/>').wrap('<div/>').inputField();
		var ifw = input.data('add123InputField');
		
		expect(type).toBeDefined();

		ifw.setType(typeName);
		
		expect(util.equals(ifw.getType(), type)).toBe(true);
	});

	it('has filter support', function(){
		var input = $('<input type="text" data-type="'+typeName+'"/>').wrap('<div/>').inputField();
		var ifw = input.data('add123InputField');
		var filter = input.data('add123InputFilter'); 

		var typeNewString = function(str) {
			input.val('');
			for(var i = 0; i < str.length; ++i) {
				filter._type(str[i]);
			}
			return input.val();
		};

		expect(typeNewString(chars.alphas)).toEqual('');
		expect(typeNewString(chars.ALPHAS)).toEqual('');
		expect(typeNewString(chars.digits)).toEqual(chars.digits);
		expect(typeNewString(chars.symbols)).toEqual('-.');
		expect(typeNewString(chars.all)).toEqual('1234567890-.');
	});

	describe('has simple regex validation', function(){
		var input = $('<input type="text" data-type="'+typeName+'"/>').wrap('<div/>').inputField();
		var ifw = input.data('add123InputField');
		var valids, invalids;

		valids = [
			chars.digits,
			'12512351613',
			'-1',
			'3.14',
			'-3.23'
		];

		invalids = [
			chars.alphas,
			chars.ALPHAS,
			'bad',
			'worse',
			'!@#'
		];
		
		var validateNewVal = function(str){
			input.val(str);
			return (typeof(ifw.getType().validate(ifw)) === 'undefined');
		};

		batchTest('that accepts',valids,true,validateNewVal);
		batchTest('that rejects',invalids,false,validateNewVal);
	});
});