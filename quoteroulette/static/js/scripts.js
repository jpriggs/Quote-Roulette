$(document).ready(function() {
  getQuote();
  $("#new-quote").on('click', function() {
    $("#new-quote").prop('disabled', true);
    getQuote();
  });
});
function getQuote() {
  var url = 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=famous';
  var currentQuote = '';
  var currentAuthor = '';
  var shareTitle = 'Quote Roulette: Home to all your favorite quotes!';
  $.ajax({
    url: url,
    type: 'POST',
    data: {},
    dataType: 'json',
    contentType: 'application/x-www-form-urlencoded',
    success: function(data) {
        $("#text").text('"' + data.quote + '"');
        if (data.author === '') {
            data.author = 'Unknown';
        }
        $("#author").text('Author: ' + data.author);
        $("#new-quote").prop('disabled', false);
        currentQuote = data.quote;
        currentAuthor = data.author;
        $("#tweet-quote").attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes,QuoteRoulette&text=' + encodeURIComponent('"' + currentQuote + '" ' + '- ' + currentAuthor));
    },
    error: function(err) {
      alert(err);
    },
    beforeSend: function(xhr) {
      xhr.setRequestHeader("X-Mashape-Key", "cRIhjDCUYKmshR5Qox6jKaXv8AyUp1F8P1Cjsnbq2823lGw58Q")
    }
  });
}
