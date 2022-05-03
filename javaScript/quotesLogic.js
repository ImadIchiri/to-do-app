// Logic
let quote = document.getElementById("quote");
let author = document.getElementById("author");

let randomNumber = Math.floor(Math.random() * quotesList.quotes.length);

quote.textContent = `" ${quotesList.quotes[randomNumber].quote} "`;
author.textContent = `" ${quotesList.quotes[randomNumber].author} "`;
