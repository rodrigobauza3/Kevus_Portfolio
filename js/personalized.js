function mouseOverAction(e){
  
  if (e.children()[0].className == "yt-video"){
    e.html('<iframe height="'+ (e.children()[0].height - 0.41) +'" src="' + e.attr("href") + '?rel=0&autoplay=1&mute=1&modestbranding=1&autohide=1&loop=1&playlist=' + e.attr("href").split("/").pop().split(".")[0] + '" frameborder="0" allow="autoplay"></iframe>');
  }
  else if (e.children()[0].className == "lc-video"){
    e.html('<video autoplay loop muted width="'+ e.children()[0].width +'" height="'+ e.children()[0].height +'"><source src="' + e.attr("href") + '" type="video/mp4"><source src="videos/gallery/' + e.attr("href").split("/").pop().split(".")[0] + '.webm" type="video/webM"><source src="videos/gallery/' + e.attr("href").split("/").pop().split(".")[0] + '.ogv" type="video/ogg"></video>');
  }
};

function mouseOutAction(e){
  var img, id
  if (e.children()[0].tagName.toLowerCase() == "iframe"){
    id = e.children()[0].src.split("/").pop().split("?")[0];
    e.html('<img src="https://img.youtube.com/vi/' + id + '/0.jpg" class="yt-video"><img src="img/play.png" class="video-play">');
  }
  else if (e.children()[0].tagName.toLowerCase() == "video"){
    e.children()[0].pause();
    img = e.children()[0].innerHTML.split("videos/gallery/").pop().split(".")[0];
    e.html('<img width="'+ e.children()[0].width +'" height="'+ e.children()[0].height +'" src="videos/gallery/_thumbnail/' + img + '.png" class="lc-video"><img src="img/play.png" class="video-play">');
  }
};

const playOnHover = () => {
  $.getScript('js/jquery.hoverIntent.js', function(){
    $('.lightbox_trigger').hoverIntent(function(){mouseOverAction($(this))}, function(){mouseOutAction($(this))});
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
                  '<video controls autoplay loop disablePictureInPicture oncontextmenu="return false;" controlsList="nodownload"><source src="' + src + '" type="video/mp4"><source src="videos/gallery/' + title + '.webm" type="video/webM"><source src="videos/gallery/' + title + '.ogv" type="video/ogg"></video>' +
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

    if(item[0].tagName.toLowerCase() == "iframe" || item[0].className == "yt-video") {
      $('#lightbox-content').html('<iframe src="https://www.youtube.com/embed/' + media_name + '?rel=0&autoplay=1&modestbranding=1&autohide=1&loop=1&playlist=' + media_name + '" frameborder="0" allow="autoplay" allowfullscreen></iframe>');
    }
    else if(item[0].tagName.toLowerCase() == "video" || item[0].className == "lc-video") {
        $('#lightbox-content').html('<div id="lightbox-v-overlay"><video controls autoplay loop disablePictureInPicture oncontextmenu="return false;" controlsList="nodownload"><source src="' + media_href + '" type="video/mp4""><source src="videos/gallery/' + media_name + '.webm" type="video/webM"><source src="videos/gallery/' + media_name + '.ogv" type="video/ogg"></video><p>' + media_name + '</p></div>');
      }
    else {
      $('#lightbox-content').html('<div id="lightbox-overlay"><img src="' + media_href + '"> <p>' + media_name + '</p></div>');
    }

    disableRightClick();
    disableScrolling();
    $('#lightbox').show('fast');
    
  }
  else {
    var lightbox
    
    if(item[0].tagName.toLowerCase() == "iframe" || item[0].className == "yt-video") {
      lightbox = vidBuilder(media_name);
    }
    else if (item[0].tagName.toLowerCase() == "video" || item[0].className == "lc-video"){
      lightbox = vidLocalBuilder(media_href, media_name);
    }
    else {
      lightbox = imgBuilder(media_href, media_name);
    }

    $('body').append(lightbox);
    disableRightClick();
    disableScrolling();
    // $('#lightbox').show('fast');
  }

  $('body').on('click', "#lightbox", function() {
    if(item[0].tagName.toLowerCase() == "iframe") {
      $('#lightbox-content').html('<iframe src="https://www.youtube.com/embed/' + media_name + '?rel=0&mute=1&modestbranding=1&autohide=1&controls=0" frameborder="0" allow="autoplay" allowfullscreen></iframe>');
    }
    else if(item[0].tagName.toLowerCase() == "video") {
      $('#lightbox-content').html('<div id="lightbox-v-overlay"><video controls loop disablePictureInPicture oncontextmenu="return false;" controlsList="nodownload"><source src="' + media_href + '" type="video/mp4""><source src="videos/gallery/' + media_name + '.webm" type="video/webM"><source src="videos/gallery/' + media_name + '.ogv" type="video/ogg"></video><p>' + media_name + '</p></div>');
    }
    $('#lightbox').hide();
    enableScrolling();
  });
});

addEventListener("load", disableRightClick);
addEventListener("load", playOnHover);