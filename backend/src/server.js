const app = require('./app'); // depois vamos criá-lo
const { port } = require('./config/env');

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
