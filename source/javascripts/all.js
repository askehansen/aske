// This is where it all goes :)


$(document).ready(function() {
  setTimeout(function () {
    var aske = document.querySelector('[role=aske]');
    var tagline = document.querySelector('[role=tagline]');
    aske.classList.remove('hide');
    aske.classList.add('fade-in');
    tagline.classList.remove('hide');
    tagline.classList.add('fade-in-long');
  }, 500);
});

(function() {
  $(document).on('scroll', function() {
    if (window.scrollY > window.innerHeight) {
      $('[role=hero]:not(.hide)').addClass('hide');
    }
    else {
      $('[role=hero].hide').removeClass('hide');
    }
  });

  $(window).on('resize', function() {
    $('[role=profile]').css('margin-top', window.innerHeight + 'px');
  });

  $(document).on('click', '[role=open-contact-form]', function() {
    var form = document.querySelector('[role=contact-form]');
    form.classList.remove('hide');
    form.classList.add('zoom-in');
    document.querySelector('body').classList.add('noscroll');
    document.querySelector('[role=contact]').classList.add('zoom-back');

    setTimeout(function() {
      $('[role=name-input]').focus();
    }, 300);
  });

  $(document).on('click', '[role=close-contact-form]', function() {
    var form = document.querySelector('[role=contact-form]');
    form.classList.add('hide');
    form.classList.remove('zoom-in');
    document.querySelector('body').classList.remove('noscroll');
    document.querySelector('[role=contact]').classList.remove('zoom-back');
  });

  $(document).on('keyup blur', '[role=name-input]', function() {
    $('[role=name-value]').html($(this).html());
  });

  $(document).on('click', '[role=send-message]', function() {
    var message = $('[role=message]')[0].innerText;
    var email = $('[role=email]')[0].innerText;

    $.ajax({
      url: '//formspree.io/aske@deeco.dk',
      method: 'POST',
      dataType: 'json',
      data: {
        subject: 'Hej Aske',
        message: message,
        _reply_to: email
      }
    });

    $('[role=contact-form]').addClass('success');

  });

})();




/*! loadCSS: load a CSS file asynchronously. [c]2016 @scottjehl, Filament Group, Inc. Licensed MIT */
!function(e){"use strict";var t=function(t,n,i){var o,a=e.document,d=a.createElement("link"),r=i||"all";if(n)o=n;else{var l=(a.body||a.getElementsByTagName("head")[0]).childNodes;o=l[l.length-1]}var s=a.styleSheets;d.rel="stylesheet",d.href=t,d.media="only x",o.parentNode.insertBefore(d,n?o:o.nextSibling);var f=function(e){for(var t=d.href,n=s.length;n--;)if(s[n].href===t)return e();setTimeout(function(){f(e)})};return d.addEventListener&&d.addEventListener("load",function(){this.media=r}),d.onloadcssdefined=f,f(function(){d.media!==r&&(d.media=r)}),d};"undefined"!=typeof exports?exports.loadCSS=t:e.loadCSS=t}("undefined"!=typeof global?global:this);

/* CSS rel=preload polyfill (from src/cssrelpreload.js) */
(function( w ){
  // rel=preload support test
  function support(){
    try {
      return w.document.createElement( "link" ).relList.supports( "preload" );
    } catch (e) {}
  }
  // loop preload links and fetch using loadCSS
  function poly(){
    var links = w.document.getElementsByTagName( "link" );
    for( var i = 0; i < links.length; i++ ){
      var link = links[ i ];
      if( link.rel === "preload" && link.getAttribute( "as" ) === "style" ){
        w.loadCSS( link.href, link );
        link.rel = null;
      }
    }
  }
  // if link[rel=preload] is not supported, we must fetch the CSS manually using loadCSS
  if( !support() ){
    poly();
    var run = w.setInterval( poly, 300 );
    if( w.addEventListener ){
      w.addEventListener( "load", function(){
        w.clearInterval( run );
      } );
    }
  }
}( this ));
