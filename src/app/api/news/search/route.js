import { NextResponse } from 'next/server';
import News from '../../../../models/news';
import { Op } from 'sequelize';
import { logToBetterStack } from '../../../../lib/Logger';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('q');
    if (!search) {
         await logToBetterStack({
                level: 'warn',
                message: 'Порожній запит',
                error: error.message,
                method: request.method,
                url: request.url,
                date: new Date()
              });
      return NextResponse.json({ error: 'Порожній запит' }, { status: 400 });
    }
    const newsResults = await News.findAll({
      where: {
        title: {
          [Op.iLike]: `%${search}%`
        }
      },
      attributes: ['id', 'title', 'image', 'date']
    });
     await logToBetterStack({
                level: 'info',
                message: 'Оголошення знайдено',
                method: request.method,
                url: request.url,
                date: new Date()
              });
    return NextResponse.json(newsResults);
  } catch (error) {
       await logToBetterStack({
                level: 'error',
                message: 'Помилка пошуку',
                error: error.message,
                method: request.method,
                url: request.url,
                date: new Date()
              });
    console.error('Помилка пошуку:', error);
    return NextResponse.json({ error: 'Помилка пошуку' }, { status: 500 });
  }
}
