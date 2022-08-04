// NOTE: Include img_map_coords.js before including this file in HTML.
//       img_map_coords.js defines the IMG_MAP_COORDS dictionary globally.
// NOTE: The "embed" element is currently used by this app. Firefox and Chrome support
//       "embed", however some browsers, such as Safari, may not. Reminder to
//       refactor later and use "object" instead.
UNITED_STATES_IMG_WIDTH = 1526;
UNITED_STATES_IMG_HEIGHT = 1195;

STATES = [ "CALIFORNIA", "ALABAMA", "ALASKA", "ARIZONA", "ARKANSAS", "COLORADO", "CONNECTICUT", "DELAWARE", "FLORIDA", "GEORGIA", "HAWAII", "IDAHO", "ILLINOIS", "INDIANA", "IOWA", "KANSAS", "KENTUCKY", "LOUISIANA", "MAINE", "MARYLAND", "MASSACHUSETTS", "MICHIGAN", "MINNESOTA", "MISSISSIPPI", "MISSOURI", "MONTANA", "NEBRASKA", "NEVADA", "NEW HAMPSHIRE", "NEW JERSEY", "NEW MEXICO", "NEW YORK", "NORTH CAROLINA", "NORTH DAKOTA", "OHIO", "OKLAHOMA", "OREGON", "PENNSYLVANIA", "RHODE ISLAND", "SOUTH CAROLINA", "SOUTH DAKOTA", "TENNESSEE", "TEXAS", "UTAH", "VERMONT", "VIRGINIA", "WASHINGTON", "WEST VIRGINIA", "WISCONSIN", "WYOMING" ];

SITE = "https://en.wikipedia.org/wiki/";

IMG_MAP_HREF = {};
for ( var i = 0; i < STATES.length; i++ ) {
  IMG_MAP_HREF[ STATES[ i ] ] = SITE + capitalizeFirstChar( STATES[ i ] );
}

function capitalizeFirstChar( str ) {
  res = str[ 0 ].toUpperCase();
  for ( var i = 1; i < str.length; i++ ) {
    res += str[ i ].toLowerCase();
  }
  return res;
}
function initImgMapCoords() {
  img = document.querySelector( ".cont-img img" );
  mapQuerySelector = "map";
  widthScaleFactor = getImgMapScaleFactor( UNITED_STATES_IMG_WIDTH, img.width );
  heightScaleFactor = getImgMapScaleFactor( UNITED_STATES_IMG_HEIGHT, img.height );

  // Add map coordinates for each state
  for ( var i = 0; i < STATES.length; i++ ) {
    addImgMapCoords( mapQuerySelector, IMG_MAP_COORDS[ STATES[ i ] ], IMG_MAP_HREF[ STATES[ i ] ], STATES[ i ], widthScaleFactor, heightScaleFactor );
  }
}
function addImgMapCoords( mapQuerySelector, coordsArr, href, state, widthScaleFactor, heightScaleFactor ) {
  var coordsStr = "";

  // Generate coordinate string for image map
  for ( var i = 0; i < coordsArr.length; i++ ) {
    if ( i > 0 ) {
      coordsStr += ", ";
    }
    if ( i % 2 == 0 ) {
      coordsStr += ( coordsArr[ i ] * widthScaleFactor ).toString();
    }
    else {
      coordsStr += ( coordsArr[ i ] * heightScaleFactor ).toString();
    }
  }

  if ( document.querySelector( "#" + state ) == null ) {
    // Create new area element and add to image map
    var area = document.createElement( "AREA" );
    area.shape = "poly";
    area.coords = coordsStr;
    area.onclick = searchInReader( href, state );
    area.id = state;
    document.querySelector( mapQuerySelector ).appendChild( area );
  }
  else {
    // Update area element with new coordinates
    area = document.querySelector( "#" + state );
    area.coords = coordsStr;
  }
}
function getImgMapScaleFactor( originalDim, currDim ) {
  return currDim / originalDim;
}
function searchInReader( href, state ) {
  return function () { 
    updateReaderSrc( href );
    words = state.split(" ");
    for (let i = 0; i < words.length; i++) {
      words[i] = capitalizeFirstChar(words[i]);
    };
    state = words.join(" ");
    showEmbed( "./img/" + state + "State.pdf" );
    hideReaderDescr();
  }
}
function showEmbed( src ) {
  cont_img = document.querySelector( ".cont-img" );
  img = document.querySelector( ".cont-img img" );
  embed = document.querySelector( "embed" );
  btn_select_state = document.querySelector( "#btn-select-state" );

  if ( embed.style.display == "none" ) {
    img.src = "";
    img.style.width = "0";
    img.style.height = "0";
    cont_img.style.height = "97vh";
    embed.style.display = "block";
    embed.src = src;
    btn_select_state.style.display = "block";
  }
  else {
    embed.style.display = "none";
    cont_img.style.height = "70vh";
    img.src = "./img/USA_Labled.png";
    img.style.width = "44vw";
    img.style.height = "70vh";
    btn_select_state.style.display = "none";
  }
}
function updateReaderSrc( href ) {
  document.querySelector( "#reader" ).src = href;
}
function hideReaderDescr() {
  readerDescr = document.querySelector( "#reader-descr" );
  readerDescr.style.display = "none";
}
function showSelectState() {
  reader = document.querySelector( ".cont-reader" );
  showEmbed("");
  if ( reader.style.width == "100vw" ) {
    maximizeReader();
  }
}
function maximizeReader() {
  img = document.querySelector( ".cont-img" );
  reader = document.querySelector( ".cont-reader" );

  if ( img.style.display == "none" ) {
    img.style.display = "flex";
    reader.style.width = "50vw";
    reader.style.margin = "0rem -8rem 0rem 8rem";
    document.querySelector( "#btn-maximize-reader" ).innerHTML = "Maximize Reader";
  }
  else {
    img.style.display = "none";
    reader.style.width = "100vw";
    reader.style.margin = "0rem";
    document.querySelector( "#btn-maximize-reader" ).innerHTML = "Minimize Reader";
  }
}

window.addEventListener( "resize", initImgMapCoords );

initImgMapCoords();
