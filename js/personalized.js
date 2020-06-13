function mouseOverAction(e){
  if (e.children()[0].className == "yt-video"){
    e.html('<iframe src="' + e.attr("href") + '?rel=0&autoplay=1&mute=1&modestbranding=1&autohide=1&loop=1&playlist=' + e.attr("href").split("/").pop().split(".")[0] + '" frameborder="0" allow="autoplay"></iframe>');
  }
  else if (e.children()[0].className == "lc-video"){
    e.html('<video autoplay loop muted> <source src="' + e.attr("href") + '"></video>');
  }
};

function mouseOutAction(e){
  var img, id
  if (e.children()[0].tagName.toLowerCase() == "iframe"){
    id = e.children()[0].src.split("/").pop().split("?")[0];
    e.html('<img src="https://img.youtube.com/vi/' + id + '/0.jpg" class="yt-video"><img src="img/play.png" class="video-play">');
  }
  else if (e.children()[0].tagName.toLowerCase() == "video"){
    img = e.children()[0].innerHTML.split("/").pop().split(".")[0];
    e.html('<img src="videos/gallery/_thumbnail/' + img + '.png" class="lc-video"><img src="img/play.png" class="video-play">');
  }  
};

const playOnHover = () => {
  
  $('.lightbox_trigger').mouseover(function(){
      mouseOverAction($(this));
  });    
  $('.lightbox_trigger').mouseout(function(){
      mouseOutAction($(this));
  });
}

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
            '<div id="lightbox-content">' +
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
            '<div id="lightbox-content">' +
              '<iframe src="https://www.youtube.com/embed/' + vidID + '?rel=0&autoplay=1&modestbranding=1&autohide=1&loop=1&playlist=' + vidID + '" frameborder="0" allow="autoplay" allowfullscreen></iframe>' +
            '</div>' +
          '</div>';
          return lightbox;
}
function vidLocalBuilder(src, title){
  var lightbox = 
          '<div id="lightbox">' +
            '<div id="lightbox-content">' +
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

  var media_href = $(this).attr("href");
  var media_name = media_href.split("/").pop().split(".")[0];
  var item = $(this).children();
 
  if ($('#lightbox').length > 0) {

    if(item[0].tagName.toLowerCase() == "iframe") {
      $('#lightbox-content').html('<iframe src="https://www.youtube.com/embed/' + media_name + '?rel=0&autoplay=1&modestbranding=1&autohide=1&loop=1&playlist=' + media_name + '" frameborder="0" allow="autoplay" allowfullscreen></iframe>');
    }
    else if(item[0].tagName.toLowerCase() == "video") {
        $('#lightbox-content').html('<div id="lightbox-v-overlay"> <video controls autoplay loop> <source src="' + media_href + '"></video> <p>' + media_name + '</p></div>');
      }
    else {
      $('#lightbox-content').html('<div id="lightbox-overlay"> <img src="' + media_href + '"> <p>' + media_name + '</p></div>');
    }

    disableRightClick();
    disableScrolling();
    $('#lightbox').show('fast');
    
  }
  else {
    var lightbox
    
    if(item[0].tagName.toLowerCase() == "iframe") {
      lightbox = vidBuilder(media_name);
    }
    else if (item[0].tagName.toLowerCase() == "video"){
      lightbox = vidLocalBuilder(media_href);
    }
    else {
      lightbox = imgBuilder(media_href, media_name);
    }

    $('body').append(lightbox);
  }

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