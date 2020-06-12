const playOnHover = () => {
  var playPromise
  var img
  
  $('.lightbox_trigger').mouseover(function(){
  
      if ($(this).children()[0].className == "yt-video"){
          img = $(this).find('img').attr('src');
          $(this).html('<iframe src="' + $(this).attr("href") + '?rel=0&autoplay=1&mute=1&modestbranding=1&autohide=1" frameborder="0" allow="autoplay"></iframe>');
      }
      else if ($(this).children()[0].tagName.toLowerCase() == "video"){
          $(this).children('.video-play').hide();
          playPromise = $(this).children()[0].play();
      }
  });    
  $('.lightbox_trigger').mouseout(function(){
      if ($(this).children()[0].tagName.toLowerCase() == "iframe"){
          $(this).html('<img src="' + img + '" class="yt-video"><img src="img/play.png" class="video-play">');
      }
      else if ($(this).children()[0].tagName.toLowerCase() == "video"){
          if (playPromise !== undefined){
              playPromise.then(_ => {
                  $(this).children()[0].pause();
              })
              .catch(error => {
                  console.log(error);
              });          
          }        
      $(this).children()[0].load();
      $(this).children('.video-play').show();
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
function disableRightClick(){
  $("img").bind("contextmenu",function(){
    return false;
  });
  $("video").bind("contextmenu",function(){
    return false;
  });
  $("iframe").bind("contextmenu",function(){
    return false;
  });
  $(".gallery-item").bind("contextmenu",function(){
    return false;
  });
}

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
function vidBuilder(vidID){
  var lightbox = 
          '<div id="lightbox">' +
            '<div id="lightbox-content">' + //insert clicked link's href into img src
              '<iframe src="https://www.youtube.com/embed/' + vidID + '?rel=0&autoplay=1&modestbranding=1&autohide=1&loop=1&playlist=' + vidID + '" frameborder="0" allow="autoplay" allowfullscreen></iframe>' +
            '</div>' +
          '</div>';
          return lightbox;
}
function vidLocalBuilder(src, title){
  var lightbox = 
          '<div id="lightbox">' +
            '<div id="lightbox-content">' + //insert clicked link's href into img src
              '<div id="lightbox-v-overlay">' +
                  '<video controls autoplay loop> <source src="' + src + '"></video>' +
                  '<p>' + title + '</p>' +
              '</div>' +
            '</div>' +
          '</div>';
          return lightbox;
}
    
$('.lightbox_trigger').click(function(e) {
  
  //prevent default action (hyperlink)
  e.preventDefault();
  
 
  //Get clicked link href
  var media_href = $(this).attr("href");
  // var videoID = media_href.split("/").pop()
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
      $('#lightbox-content').html('<iframe src="https://www.youtube.com/embed/' + media_name + '?rel=0&autoplay=1&modestbranding=1&autohide=1&loop=1&playlist=' + media_name + '" frameborder="0" allow="autoplay" allowfullscreen></iframe>');
    }
    else if(item[0].tagName.toLowerCase() == "video") {
        $('#lightbox-content').html('<div id="lightbox-v-overlay"> <video controls autoplay loop> <source src="' + media_href + '"></video> <p>' + media_name + '</p></div>');
      }
    else {
      $('#lightbox-content').html('<div id="lightbox-overlay"> <img src="' + media_href + '"> <p>' + media_name + '</p></div>');
    }
      
    //show lightbox window - you could use .show('fast') for a transition      
    disableRightClick();
    disableScrolling();
    $('#lightbox').show('fast');
    
  }
  else { //#lightbox does not exist - create and insert (runs 1st time only)
    var lightbox
    //create HTML markup for lightbox window
    
    if(item[0].tagName.toLowerCase() == "iframe") {
      lightbox = vidBuilder(media_name);
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
      $('#lightbox-content').html('<iframe src="https://www.youtube.com/embed/' + media_name + '?rel=0&modestbranding=1&autohide=1&controls=0" frameborder="0" allow="autoplay" allowfullscreen></iframe>');
    }
    else if(item[0].tagName.toLowerCase() == "video") {
      $('#lightbox-content').html('<div id="lightbox-v-overlay"> <video controls muted> <source src="' + media_href + '"></video></div>');
    }
    $('#lightbox').hide();
    enableScrolling();
  });
});

addEventListener("load", disableRightClick);
addEventListener("load", playOnHover);