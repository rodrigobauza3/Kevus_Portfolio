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

const playOnHover = () => {
    var video
    var playersrc
    
      $('.lightbox_trigger').mouseover(function(){
          if ($(this).children()[0].tagName.toLowerCase() == "iframe"){
            video = $(this).children();
            playersrc = video[0].src;
            $(this).children()[0].src += "&autoplay=1&mute=1&controls=0";
          }
          else if ($(this).children()[0].tagName.toLowerCase() == "video"){
            $(this).children()[0].play();
          }
        });    
      $('.lightbox_trigger').mouseout(function(){
        if ($(this).children()[0].tagName.toLowerCase() == "iframe"){
          $(this).children()[0].src = playersrc;
          video = '';
        }
        else if ($(this).children()[0].tagName.toLowerCase() == "video"){
          $(this).children()[0].pause();
          $(this).children()[0].currentTime = 0;
        }  
      });
  }

// lightbox behavior

function disableScrolling(){
  var x=window.scrollX;
  var y=window.scrollY;
  window.onscroll=function(){window.scrollTo(x, y);};
}
function enableScrolling(){
  window.onscroll=function(){};
}

$("img").on("contextmenu",function(){
  return false;
});

function imgBuilder(src, title){
  var lightbox =
          '<div id="lightbox">' +
            '<div id="lightbox-content">' + //insert clicked link's href into img src
              '<div id="lightbox-overlay">' + 
                '<img src="' + src + '">' +
                '<p>' + title + '</p>' +
              '</div>' +
            '</div>' +
          '</div>';
          return lightbox;
}

function vidBuilder(media){
  var lightbox = 
          '<div id="lightbox">' +
            '<div id="lightbox-content">' + //insert clicked link's href into img src
              '<iframe src="' + media + '&autoplay=1&modestbranding=1&autohide=1" frameborder="0" allow="autoplay" allowfullscreen></iframe>' +
            '</div>' +
          '</div>';
          return lightbox;
}
function vidLocalBuilder(media){
  var lightbox = 
          '<div id="lightbox">' +
            '<div id="lightbox-content">' + //insert clicked link's href into img src
              '<video controls autoplay loop> <source src="' + media + '"></video>' +
            '</div>' +
          '</div>';
          return lightbox;
}
	
$('.lightbox_trigger').click(function(e) {
  
  //prevent default action (hyperlink)
  e.preventDefault();
 
  //Get clicked link href
  var media_href = $(this).attr("href");
  var media_name = media_href.split("/").pop().split(".")[0]
  var item = $(this).children();
  /* 	
  If the lightbox window HTML already exists in document, 
  change the img src to to match the href of whatever link was clicked
  
  If the lightbox window HTML doesn't exists, create it and insert it.
  (This will only happen the first time around)
  */
  
  if ($('#lightbox').length > 0) { // #lightbox exists

    
    //place href as img src value  
    if(item[0].tagName.toLowerCase() == "iframe") {
      $('#lightbox-content').html('<iframe src="' + media_href + '&autoplay=1&modestbranding=1&autohide=1" frameborder="0" allow="autoplay" allowfullscreen></iframe>');
    }
    else if(item[0].tagName.toLowerCase() == "video") {
        $('#lightbox-content').html('<video controls autoplay loop> <source src="' + media_href + '"></video>');
      }
    else {
      $('#lightbox-content').html('<div id="lightbox-overlay"> <img src="' + media_href + '"> <p>' + media_name + '</p></div>');
    }
      
    //show lightbox window - you could use .show('fast') for a transition
    disableScrolling();
    $('#lightbox').show('fast');
  }
  else { //#lightbox does not exist - create and insert (runs 1st time only)
    var lightbox
    //create HTML markup for lightbox window
    
    if(item[0].tagName.toLowerCase() == "iframe") {
      lightbox = vidBuilder(media_href);
    }
    else if (item[0].tagName.toLowerCase() == "video"){
      lightbox = vidLocalBuilder(media_href);
    }
    else {
      lightbox = imgBuilder(media_href, media_name);
    }      
    
      
    //insert lightbox HTML into page
    $('body').append(lightbox);
  }
  //Click anywhere on the page to get rid of lightbox window
  $('body').on('click', "#lightbox", function() {
    if(item[0].tagName.toLowerCase() == "iframe") {
      $('#lightbox-content').html('<iframe src="' + media_href + '&modestbranding=1&autohide=1&controls=0" frameborder="0" allow="autoplay" allowfullscreen></iframe>');
    }
    else if(item[0].tagName.toLowerCase() == "video") {
      $('#lightbox-content').html('<video controls muted> <source src="' + media_href + '"></video>');
    }
    $('#lightbox').hide();
    enableScrolling();
  });
});

function columnNbr(){
    // let col_clientWidth = document.body.clientWidth / 280;
    // let col_windowWidth = $(window).width() / 280;
    // let col_windowInner = window.innerWidth / 280;
    let columnNumber = Math.ceil(window.innerWidth / 280) > 5 ? 5 : Math.ceil(window.innerWidth / 280);
    masonryLayout(document.getElementById("gallery"), document.querySelectorAll(".gallery-item"), columnNumber);
}

addEventListener("load", columnNbr)
addEventListener("load", playOnHover)
addEventListener("resize", columnNbr)

