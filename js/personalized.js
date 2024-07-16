function mouseOverAction(e){  
  if (e.children()[0].className == "yt-video"){
    e.html('<iframe height="'+ (e.children()[0].height - 0.41) +'" src="' + e.attr("href") + '?rel=0&autoplay=1&mute=1&modestbranding=1&autohide=1&loop=1&playlist=' + e.attr("href").split("/").pop().split(".")[0] + '" frameborder="0" allow="autoplay"></iframe>');
  }
  else if (e.children()[0].className == "lc-video"){
    e.html('<video autoplay loop muted width="'+ e.children()[0].width +'" height="'+ e.children()[0].height +'"><source src="' + e.attr("href") + '" type="video/mp4"><source src="videos/gallery/' + e.attr("href").split("/").pop().split(".")[0] + '.webm" type="video/webM"><source src="videos/gallery/' + e.attr("href").split("/").pop().split(".")[0] + '.ogv" type="video/ogg"></video>');
  }
};

function mouseOverAction(e) {  
  if (e.children()[0].className == "yt-video") {
    e.html('<iframe height="'+ (e.children()[0].height - 0.41) +'" src="' + e.attr("href") + '?rel=0&mute=1&modestbranding=1&autohide=1&loop=1&playlist=' + e.attr("href").split("/").pop().split(".")[0] + '" frameborder="0"></iframe>');
  } else if (e.children()[0].className == "lc-video") {
    e.html('<video loop muted width="'+ e.children()[0].width +'" height="'+ e.children()[0].height +'"><source src="' + e.attr("href") + '" type="video/mp4"><source src="videos/gallery/' + e.attr("href").split("/").pop().split(".")[0] + '.webm" type="video/webM"><source src="videos/gallery/' + e.attr("href").split("/").pop().split(".")[0] + '.ogv" type="video/ogg"></video>');
  }
};

const playOnHover = () => {
  $.getScript('js/jquery.hoverIntent.js', function(){
    $('.lightbox_trigger').hoverIntent(function(){mouseOverAction($(this))}, function(){mouseOutAction($(this))});
  });
}

/*Disable scrolling when on lightbox*/
function disableScrolling(){
  var x=window.scrollX;
  var y=window.scrollY;
  window.onscroll=function(){window.scrollTo(x, y);};
}

/*Enable scrolling when lightbox's off*/
function enableScrolling(){
  window.onscroll=function(){};
}

/*Disable right click to avoid saving or inspecting*/
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

/*Disable middle click to avoid open in separate window*/
var galleryitems = document.getElementsByClassName("gallery-item");
for (var i = 0; i < galleryitems.length; i++) {
  galleryitems[i].addEventListener("auxclick", (event) => {
    if (event.button === 1) event.preventDefault();
  });
}

/*Disable context menu on all elements to avoid inspecting*/
$(document).bind("contextmenu",function(e) {
  e.preventDefault();
});

 /*Disable F12 to avoid inspecting*/
//  $(document).keydown(function(e){
//   if(e.which === 123){
//      return false;
//   }
// });

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
function vidBuilder(vidID) {
  var lightbox = 
    '<div id="lightbox">' +
      '<div id="lightbox-content">' +
        '<iframe src="https://www.youtube.com/embed/' + vidID + '?rel=0&modestbranding=1&autohide=1&loop=1&playlist=' + vidID + '" frameborder="0" allowfullscreen></iframe>' +
      '</div>' +
    '</div>';
  return lightbox;
}
function vidLocalBuilder(src, title) {
  var lightbox = 
    '<div id="lightbox">' +
      '<div id="lightbox-content">' +
        '<div id="lightbox-v-overlay">' +
          '<video controls loop disablePictureInPicture oncontextmenu="return false;" controlsList="nodownload"><source src="' + src + '" type="video/mp4"><source src="videos/gallery/' + title + '.webm" type="video/webM"><source src="videos/gallery/' + title + '.ogv" type="video/ogg"></video>' +
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
    
    var lightboxitems = document.getElementById("lightbox");
    for (var i = 0; i < lightboxitems.length; i++) {
      lightboxitems[i].addEventListener("auxclick", (event) => {
        if (event.button === 1) event.preventDefault();
      });
    }
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
    var lightboxitems = document.getElementById("lightbox");
    for (var i = 0; i < lightboxitems.length; i++) {
      lightboxitems[i].addEventListener("auxclick", (event) => {
        if (event.button === 1) event.preventDefault();
      });
    }
  }

  $('body').on('click', "#lightbox", function() {
    if(item[0].tagName.toLowerCase() == "iframe" || item[0].className == "yt-video") {
      $('#lightbox-content').html('<iframe src="https://www.youtube.com/embed/' + media_name + '?rel=0&mute=1&modestbranding=1&autohide=1&controls=0" frameborder="0" allow="autoplay" allowfullscreen></iframe>');
    }
    else if(item[0].tagName.toLowerCase() == "video" || item[0].className == "lc-video") {
      $('#lightbox-content').html('<div id="lightbox-v-overlay"><video controls muted loop disablePictureInPicture oncontextmenu="return false;" controlsList="nodownload"><source src="' + media_href + '" type="video/mp4""><source src="videos/gallery/' + media_name + '.webm" type="video/webM"><source src="videos/gallery/' + media_name + '.ogv" type="video/ogg"></video><p>' + media_name + '</p></div>');
    }
    $('#lightbox').hide();
    enableScrolling();
  });
});

