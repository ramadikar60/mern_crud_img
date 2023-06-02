import express from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import BookRoute from './routes/BookRoute.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));
app.use(BookRoute);

app.listen(5000, () => {
    console.log('Server running...');
});
