import dotenv from 'dotenv'
dotenv.config()

const token = process.env.SOURCE_TOKEN;
//console.log('TOKEN:', token);

export const logToBetterStack = async ({ level = 'info', message, ...meta }) => {
  try {
    await fetch('https://s1295770.eu-nbg-2.betterstackdata.com', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.SOURCE_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        level,
        message,
        ...meta,
      }),
    });
   /* console.log('LOG PAYLOAD:', {
      level,
      message,
      ...meta,
    });*/
  } catch (err) {
    console.error('Не вдалося надіслати лог у BetterStack:', err);
  }
};

