import app from './app.js';

app.listen(process.env.PORT || 3000, () => console.log(`listen on port ${process.env.PORT}`));