// server index to set up port listen
const app = require('./app');

const PORT = 3000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on ${PORT}`);
});
