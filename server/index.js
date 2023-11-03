// server index to set up port listen
const app = require('./app');

const PORT = 3001;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on ${PORT}`);
});
