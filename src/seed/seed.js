import db from '../lib/conf_db.js';
import User from '../models/user.js';
import News from '../models/news.js';
import Comment from '../models/comment.js';

const users = [
  { login: 'test_login', email: 'test@email.com', password: '$2b$10$u.z8BHBhVXFSBqZfw2tXTeUM479vxFYwiazvpR/2f6e1lLkKLZQMm' },
  { login: 'second_test', email: 'secondtest@email.com', password: '$2b$10$veQAzp2oDtRSdtZhZBypF.KyLOnOVV7oRZM2Sl21JtZksXQdwGWCW' },
  { login: 'quernyn', email: 'alina@gmail.com', password: '$2b$10$GdEuQbPbSLmQ6AAQINwUm.jIHihCHsfmchZgFnWSqK077kvqFWHf6' }
];

const newsList = [
  { image: '/uploads/c3e4996f-1d0f-4804-878b-d5bf8d456b00.jpg', title: 'city', text: 'city text about city light bla', user_id: 1, date: '2025-05-03 20:41:02' },
  { image: '/uploads/ZefirCityLight.png', title: 'hjhkhjk', text: 'vcxbb', user_id: 1, date: '2025-05-03 20:44:31' },
  { image: '/uploads/8393260.png', title: 'orlcmsht', text: 'www', user_id: 1, date: '2025-05-03 20:47:35' },
  { image: '/uploads/8393260.png', title: 'ще одна тестова новина', text: 'ок', user_id: 1, date: '2025-05-03 20:50:28' },
  { image: '/uploads/ZefirCityLight.png', title: 'ссс', text: 'ссс', user_id: 1, date: '2025-05-03 20:55:08' },
  { image: '/uploads/unnamed.jpg', title: 'qqqq', text: 'qqqq', user_id: 1, date: '2025-05-04 09:48:47' },
  { image: '/uploads/o_1fm2dmpdckog3kp1al69i811pq2p.jpg', title: 'йййй', text: 'ййй', user_id: 1, date: '2025-05-04 09:55:20' }
];

const comments = [
  { text: 'test comment', user_id: 1, news_id: 3, date: '2025-05-17 18:29:02' }
];

async function seedDatabase() {
  try {
    await db.sync({ force: true });
    console.log('База даних оновлена');

    // Додаємо користувачів
    const createdUsers = await Promise.all(
      users.map(user => {User.create(user)})
    );
    console.log(`Додано ${createdUsers.length} користувачів`);

    // Додаємо новини
    const createdNews = await Promise.all(
      newsList.map(news => {News.create(news)})
    );
    console.log(`Додано ${createdNews.length} новин`);

    // Додаємо коментарі
    const createdComments = await Promise.all(
      comments.map(comment => {Comment.create(comment)})
    );
    console.log(`Додано ${createdComments.length} коментарів`);

    console.log('Сідінг завершено!');
    process.exit(0);
  } catch (error) {
    console.error('Помилка при сідуванні:', error);
    process.exit(1);
  }
}

seedDatabase();
