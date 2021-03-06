$(function() {
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="MessageBox" data-message-id=${message.id}>
          <div class="Chat-main__message-list__message-top">
            <div class="Chat-main__message-list__message-top__message-sender">
              ${message.user_name}
            </div>
            <div class="Chat-main__message-list__message-top__message-time">
              ${message.created_at}
            </div>
          </div>
          <div   class="Chat-main__message-list__message-bottom">
            <p class="Message__content">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
        `<div class="MessageBox" data-message-id=${message.id}>
          <div class="Chat-main__message-list__message-top">
            <div class="Chat-main__message-list__message-top__message-sender">
              ${message.user_name}
            </div>
            <div class="Chat-main__message-list__message-top__message-time">
              ${message.created_at}
            </div>
          </div>
          <div class="Chat-main__message-list__message-bottom">
            <p class="Message__content">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  }
  
  let reloadMessages = function() {
    let last_message_id = $('.MessageBox:last').data("message-id");
    console.log(last_message_id)
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      console.log(messages)
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.Chat-main__message-list').append(insertHTML);
        $('.Chat-main__message-list').animate({ scrollTop: $('.Chat-main__message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});
