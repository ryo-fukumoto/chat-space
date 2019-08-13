$(function(){ 

    function build_message(message){
      var img = (message.image.url !== null)?
                  (`<img src = ${message.image.url} >`) : ("")

      var html = `<div class="chat-main__messages__message" data-message_id = "${message.id}">
      <div class="chat-main__messages__message__upper-info">
      <div class="chat-main__messages__message__upper-info__talker">
      ${message.user_name}
      </div>
      <div class="chat-main__messages__message__upper-info__date">
      ${message.created_at}
      </div>
      </div>
      <div class="chat-main__messages__message__text">
      <div class="chat-main__messages__message__text__content">
      ${message.content}
      </div>
      <div>
      ${img}
      </div>
      
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
  var reloadMessages = function() {
    if (location.href.match(/\/groups\/\d+\/messages/)){
      //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
      var last_message_id = $(".chat-main__messages__message:last").data("message_id");
      var group_id = $(".chat-main__main-header__left-box__current-group").data("group_id");
      $.ajax({
        //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
        url: `/groups/${group_id}/api/messages`,
        //ルーティングで設定した通りhttpメソッドをgetに指定
        type: 'get',
        dataType: 'json',
        //dataオプションでリクエストに値を含める
        data: {id: last_message_id}
      })
      .done(function(messages) {
        //追加するHTMLの入れ物を作る
        var insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        messages.forEach(function(message){
          insertHTML = build_message(message);
        //メッセージが入ったHTMLを取得
        $('.chat-main__messages').append(insertHTML);
        //メッセージを追加
        $('.chat-main__messages').animate({ scrollTop: $('.chat-main__messages')[0].scrollHeight},"fast");
      });
      })
      .fail(function() {
        alert("自動更新に失敗しました");
      });
    }
  };
  setInterval(reloadMessages, 5000);
});