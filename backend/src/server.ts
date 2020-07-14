import dotenv from 'dotenv';
import 'reflect-metadata';
import app from './app';
import './database';

dotenv.config();

app.listen(process.env.PORT || 3333, () => {
  // eslint-disable-next-line no-console
  console.log('🏃 Running Server ✨');
});
