const masonryLayout = (containerElem, itemsElems, columns) => {

    // Crea Container para las columnas
    containerElem.className = '';
    containerElem.classList.add('masonry-layout', `columns-${columns}`);
    containerElem.innerHTML = '';
  
    // Crea n-columnas de acuerdo a "columns"
    let columnsElements = [];
    for (let i = 1; i <= columns; i++){
      let column = document.createElement('div');
      column.classList.add('masonry-column', `column-${i}`);
      containerElem.appendChild(column);
      columnsElements.push(column);
    }
  
    // Ubica cada imagen en la columna correspondiente
    for (let m = 0; m < Math.ceil(itemsElems.length / columns); m++){
      for (let n = 0; n < columns; n++){
        if (m * columns + n >= itemsElems.length) {
          continue;
        }
        let item = itemsElems[m * columns + n];
        columnsElements[n].appendChild(item);
        item.classList.add('masonry-item');
      }
    }
}

// Play Videos on hover

// const playOnHover = () => {
//   var playersrc=$('.ytplayer').attr('src');
//   var symbol = $(".ytplayer")[0].src.indexOf("?") > -1 ? "&" : "?";
// $('.ytplayer').mouseover(function(){
//   $(this)[0].src += symbol + "autoplay=1";
// });
// $('.ytplayer').mouseout(function(){
//   $(this).attr('src',playersrc);
// });
// }

// lightbox behavior

function disableScrolling(){
  var x=window.scrollX;
  var y=window.scrollY;
  window.onscroll=function(){window.scrollTo(x, y);};
}
function enableScrolling(){
  window.onscroll=function(){};
}


function imgBuilder(media){
  var lightbox =
          '<div id="lightbox">' +
          '<div id="lightbox-content">' + //insert clicked link's href into img src
            '<img src="' + media + '">' +
          '</div>' +
          '</div>';
          return lightbox;
}

function vidBuilder(media){
  var lightbox = 
          '<div id="lightbox">' +
            '<div id="lightbox-content">' + //insert clicked link's href into img src
              '<iframe src="' + media + '" frameborder="0" allowfullscreen></iframe>' +
            '</div>' +
            '</div>';
            return lightbox;
}
	
$('.lightbox_trigger').click(function(e) {
  
  //prevent default action (hyperlink)
  e.preventDefault();
 
  //Get clicked link href
  var media_href = $(this).attr("href");

  var item = $(this).children();
  var classes = item.attr('class');
  /* 	
  If the lightbox window HTML already exists in document, 
  change the img src to to match the href of whatever link was clicked
  
  If the lightbox window HTML doesn't exists, create it and insert it.
  (This will only happen the first time around)
  */
  
  if ($('#lightbox').length > 0) { // #lightbox exists

    disableScrolling();
    //place href as img src value
    if(classes) {
      classes = classes.split(" ");      
      if(classes[0].startsWith("ytplayer")) {
        $('#lightbox-content').html('<iframe src="' + media_href + '" frameborder="0" allowfullscreen></iframe>');
      }
      else {
        $('#lightbox-content').html('<img src="' + media_href + '">');
      }      
    }
      
    //show lightbox window - you could use .show('fast') for a transition
    $('#lightbox').show();
  }
  else { //#lightbox does not exist - create and insert (runs 1st time only)
    var lightbox
    //create HTML markup for lightbox window
    if(classes) {
      classes = classes.split(" ");
      if(classes[0].startsWith("ytplayer")) {
        lightbox = vidBuilder(media_href);
      }
      else {
        lightbox = imgBuilder(media_href);
      }      
    }
      
    //insert lightbox HTML into page
    $('body').append(lightbox);
  }
  //Click anywhere on the page to get rid of lightbox window
  $('body').on('click', "#lightbox", function() {
    $('#lightbox').hide();
    enableScrolling();
  });
});


function columnNbr(){
    let columnNumber = Math.ceil(document.body.clientWidth / 250);
    masonryLayout(document.getElementById("gallery"), document.querySelectorAll(".gallery-item"), columnNumber);
}

addEventListener("load", columnNbr)
// addEventListener("load", playOnHover)
addEventListener("resize", columnNbr)

