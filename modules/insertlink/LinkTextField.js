/**
 * @class
 * @extends OO.ui.FieldLayout
 * @constructor
 */

const __wikieditor_i18n = require("./jquery.wikiEditor.i18n.js").i18n

function LinkTextField() {
	const input = new OO.ui.TextInputWidget( {
		placeholder: __wikieditor_i18n( 'wikieditor-toolbar-tool-link-int-text-tooltip' )
	} );

	input.connect( this, {
		change: 'onInputChange'
	} );

	const config = {
		align: 'top',
		label: __wikieditor_i18n( 'wikieditor-toolbar-tool-link-int-text' ),
		classes: [ 'mw-wikiEditor-InsertLink-LinkTextField' ]
	};
	LinkTextField.super.call( this, input, config );

	// Whether the user has changed the value
	// (as opposed to the value being changed automatically
	// because the link target field changed).
	this.touched = false;
}

OO.inheritClass( LinkTextField, OO.ui.FieldLayout );

/**
 * Set the input's value.
 *
 * @param {string} val The new value.
 */
LinkTextField.prototype.setValueIfUntouched = function ( val ) {
	if ( !this.touched ) {
		this.getField().setValue( val );
	}
};

/**
 * @param {boolean} touched
 */
LinkTextField.prototype.setTouched = function ( touched ) {
	this.touched = touched;
};

/**
 * If this input is active when it's being changed,
 * set it as 'touched' so it won't change again if the title-lookup is changed.
 */
LinkTextField.prototype.onInputChange = function () {
	if ( $.contains( this.$element[ 0 ], document.activeElement ) ) {
		this.touched = true;
	}
};

module.exports = LinkTextField;
