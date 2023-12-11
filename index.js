import express from 'express';
import mongoose from 'mongoose';
import authRouter from './authRouter.js';

import cors from 'cors';

mongoose
    .connect(
        'mongodb+srv://stassolovyov777:777@cluster0.lfwwxxg.mongodb.net/Auth?retryWrites=true&w=majority'
    )
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth', authRouter);

const port = process.env.PORT || 4000;
app.listen(port, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log(`server is running on port ${port}`);
});
