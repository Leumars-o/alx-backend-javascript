// A program that displays the message "Welcome to Holberton School, what is your name?"

const readline = require('node:readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Welcome to Holberton School, what is your name?\n', (userInput) => {
  console.log(`Your name is: ${userInput}`);
  rl.close();
});

process.stdin.on('end', () => {
  console.log('This important software is now closing\n');
});
