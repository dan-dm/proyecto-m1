import app from './app.js';

let port = process.env.PORT || 3000

app.listen(port, () => console.log(`listen on port ${port}`));