$(document).ready(function(){
  $('.register').hide();
  $('#register').click(function(){
    $('.register').show();
    $('.login').hide();
  })
  $('#loginAgain').click(function(){
    $('.register').hide();
    $('.login').show();
  })
  // $('.register').hide();
})
