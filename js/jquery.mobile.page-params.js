(function( $, window, undefined ) {

		// Given a query string, convert all the name/value pairs
		// into a property/value object. If a name appears more than
		// once in a query string, the value is automatically turned
		// into an array.
		function queryStringToObject( qstr )
		{
			var result = {},
			nvPairs = ( ( qstr || "" ).replace( /^\?/, "" ).split( /&/ ) ),
			i, pair, n, v;

			for ( i = 0; i < nvPairs.length; i++ ) {
				var pstr = nvPairs[ i ];
				if ( pstr ) {
					pair = pstr.split( /=/ );
					n = pair[ 0 ];
					v = pair[ 1 ];
					if ( result[ n ] === undefined ) {
					result[ n ] = v;
					} else {
						if ( typeof result[ n ] !== "object" ) {
							result[ n ] = [ result[ n ] ];
						}
						result[ n ].push( v );
					}
				}
			}

			return result;
		}

		// The idea here is to listen for any pagebeforechange notifications from
		// jQuery Mobile, and then muck with the toPage and options so that query
		// params can be passed to embedded/internal pages. So for example, if a
		// changePage() request for a URL like:
		//
		// http://mycompany.com/myapp/#page-1?foo=1&bar=2
		//
		// is made, the page that will actually get shown is:
		//
		// http://mycompany.com/myapp/#page-1
		//
		// The browser's location will still be updated to show the original URL.
		// The query params for the embedded page are also added as a property/value
		// object on the options object. You can access it from your page notifications
		// via data.options.pageData.
		$( document ).bind( "pagebeforechange", function( e, data ) {

		// We only want to handle the case where we are being asked
		// to go to a page by URL, and only if that URL is referring
		// to an internal page by id.

		if ( typeof data.toPage === "string" ) {
			var u = $.mobile.path.parseUrl( data.toPage );
			if ( $.mobile.path.isEmbeddedPage( u ) ) {

				// The request is for an internal page, if the hash
				// contains query (search) params, strip them off the
				// toPage URL and then set options.dataUrl appropriately
				// so the location.hash shows the originally requested URL
				// that hash the query params in the hash.

				var u2 = $.mobile.path.parseUrl( u.hash.replace( /^#/, "" ) );
				if ( u2.search ) {
					if ( !data.options.dataUrl ) {
						data.options.dataUrl = data.toPage;
					}
					data.options.pageData = queryStringToObject( u2.search );
					data.toPage = u.hrefNoHash + "#" + u2.pathname;
				}
			}
		}
		});

		})( jQuery, window );