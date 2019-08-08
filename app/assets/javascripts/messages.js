$(document).on('turbolinks:load', function(){ 

    function build_message(message){
      var img = (message.image.url !== null)?
                  (`<img src = ${message.url} >`) : ("")

      var html = `<div class="chat-main__messages__message">
      <div class="chat-main__messages__message__upper-info">
      <div class="chat-main__messages__message__upper-info__talker">
      ${message.user_name}
      </div>
      <div class="chat-main__messages__message__upper-info__date">
      ${message.date}
      </div>
      </div>
      <div class="chat-main__messages__message__text">
      <p class="chat-main__messages__message__text__content">
      ${message.content}
      ${img}
      </p>
      
      </div>
      </div>`
      return html;
    }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this); 
    var url = $(this).attr('action');
    $.ajax({  
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = build_message(data);
      $('.chat-main__messages').append(html)
      $('#message_content').val('');
      $('form')[0].reset();

      $('.chat-main__messages').animate({ scrollTop: $('.chat-main__messages')[0].scrollHeight});
    })
    .fail(function(data){
      alert('エラーが発生したためメッセージを送信できませんでした');
    })
    .always(function(data){
      $('.form__new-message__input-box__submit-btn').prop('disabled', false);
    })
  })
});