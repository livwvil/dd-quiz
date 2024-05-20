import express from 'express';
import { SendNotification } from './mailer';
import path from 'path';
import { rateLimit } from 'express-rate-limit';

const PASSWORD = '194398';

export const init = async (port: string) => {
  const app = express();

  const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 15 minutes
    limit: 5, // Limit each IP to 5 requests per `window` (here, per 1 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    skip: (req) => req.url !== '/submit' && req.url !== '/test',
    message: (req, res) => {
      console.log(req.rateLimit);
      res
        .status(403)
        .send(
          `Даже не пытайтесь вводить пароль чаще 5 раз в минуту. Ваша активность приостановлена до: ${req.rateLimit.resetTime}`,
        );
    },
  });

  app.use(limiter);
  app.use(express.static(path.join(__dirname, 'clientApp')));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get('/*', (req, res, next) => {
    if (req.url === '/submit' || req.url === '/test') {
      return next();
    }

    res.sendFile(path.join(__dirname, 'clientApp', 'index.html'));
  });

  app.post('/submit', async (req, res) => {
    console.log('submit', req.body);

    const { fname, lname, group, tg, password } = req.body;

    if (!(fname && lname && group)) {
      res.status(400).send('Введены не все обязательные поля');
      return;
    }

    if (password === PASSWORD) {
      try {
        const result = await SendNotification(fname, lname, group, tg);
        console.log('success', result);
        res.status(200).send();
      } catch (e: any) {
        console.error(e);
        res
          .status(e.responseCode || 500)
          .send('Не удалось отправить данные в ЦК');
      }
    } else {
      res.status(403).send('Пароль не подходит');
    }
  });

  app.post('/test', async (req, res) => {
    console.log('test', req.body);
    const { password } = req.body;

    res.status(200).send({ valid: password === PASSWORD });
  });

  app.listen(port, () => {
    console.log(`Server started on: http://localhost:${port}`);
  });
};
