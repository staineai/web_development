
var randomQuoteGenerator = {};
var quotesData;
var currentQuote = '';
var currentAuthor = '';
function openURL(url){
  window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
}

// Gets quotes from FCC GitHub:
function getQuotes() {
  return $.ajax({
    headers: {
      Accept: "application/json"
    },
    url: 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
    success: function(jsonQuotes) {
      if (typeof jsonQuotes === 'string') {
        quotesData = JSON.parse(jsonQuotes);
        console.log('quotesData');
        console.log(quotesData);
      }
    }
  });
}

// Returns a random quote from getQuotes():
function generateRandomQuote() {
  return quotesData.quotes[Math.floor(Math.random() * quotesData.quotes.length)];
}

// Converts quote and author to jQuery objects:
function renderQuote() {
  let randomQuote = generateRandomQuote();

  currentQuote = randomQuote.quote;
  currentAuthor = randomQuote.author;

  $("#quote-text").animate(
    { opacity: 0 },
    500,
    function() {
      $(this).animate({ opacity: 1}, 500);
      $('#text').html(randomQuote.quote);
    }
  );

  $(".quote-author").animate(
    { opacity: 0 },
    500,
    function() {
      $(this).animate({ opacity: 1}, 500);
      $('#author').html(randomQuote.author);
    }
  );

  $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
};


$(document).ready(function() {
  getQuotes().then(() => {
    renderQuote();
  });

  $('#new-quote').on('click', renderQuote);

  $('#tweet-quote').on('click', function() {
    openURL('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
  });
});
