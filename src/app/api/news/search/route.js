import { NextResponse } from 'next/server';
import News from '../../../../models/news';
import { Op } from 'sequelize';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('q');
    if (!search) {
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
    return NextResponse.json(newsResults);
  } catch (error) {
    console.error('Помилка пошуку:', error);
    return NextResponse.json({ error: 'Помилка пошуку' }, { status: 500 });
  }
}
