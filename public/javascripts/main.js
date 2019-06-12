var link = 'http://178.128.4.214:3131/upload';

$('#submit').on('click', function () {
  var input = $('#input');
  if (input.val()) {
    console.log('value: ', input.val());
    send(link, input.val());
    input.val('')
  }
});

var send = function( url, data ) {
  jQuery.ajax( {
    url: url,
    type: "POST",
    data: data,
    contentType: "application/json",
    success: function (res) {
      console.log('done: ', res);
    },
    error: function (err) {
      console.error(err);
    }
  });
};

