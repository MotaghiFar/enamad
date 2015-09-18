(function($) {

	$.fn.enamad = function( options ) {

		var defaults = {
			'blur'			: null,
			'brightness'	: null,
			'contrast'		: null,
			'dropshadow'	: null,
			'grayscale'		: null,
			'huerotate'		: null,
			'invert'		: null,
			'opacity'		: null,
			'saturate'		: null,
			'sepia'			: null,

			'enamadimg'		: 'namad1.png'
		};
		options = $.extend( defaults, options );


		var style_webkit_filter = '';
		var style_spec_filter = '';
		var style_svg_filter = '';


		$("<style></style>")
			.prop( 'type', 'text/css' )
			.prop( 'id' , 'enamad-css' )
			.html("\
				.enamad-wrapper {position: relative;width: 125px;height: 136px;}\
				.enamad-wrapper .enamad-ifreame, .enamad-wrapper .enamad-svg {position: absolute;left: 0;top: 0;}\
				.enamad-wrapper .enamad-svg { pointer-events: none; }\
				.enamad-ifreame {padding: 0;margin: 0;border: 0;width: 125px;height: 136px;display: block;}\
				")
			.appendTo('head');

		return this.each( function() {

			// add Plugin Class to ifreame
			$( this ).attr( 'class', 'enamad-ifreame' );

			if ( is_ie() ) {
				$( this ).attr( 'scrolling', 'no' );
				$( this ).attr( 'frameborder', '0' );
				$( this ).attr( 'allowtransparency', 'true' );
			}


			if ( options.blur ) {
				style_webkit_filter	+= " blur(" + options.blur + ")";
				style_spec_filter	+= " blur(" + options.blur + ")";
				style_svg_filter	+= " <feGaussianBlur stdDeviation=\"" + parseFloat(options.blur) + "\"></feGaussianBlur>";
			}

			if ( options.brightness ) {
				style_webkit_filter	+= " brightness(" + options.brightness + ")";
				style_spec_filter	+= " brightness(" + options.brightness + ")";
				style_svg_filter	+= " <feComponentTransfer><feFuncR type=\"linear\" slope=\"" + parseFloat(options.brightness) +"\"></feFuncR><feFuncG type=\"linear\" slope=\"" + parseFloat(options.brightness) +"\"></feFuncG><feFuncB type=\"linear\" slope=\"" + parseFloat(options.brightness) +"\"></feFuncB></feComponentTransfer>";
			}

			if ( options.contrast ) {
				style_webkit_filter	+= " contrast(" + options.contrast + ")";
				style_spec_filter	+= " contrast(" + options.contrast + ")";
				style_svg_filter	+= " <feComponentTransfer><feFuncR intercept=\"" + -( 0.5 * parseFloat(options.contrast)) + "\" type=\"linear\" slope=\"" + parseFloat(options.contrast) + "\"></feFuncR><feFuncR intercept=\"" + -( 0.5 * parseFloat(options.contrast)) + "\" type=\"linear\" slope=\"" + parseFloat(options.contrast) + "\"></feFuncR><feFuncR intercept=\"" + -( 0.5 * parseFloat(options.contrast)) + "\" type=\"linear\" slope=\"" + parseFloat(options.contrast) + "\"></feFuncR></feComponentTransfer>";
			}


			if ( options.dropshadow ) {
				var _dropshadow = options.dropshadow.split( " " );
				style_webkit_filter	+= " drop-shadow(" + options.dropshadow + ")";
				style_spec_filter	+= " drop-shadow(" + options.dropshadow + ")";
				style_svg_filter	+= " <feGaussianBlur in=\"SourceAlpha\" stdDeviation=\"" + _dropshadow[2] +"\"></feGaussianBlur><feOffset dx=\"" + _dropshadow[0] +"\" dy=\"" + _dropshadow[1] +"\" result=\"offsetblur\"></feOffset><feFlood flood-color=\"" + _dropshadow[3] +"\"></feFlood><feComposite in2=\"offsetblur\" operator=\"in\"></feComposite><feMerge><feMergeNode></feMergeNode><feMergeNode in=\"SourceGraphic\"></feMergeNode></feMerge>";
			}

			if ( options.grayscale ) {
				style_webkit_filter	+= " grayscale(" + options.grayscale + ")";
				style_spec_filter	+= " grayscale(" + options.grayscale + ")";
				style_svg_filter	+= " <feColorMatrix type='saturate' values='0'></feColorMatrix>";
			}


			if ( options.huerotate ) {
				style_webkit_filter	+= " hue-rotate(" + options.huerotate + ")";
				style_spec_filter	+= " hue-rotate(" + options.huerotate + ")";
				style_svg_filter	+= " <feColorMatrix type=\"hueRotate\" values=\"" + parseFloat(options.huerotate) + "\"></feColorMatrix>";
			}

			if ( options.invert ) {
				style_webkit_filter	+= " invert(" + options.invert + ")";
				style_spec_filter	+= " invert(" + options.invert + ")";
				style_svg_filter	+= " <feComponentTransfer><feFuncR type=\"table\" tableValues=\"1 0\"></feFuncR><feFuncG type=\"table\" tableValues=\"1 0\"></feFuncG><feFuncB type=\"table\" tableValues=\"1 0\"></feFuncB></feComponentTransfer>";
			}

			if ( options.opacity ) {
				var _opacity = options.opacity;
				if ( options.opacity.search( "%" ) != -1 ) {
					_opacity = parseFloat(options.opacity) / 100.0;
				}
				style_webkit_filter	+= " opacity(" + options.opacity + ")";
				style_spec_filter	+= " opacity(" + options.opacity + ")";
				style_svg_filter	+= " <feComponentTransfer><feFuncA tableValues=\"0 " + _opacity +"\" type=\"table\"></feFuncA></feComponentTransfer>";
			}


			if ( options.saturate ) {
				var _saturate = options.saturate;
				if ( options.saturate.search( "%" ) != -1 ) {
					_saturate = parseFloat(options.saturate) / 100.0;
				}
				style_webkit_filter	+= " saturate(" + options.saturate + ")";
				style_spec_filter	+= " saturate(" + options.saturate + ")";
				style_svg_filter	+= " <feColorMatrix type=\"saturate\" values=\"" + _saturate +"\"></feColorMatrix>";
			}


			if ( options.sepia ) {
				style_webkit_filter	+= " sepia(" + options.sepia + ")";
				style_spec_filter	+= " sepia(" + options.sepia + ")";
				style_svg_filter	+= " <feColorMatrix type=\"matrix\" values=\"0.393 0.769 0.189 0 0\
                       0.349 0.686 0.168 0 0\
                       0.272 0.534 0.131 0 0\
                       0 0 0 1 0\"></feColorMatrix>";
			}

			$("#enamad-css")
				.append("\
					.enamad-ifreame {\
						filter: url(#enamad-filter);\
						-webkit-filter: " + style_webkit_filter +";\
						filter: " + style_spec_filter +";\
					}\
				");


			if ( !is_supports_css3_filter() && is_supports_svg_filter() ) {
				var enamadElement = $( this );
				var enamadId = enamadElement.attr( 'id' );
				var wrapper = $( '<div></div>' )
					.attr( 'id', enamadId + '-enamad-wrapper' )
					.addClass( 'enamad-wrapper');
				enamadElement.wrapAll(wrapper);
				enamadElement.parent().append("<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"enamad-svg\"><filter id=\"enamad-filter\">" + style_svg_filter + "</filter><g filter=\"url(#enamad-filter)\"><image xlink:href=\"" + options.enamadimg + "\" filter=\"\" width=\"125px\" height=\"136px\"></image></g></svg>");
			}


			function is_supports_svg_filter() {
				return (
					document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Shape", "1.0")
				);
			}

			function is_ie() {
				var UAString = navigator.userAgent;
				return (navigator.appVersion.indexOf("MSIE") !== -1 || UAString.indexOf("Trident") !== -1);
			};

			function is_supports_css3_filter() {
				var el = document.createElement('a');
				el.style.cssText = '-webkit-filter:blur(2px); filter:blur(2px); ';
				return !!el.style.length && ((document.documentMode === undefined || document.documentMode > 9));
			}
		});

	};

}(jQuery));