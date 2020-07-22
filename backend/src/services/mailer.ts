/* eslint-disable @typescript-eslint/ban-ts-ignore */
import path from 'path';
import nodemailer from 'nodemailer';
// @ts-ignore
import hbs from 'nodemailer-express-handlebars';
import handlebars from 'express-handlebars';

import { host, port, user, pass } from '../config/mail.json';

const transport = nodemailer.createTransport({
  host,
  port,
  auth: { user, pass }
});

const viewEngine = handlebars.create({
  partialsDir: 'partials/',
  defaultLayout: undefined
});

transport.use(
  'compile',
  hbs({
    viewEngine,
    viewPath: path.resolve(__dirname, '../resourses/mail/auth')
  })
);

export default transport;
