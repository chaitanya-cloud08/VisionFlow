const quotes = [
    "The best way to predict the future is to create it.",
    "Believe you can and you're halfway there.",
    "The only limit to our realization of tomorrow is our doubts of today.",
    "Do what you can with all you have, wherever you are.",
    "You've got to get up every morning with determination if you're going to go to bed with satisfaction.",
    "Success is walking from failure to failure with no loss of enthusiasm.",
    "You may only succeed if you desire succeeding; you may only fail if you do not mind failing.",
  ];
  
  export function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  }
  
  export function getAllQuotes() {
    return quotes;
  }
  