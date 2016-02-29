//= require jquery.min
//= require load-css

//= require_self


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