$(document).ready(function () {
  $('#gallery .gallery-item:lt(26)').show(300).css("display", "inline-block");
  $('.less').hide();
  var active = document.getElementsByClassName('filter-button active')[0].attributes[1].value;
  var items = document.getElementsByClassName('gallery-item').length;
  var itemsAct = $('#gallery .gallery-item').filter('.'+active).length;
  var shown =  26;
  var anchor = "gallery-container";

  if (shown <= itemsAct){
    $('.more').hide();
  }

  /*********More/Less button handling*********/
  $('.more').click(function () {
    active = document.getElementsByClassName('filter-button active')[0].attributes[1].value;
    $('.less').show();

    if(active == "all"){ 
      shown = $('#gallery .gallery-item:visible').length+16;
      if(shown < items) {
        $('#gallery .gallery-item:lt('+shown+')').show(300).css("display", "inline-block");
      } 
      else {
        $('#gallery .gallery-item:lt('+items+')').show(300).css("display", "inline-block");
        $('.more').hide();
      }
    }
    else{
      itemsAct = $('#gallery .gallery-item').filter('.'+active).length;
      shown = $('#gallery .gallery-item:visible').filter('.'+active).length+16;
      if(shown < itemsAct) {
        $('#gallery .gallery-item').filter('.'+active+':lt('+shown+')').show(300).css("display", "inline-block");
      } 
      else {
        $('#gallery .gallery-item').filter('.'+active+':lt('+itemsAct+')').show(300).css("display", "inline-block");
        $('.more').hide();
      }
    }
    resizeAllGridItems();
  });
  $('.less').click(function () {
    document.getElementById(anchor).scrollIntoView({block: "start", behavior: "smooth"});
    $('#gallery .gallery-item:visible').not(':lt(26)').hide("fast");
    $('.more').show();
    $('.less').hide();
    resizeAllGridItems();
  });
  /*********END More/Less button handling*********/

  /*********Filters handling*********/
  $(".filter-button").click(function(){    
    
    $(".filter-button").removeClass("active");
    $(this).addClass("active");

    var value = $(this).attr('data-filter');
    active = $(this).attr('data-filter');
    
    $('#gallery .gallery-item:visible').hide(300);      
    if(value == "all"){
      if(shown < items) {
        $('#gallery .gallery-item:lt(26)').show(300).css("display", "inline-block");
        $('.more').show();
      } 
      else {
        $('#gallery .gallery-item:lt('+items+')').show(300).css("display", "inline-block");
        $('.more').hide();
      }
    }
    else
    {
      if(shown < items) {
        $(".filter").not('.'+value).hide(300);
        $('#gallery .gallery-item').filter('.'+value+':lt('+shown+')').show(300).css("display", "inline-block");
      } 
      else {
        $('#gallery .gallery-item').filter('.'+value+':lt('+items+')').show(300).css("display", "inline-block");
        $('.more').hide();
      }        
    }

    shown = $('#gallery .gallery-item:visible').length
    itemsAct = $('#gallery .gallery-item').filter('.'+active).length;

    if (shown <= itemsAct){
      $('.more').hide();
    }

    resizeAllGridItems();        
  });
  /*********END Filters handling*********/
  resizeAllGridItems();
});

function resizeAllGridItems(){
  allItems = document.getElementsByClassName("gallery-item");
  for(x=0;x<allItems.length;x++){
    imagesLoaded(allItems[x], resizeInstance(allItems));
  }
}
function resizeInstance(instance){
  //item = instance.elements[0];
  for(i=0;i<instance.length;i++){
    resizeGridItem(instance[i]);
  }  
}
function resizeGridItem(item){
  grid = document.getElementsByClassName("masonry-layout")[0];
  rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
  rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
  //rowSpan = Math.ceil((item.querySelector('.gallery-item').getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));
  rowSpan = Math.trunc(($($(item).children()[0]).children()[0].height+rowGap)/(rowHeight+rowGap));
  item.style.gridRowEnd = "span "+rowSpan;
}

window.onload = resizeAllGridItems();
addEventListener("resize", resizeAllGridItems);
addEventListener("load", disableRightClick);
addEventListener("load", playOnHover);