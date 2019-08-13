$(function(){
  var search_list = $("#user-search-result");

  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    search_list.append(html);
  }

  function addUser(name,user_id){
    var html = `<div class='chat-group-user js-chat-member' id='chat-group-user-8'>
    <input name='group[user_ids][]' type='hidden' value='${user_id}'>
    <p class='chat-group-user__name'>${name}</p>
    <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
  </div>`
  $("#chat-group-users").append(html);
  }

  function appendErrMsgToHTML(msg){
    var html = `<div id='user-search-result'>${ msg }</div>`
    search_list.append(html)
  }
  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: {keyword: input},
      dataType: 'json'
    })
    .done(function(data){
      $('#user-search-result').find('li').remove();
      $("#user-search-result").empty();
      if (data.length !==0){
        data.forEach(function(user){
          appendUser(user);
        });
      }
      else{
        appendErrMsgToHTML("一致するメンバーはいません");
      }
    })
    .fail(function(){
      alert('error');
    })
  });
  $("#user-search-result").on("click",".chat-group-user__btn--add",function(e){
    var name = $(this).data("user-name");
    var user_id = $(this).data("user-id");
  addUser(name,user_id);
  $(this).parent().remove();
  });
  $("#chat-group-users").on("click", ".js-remove-btn", function(e){
    $(this).parent().remove();
  });
});