const app = require('./backend/app');

const port = process.env.PORT || 3000;


app.listen(port, () => {
    console.log(`Server is running at ${port}`);
})
