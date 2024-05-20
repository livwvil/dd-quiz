import nodemailer from 'nodemailer';

const port = process.env.MAILER_PORT;
const host = process.env.MAILER_HOST;
const user = process.env.MAILER_USER;
const password = process.env.MAILER_PASSWORD;
const destination = process.env.MAILER_DESTINATION;

if (!port || !host || !user || !password || !destination) {
  throw new Error(
    'Mailer not configured! Pass MAILER_PORT, MAILER_HOST, MAILER_USER, MAILER_PASSWORD through envieronment variables',
  );
}

const transporter = nodemailer.createTransport({
  host: host,
  port: parseInt(port),
  secure: port === '465',
  auth: {
    user: user,
    pass: password,
  },
});

export const SendNotification = async (
  fname: string,
  lname: string,
  group: string,
  tg: string,
) => {
  const subject = 'Неделя ЦК';

  const template = `
  <h1>Неделя ЦК</h1>
  <h2>Студент успешно ввел пароль!</h2>
  <p>
    <strong>Фамилия:</strong> ${lname}
  </p>
  <p>
    <strong>Имя:</strong> ${fname}
  </p>
  <p>
    <strong>Группа:</strong> ${group}
  </p>
  <p>
    <strong>Telegram nickname:</strong> ${tg}
  </p>
  `;

  return await transporter.sendMail({
    from: user,
    to: destination,
    subject: subject,
    html: template,
  });
};
