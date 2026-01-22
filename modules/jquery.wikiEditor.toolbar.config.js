/**
 * Configuration of Toolbar module for wikiEditor
 *
 * @private
 */

function noErrGetter() {
	return new Proxy({}, {get: noErrGetter, set: () => {}})
}

const configData = require( './data.json' ),
	fileNamespace = "File",
	specialCharacterGroups = noErrGetter.call();

/**
 * Replace link targets from example messages with hash
 * after a message has been parsed.
 *
 * @private
 * @param {jQuery} $message an __wikieditor_i18n().parseDom() object
 * @return {string} HTML string
 */
function delink( $message ) {
	// dummy div to append the message to
	const $div = $( '<div>' );

	$div.append( $message );
	$div.find( 'a' ).attr( 'href', '#' );

	return $div.html();
}

const toolbarConfig = {
	toolbar: {
		// Main section
		main: {
			type: 'toolbar',
			groups: {
				format: {
					tools: {
						bold: {
							label: __wikieditor_i18n( 'wikieditor-toolbar-tool-bold' ),
							type: 'button',
							oouiIcon: 'bold',
							action: {
								type: 'encapsulate',
								options: {
									pre: "'''",
									peri: __wikieditor_i18n( 'wikieditor-toolbar-tool-bold-example' ),
									post: "'''"
								}
							},
							hotkey: 'b'
						},
						italic: {
							section: 'main',
							group: 'format',
							id: 'italic',
							label: __wikieditor_i18n( 'wikieditor-toolbar-tool-italic' ),
							type: 'button',
							oouiIcon: 'italic',
							action: {
								type: 'encapsulate',
								options: {
									pre: "''",
									peri: __wikieditor_i18n( 'wikieditor-toolbar-tool-italic-example' ),
									post: "''"
								}
							},
							hotkey: 'i'
						}
					}
				},
				insert: {
					tools: {
						signature: {
							label: __wikieditor_i18n( 'wikieditor-toolbar-tool-signature' ),
							type: 'button',
							oouiIcon: 'signature',
							action: {
								type: 'encapsulate',
								options: {
									pre: configData.signature
								}
							}
						}
					}
				}
			}
		},
		// Secondary section of the top toolbar (at right side when LTR).
		secondary: {
			type: 'toolbar',
			groups: {
				default: {
					tools: {}
				}
			}
		},
		// Format section
		advanced: {
			label: __wikieditor_i18n( 'wikieditor-toolbar-section-advanced' ),
			type: 'toolbar',
			groups: {
				heading: {
					tools: {
						heading: {
							label: __wikieditor_i18n( 'wikieditor-toolbar-tool-heading' ),
							type: 'select',
							list: {
								'heading-2': {
									label: __wikieditor_i18n( 'wikieditor-toolbar-tool-heading-2' ),
									action: {
										type: 'encapsulate',
										options: {
											pre: '== ',
											peri: __wikieditor_i18n( 'wikieditor-toolbar-tool-heading-example' ),
											post: ' ==',
											regex: /^(\s*)(={1,6})(.*?)\2(\s*)$/,
											regexReplace: '$1==$3==$4',
											ownline: true
										}
									}
								},
								'heading-3': {
									label: __wikieditor_i18n( 'wikieditor-toolbar-tool-heading-3' ),
									action: {
										type: 'encapsulate',
										options: {
											pre: '=== ',
											peri: __wikieditor_i18n( 'wikieditor-toolbar-tool-heading-example' ),
											post: ' ===',
											regex: /^(\s*)(={1,6})(.*?)\2(\s*)$/,
											regexReplace: '$1===$3===$4',
											ownline: true
										}
									}
								},
								'heading-4': {
									label: __wikieditor_i18n( 'wikieditor-toolbar-tool-heading-4' ),
									action: {
										type: 'encapsulate',
										options: {
											pre: '==== ',
											peri: __wikieditor_i18n( 'wikieditor-toolbar-tool-heading-example' ),
											post: ' ====',
											regex: /^(\s*)(={1,6})(.*?)\2(\s*)$/,
											regexReplace: '$1====$3====$4',
											ownline: true
										}
									}
								},
								'heading-5': {
									label: __wikieditor_i18n( 'wikieditor-toolbar-tool-heading-5' ),
									action: {
										type: 'encapsulate',
										options: {
											pre: '===== ',
											peri: __wikieditor_i18n( 'wikieditor-toolbar-tool-heading-example' ),
											post: ' =====',
											regex: /^(\s*)(={1,6})(.*?)\2(\s*)$/,
											regexReplace: '$1=====$3=====$4',
											ownline: true
										}
									}
								}
							}
						}
					}
				},
				format: {
					label: __wikieditor_i18n( 'wikieditor-toolbar-group-format' ),
					tools: {
						ulist: {
							label: __wikieditor_i18n( 'wikieditor-toolbar-tool-ulist' ),
							type: 'button',
							oouiIcon: 'listBullet',
							action: {
								type: 'encapsulate',
								options: {
									pre: '* ',
									peri: __wikieditor_i18n( 'wikieditor-toolbar-tool-ulist-example' ),
									post: '',
									regex: /^([*#:;]*)\s*(.*)$/gm,
									regexReplace: '$1* $2',
									ownline: true,
									splitlines: true
								}
							}
						},
						olist: {
							label: __wikieditor_i18n( 'wikieditor-toolbar-tool-olist' ),
							type: 'button',
							oouiIcon: 'listNumbered',
							action: {
								type: 'encapsulate',
								options: {
									pre: '# ',
									peri: __wikieditor_i18n( 'wikieditor-toolbar-tool-olist-example' ),
									post: '',
									regex: /^([*#:;]*)\s*(.*)$/gm,
									regexReplace: '$1# $2',
									ownline: true,
									splitlines: true
								}
							}
						},
						code: {
							label: __wikieditor_i18n( 'wikieditor-toolbar-tool-code' ),
							type: 'button',
							oouiIcon: 'code',
							action: {
								type: 'encapsulate',
								options: {
									pre: '<code>',
									peri: __wikieditor_i18n( 'wikieditor-toolbar-tool-code-example' ),
									post: '</code>'
								}
							}
						},
						nowiki: {
							label: __wikieditor_i18n( 'wikieditor-toolbar-tool-nowiki' ),
							type: 'button',
							oouiIcon: 'noWikiText',
							action: {
								type: 'encapsulate',
								options: {
									pre: '<nowiki>',
									peri: __wikieditor_i18n( 'wikieditor-toolbar-tool-nowiki-example' ),
									post: '</nowiki>'
								}
							},
							hotkey: '\\'
						},
						newline: {
							label: __wikieditor_i18n( 'wikieditor-toolbar-tool-newline' ),
							type: 'button',
							oouiIcon: 'newline',
							action: {
								type: 'encapsulate',
								options: {
									pre: '<br>\n'
								}
							}
						}
					}
				},
				size: {
					tools: {
						big: {
							label: __wikieditor_i18n( 'wikieditor-toolbar-tool-big' ),
							type: 'button',
							oouiIcon: 'bigger',
							action: {
								type: 'encapsulate',
								options: {
									pre: '<big>',
									peri: __wikieditor_i18n( 'wikieditor-toolbar-tool-big-example' ),
									post: '</big>'
								}
							}
						},
						small: {
							label: __wikieditor_i18n( 'wikieditor-toolbar-tool-small' ),
							type: 'button',
							oouiIcon: 'smaller',
							action: {
								type: 'encapsulate',
								options: {
									pre: '<small>',
									peri: __wikieditor_i18n( 'wikieditor-toolbar-tool-small-example' ),
									post: '</small>'
								}
							}
						},
						superscript: {
							label: __wikieditor_i18n( 'wikieditor-toolbar-tool-superscript' ),
							type: 'button',
							oouiIcon: 'superscript',
							action: {
								type: 'encapsulate',
								options: {
									pre: '<sup>',
									peri: __wikieditor_i18n( 'wikieditor-toolbar-tool-superscript-example' ),
									post: '</sup>'
								}
							},
							hotkey: '.'
						},
						subscript: {
							label: __wikieditor_i18n( 'wikieditor-toolbar-tool-subscript' ),
							type: 'button',
							oouiIcon: 'subscript',
							action: {
								type: 'encapsulate',
								options: {
									pre: '<sub>',
									peri: __wikieditor_i18n( 'wikieditor-toolbar-tool-subscript-example' ),
									post: '</sub>'
								}
							},
							hotkey: ','
						}
					}
				},
				insert: {
					label: __wikieditor_i18n( 'wikieditor-toolbar-group-insert' ),
					tools: {
						gallery: {
							label: __wikieditor_i18n( 'wikieditor-toolbar-tool-gallery' ),
							type: 'button',
							oouiIcon: 'imageGallery',
							action: {
								type: 'encapsulate',
								options: {
									pre: '<gallery>\n',
									peri: __wikieditor_i18n( 'wikieditor-toolbar-tool-gallery-example', fileNamespace ),
									post: '\n</gallery>',
									ownline: true
								}
							}
						},
						redirect: {
							label: __wikieditor_i18n( 'wikieditor-toolbar-tool-redirect' ),
							type: 'button',
							oouiIcon: 'articleRedirect',
							action: {
								type: 'encapsulate',
								options: {
									pre: configData.magicWords.redirect[ 0 ] + ' [[',
									peri: __wikieditor_i18n( 'wikieditor-toolbar-tool-redirect-example' ),
									post: ']]',
									ownline: true
								}
							}
						}
					}
				}
			}
		},
		characters: {
			label: __wikieditor_i18n( 'wikieditor-toolbar-section-characters' ),
			type: 'booklet',
			deferLoad: true,
			pages: {
				recent: {
					label: __wikieditor_i18n( 'special-characters-recently-used' ),
					layout: 'characters',
					characters: []
				},
				latin: {
					label: __wikieditor_i18n( 'special-characters-group-latin' ),
					layout: 'characters',
					characters: specialCharacterGroups.latin
				},
				latinextended: {
					label: __wikieditor_i18n( 'special-characters-group-latinextended' ),
					layout: 'characters',
					characters: specialCharacterGroups.latinextended
				},
				ipa: {
					label: __wikieditor_i18n( 'special-characters-group-ipa' ),
					layout: 'characters',
					characters: specialCharacterGroups.ipa
				},
				symbols: {
					label: __wikieditor_i18n( 'special-characters-group-symbols' ),
					layout: 'characters',
					characters: specialCharacterGroups.symbols
				},
				greek: {
					label: __wikieditor_i18n( 'special-characters-group-greek' ),
					layout: 'characters',
					language: 'el',
					characters: specialCharacterGroups.greek
				},
				greekextended: {
					label: __wikieditor_i18n( 'special-characters-group-greekextended' ),
					layout: 'characters',
					characters: specialCharacterGroups.greekextended
				},
				cyrillic: {
					label: __wikieditor_i18n( 'special-characters-group-cyrillic' ),
					layout: 'characters',
					characters: specialCharacterGroups.cyrillic
				},
				// The core 28-letter alphabet, special letters for the Arabic language,
				// vowels, punctuation, digits.
				// Names of letters are written as in the Unicode charts.
				arabic: {
					label: __wikieditor_i18n( 'special-characters-group-arabic' ),
					layout: 'characters',
					language: 'ar',
					direction: 'rtl',
					characters: specialCharacterGroups.arabic
				},
				// Characters for languages other than Arabic.
				arabicextended: {
					label: __wikieditor_i18n( 'special-characters-group-arabicextended' ),
					layout: 'characters',
					language: 'ar',
					direction: 'rtl',
					characters: specialCharacterGroups.arabicextended
				},
				hebrew: {
					label: __wikieditor_i18n( 'special-characters-group-hebrew' ),
					layout: 'characters',
					direction: 'rtl',
					characters: specialCharacterGroups.hebrew
				},
				bangla: {
					label: __wikieditor_i18n( 'special-characters-group-bangla' ),
					language: 'bn',
					layout: 'characters',
					characters: specialCharacterGroups.bangla
				},
				tamil: {
					label: __wikieditor_i18n( 'special-characters-group-tamil' ),
					language: 'ta',
					layout: 'characters',
					characters: specialCharacterGroups.tamil
				},
				telugu: {
					label: __wikieditor_i18n( 'special-characters-group-telugu' ),
					language: 'te',
					layout: 'characters',
					characters: specialCharacterGroups.telugu
				},
				sinhala: {
					label: __wikieditor_i18n( 'special-characters-group-sinhala' ),
					language: 'si',
					layout: 'characters',
					characters: specialCharacterGroups.sinhala
				},
				devanagari: {
					label: __wikieditor_i18n( 'special-characters-group-devanagari' ),
					layout: 'characters',
					characters: specialCharacterGroups.devanagari
				},
				gujarati: {
					label: __wikieditor_i18n( 'special-characters-group-gujarati' ),
					language: 'gu',
					layout: 'characters',
					characters: specialCharacterGroups.gujarati
				},
				thai: {
					label: __wikieditor_i18n( 'special-characters-group-thai' ),
					language: 'th',
					layout: 'characters',
					characters: specialCharacterGroups.thai
				},
				lao: {
					label: __wikieditor_i18n( 'special-characters-group-lao' ),
					language: 'lo',
					layout: 'characters',
					characters: specialCharacterGroups.lao
				},
				khmer: {
					label: __wikieditor_i18n( 'special-characters-group-khmer' ),
					language: 'km',
					layout: 'characters',
					characters: specialCharacterGroups.khmer
				},
				canadianaboriginal: {
					label: __wikieditor_i18n( 'special-characters-group-canadianaboriginal' ),
					language: 'cr',
					layout: 'characters',
					characters: specialCharacterGroups.canadianaboriginal
				},
				runes: {
					label: __wikieditor_i18n( 'special-characters-group-runes' ),
					layout: 'characters',
					characters: specialCharacterGroups.runes
				}
			}
		},
		help: {
			label: __wikieditor_i18n( 'wikieditor-toolbar-section-help' ),
			type: 'booklet',
			deferLoad: true,
			pages: {
				format: {
					label: __wikieditor_i18n( 'wikieditor-toolbar-help-page-format' ),
					layout: 'table',
					headings: [
						{ msg: 'wikieditor-toolbar-help-heading-description' },
						{ msg: 'wikieditor-toolbar-help-heading-syntax' },
						{ msg: 'wikieditor-toolbar-help-heading-result' }
					],
					rows: [
						{
							description: {
								html: __wikieditor_i18n( 'wikieditor-toolbar-help-content-italic-description' ).parse()
							},
							syntax: {
								html: "''" + __wikieditor_i18n( 'wikieditor-toolbar-help-content-italic-example' ).escaped() + "''"
							},
							result: {
								html: '<em>' + __wikieditor_i18n( 'wikieditor-toolbar-help-content-italic-example' ).parse() + '</em>'
							}
						},
						{
							description: {
								html: __wikieditor_i18n( 'wikieditor-toolbar-help-content-bold-description' ).parse()
							},
							syntax: {
								html: "'''" + __wikieditor_i18n( 'wikieditor-toolbar-help-content-bold-example' ).escaped() + "'''"
							},
							result: {
								html: '<strong>' + __wikieditor_i18n( 'wikieditor-toolbar-help-content-bold-example' ).parse() + '</strong>'
							}
						},
						{
							description: {
								html: __wikieditor_i18n( 'wikieditor-toolbar-help-content-bolditalic-description' ).parse()
							},
							syntax: {
								html: "'''''" + __wikieditor_i18n( 'wikieditor-toolbar-help-content-bolditalic-example' ).escaped() + "'''''"
							},
							result: {
								html: '<strong><em>' + __wikieditor_i18n( 'wikieditor-toolbar-help-content-bolditalic-example' ).parse() + '</em></strong>'
							}
						}
					]
				},
				link: {
					label: __wikieditor_i18n( 'wikieditor-toolbar-help-page-link' ),
					layout: 'table',
					headings: [
						{ msg: 'wikieditor-toolbar-help-heading-description' },
						{ msg: 'wikieditor-toolbar-help-heading-syntax' },
						{ msg: 'wikieditor-toolbar-help-heading-result' }
					],
					rows: [
						{
							description: {
								html: __wikieditor_i18n( 'wikieditor-toolbar-help-content-ilink-description' ).parse()
							},
							syntax: {
								html: __wikieditor_i18n( 'wikieditor-toolbar-help-content-ilink-example' ).escaped()
							},
							result: {
								html: '<span class="pre-wrap">' + delink( __wikieditor_i18n( 'wikieditor-toolbar-help-content-ilink-example' ).parseDom() ) + '</span>'
							}
						},
						{
							description: {
								html: __wikieditor_i18n( 'wikieditor-toolbar-help-content-xlink-description' ).parse()
							},
							syntax: {
								html: __wikieditor_i18n(
									'wikieditor-toolbar-help-content-xlink-example1',
									__wikieditor_i18n( 'wikieditor-toolbar-help-content-xlink-example-url' ),
									__wikieditor_i18n( 'wikieditor-toolbar-help-content-xlink-example-label' )
								).escaped()
							},
							result: {
								html: '<span class="mw-parser-output pre-wrap">' +
									delink( __wikieditor_i18n(
										'wikieditor-toolbar-help-content-xlink-example2',
										__wikieditor_i18n( 'wikieditor-toolbar-help-content-xlink-example-url' ),
										__wikieditor_i18n( 'wikieditor-toolbar-help-content-xlink-example-label' ),
										1
									).parseDom() ) +
									'</span>'
							}
						}
					]
				},
				heading: {
					label: __wikieditor_i18n( 'wikieditor-toolbar-help-page-heading' ),
					layout: 'table',
					headings: [
						{ msg: 'wikieditor-toolbar-help-heading-description' },
						{ msg: 'wikieditor-toolbar-help-heading-syntax' },
						{ msg: 'wikieditor-toolbar-help-heading-result' }
					],
					rows: [
						{
							description: {
								html: __wikieditor_i18n( 'wikieditor-toolbar-help-content-heading2-description' ).parse()
							},
							syntax: {
								html: '== ' + __wikieditor_i18n( 'wikieditor-toolbar-help-content-heading2-example' ).escaped() + ' =='
							},
							result: {
								html: '<h2>' + __wikieditor_i18n( 'wikieditor-toolbar-help-content-heading2-example' ).parse() + '</h2>'
							}
						},
						{
							description: {
								html: __wikieditor_i18n( 'wikieditor-toolbar-help-content-heading3-description' ).parse()
							},
							syntax: {
								html: '=== ' + __wikieditor_i18n( 'wikieditor-toolbar-help-content-heading3-example' ).escaped() + ' ==='
							},
							result: {
								html: '<h3>' + __wikieditor_i18n( 'wikieditor-toolbar-help-content-heading3-example' ).parse() + '</h3>'
							}
						},
						{
							description: {
								html: __wikieditor_i18n( 'wikieditor-toolbar-help-content-heading4-description' ).parse()
							},
							syntax: {
								html: '==== ' + __wikieditor_i18n( 'wikieditor-toolbar-help-content-heading4-example' ).escaped() + ' ===='
							},
							result: {
								html: '<h4>' + __wikieditor_i18n( 'wikieditor-toolbar-help-content-heading4-example' ).parse() + '</h4>'
							}
						},
						{
							description: {
								html: __wikieditor_i18n( 'wikieditor-toolbar-help-content-heading5-description' ).parse()
							},
							syntax: {
								html: '===== ' + __wikieditor_i18n( 'wikieditor-toolbar-help-content-heading5-example' ).escaped() + ' ====='
							},
							result: {
								html: '<h5>' + __wikieditor_i18n( 'wikieditor-toolbar-help-content-heading5-example' ).parse() + '</h5>'
							}
						}
					]
				},
				list: {
					label: __wikieditor_i18n( 'wikieditor-toolbar-help-page-list' ),
					layout: 'table',
					headings: [
						{ msg: 'wikieditor-toolbar-help-heading-description' },
						{ msg: 'wikieditor-toolbar-help-heading-syntax' },
						{ msg: 'wikieditor-toolbar-help-heading-result' }
					],
					rows: [
						{
							description: {
								html: __wikieditor_i18n( 'wikieditor-toolbar-help-content-ulist-description' ).parse()
							},
							syntax: {
								html: '* ' + __wikieditor_i18n( 'wikieditor-toolbar-help-content-ulist-example' ).escaped() + '<br />' +
									'* ' + __wikieditor_i18n( 'wikieditor-toolbar-help-content-ulist-example' ).escaped()
							},
							result: {
								html: '<ul>' +
									'<li>' + __wikieditor_i18n( 'wikieditor-toolbar-help-content-ulist-example' ).parse() + '</li>' +
									'<li>' + __wikieditor_i18n( 'wikieditor-toolbar-help-content-ulist-example' ).parse() + '</li>' +
									'</ul>'
							}
						},
						{
							description: {
								html: __wikieditor_i18n( 'wikieditor-toolbar-help-content-olist-description' ).parse()
							},
							syntax: {
								html: '# ' + __wikieditor_i18n( 'wikieditor-toolbar-help-content-olist-example' ).escaped() + '<br />' +
									'# ' + __wikieditor_i18n( 'wikieditor-toolbar-help-content-olist-example' ).escaped()
							},
							result: {
								html: '<ol>' +
									'<li>' + __wikieditor_i18n( 'wikieditor-toolbar-help-content-olist-example' ).parse() + '</li>' +
									'<li>' + __wikieditor_i18n( 'wikieditor-toolbar-help-content-olist-example' ).parse() + '</li>' +
									'</ol>'
							}
						}
					]
				},
				file: {
					label: __wikieditor_i18n( 'wikieditor-toolbar-help-page-file' ),
					layout: 'table',
					headings: [
						{ msg: 'wikieditor-toolbar-help-heading-description' },
						{ msg: 'wikieditor-toolbar-help-heading-syntax' },
						{ msg: 'wikieditor-toolbar-help-heading-result' }
					],
					rows: [
						{
							description: {
								html: __wikieditor_i18n( 'wikieditor-toolbar-help-content-file-description' ).parse()
							},
							syntax: {
								html: __wikieditor_i18n(
									'wikieditor-toolbar-help-content-file-syntax',
									fileNamespace,
									configData.magicWords.img_thumbnail[ 0 ],
									__wikieditor_i18n( 'wikieditor-toolbar-help-content-file-caption' )
								).escaped()
							},
							result: {
								html: '<div class="thumbinner" style="width: 102px;">' +
									'<a class="image">' +
									'<img alt="" src="' + $.wikiEditor.imgPath + 'toolbar/example-image.png" width="100" height="50" class="thumbimage"/>' +
									'</a>' +
									'<div class="thumbcaption"><div class="magnify">' +
									'<a title="' + __wikieditor_i18n( 'thumbnail-more' ).escaped() + '" class="internal"></a>' +
									'</div>' + __wikieditor_i18n( 'wikieditor-toolbar-help-content-file-caption' ).escaped() + '</div>' +
									'</div>'
							}
						}
					]
				},
				discussion: {
					label: __wikieditor_i18n( 'wikieditor-toolbar-help-page-discussion' ),
					layout: 'table',
					headings: [
						{ msg: 'wikieditor-toolbar-help-heading-description' },
						{ msg: 'wikieditor-toolbar-help-heading-syntax' },
						{ msg: 'wikieditor-toolbar-help-heading-result' }
					],
					rows: [
						{
							description: {
								html: __wikieditor_i18n( 'wikieditor-toolbar-help-content-signaturetimestamp-description' ).parse()
							},
							syntax: {
								html: __wikieditor_i18n( 'wikieditor-toolbar-help-content-signaturetimestamp-syntax' ).escaped()
							},
							result: {
								html: delink( __wikieditor_i18n(
									'wikieditor-toolbar-help-content-signaturetimestamp-example',
									'用户',
									'用户讨论',
									"用户名" || __wikieditor_i18n( 'wikieditor-toolbar-help-content-signature-username' )
								).parseDom() )
							}
						},
						{
							description: {
								html: __wikieditor_i18n( 'wikieditor-toolbar-help-content-signature-description' ).parse()
							},
							syntax: {
								html: __wikieditor_i18n( 'wikieditor-toolbar-help-content-signature-syntax' ).escaped()
							},
							result: {
								html: delink( __wikieditor_i18n(
									'wikieditor-toolbar-help-content-signature-example',
									'用户',
									'用户讨论',
									'用户名' || __wikieditor_i18n( 'wikieditor-toolbar-help-content-signature-username' )
								).parseDom() )
							}
						},
						{
							description: {
								html: __wikieditor_i18n( 'wikieditor-toolbar-help-content-indent-description' ).parse()
							},
							syntax: {
								html: __wikieditor_i18n( 'wikieditor-toolbar-help-content-indent1' ).escaped() +
									'<br />:' +
									__wikieditor_i18n( 'wikieditor-toolbar-help-content-indent2' ).escaped() +
									'<br />::' +
									__wikieditor_i18n( 'wikieditor-toolbar-help-content-indent3' ).escaped()
							},
							result: {
								html: __wikieditor_i18n( 'wikieditor-toolbar-help-content-indent1' ).parse() +
									'<dl><dd>' +
									__wikieditor_i18n( 'wikieditor-toolbar-help-content-indent2' ).parse() +
									'<dl><dd>' +
									__wikieditor_i18n( 'wikieditor-toolbar-help-content-indent3' ).parse() +
									'</dd></dl></dd></dl>'
							}
						}
					]
				}
			}
		}
	}
};


module.exports = toolbarConfig;
