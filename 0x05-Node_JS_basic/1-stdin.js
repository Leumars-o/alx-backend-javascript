// A program that displays the message "Welcome to Holberton School, what is your name?"

const message = 'Welcome to Holberton School, what is your name?\n';

process.stdout.write(message);

process.stdin.on('data', (input) => {
  process.stdout.write(`Your name is: ${input}`);
});

process.on('exit', () => {
  process.stdout.write('This important software is now closing\n');
});
