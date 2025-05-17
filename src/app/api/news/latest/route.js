import  News  from '../../../../models/news';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const news = await News.findAll({
      order: [['date', 'DESC']],
      limit: 10,
      attributes: ['id', 'title', 'image', 'date'],
    });

    return NextResponse.json({ news });
  } catch (error) {
    return NextResponse.json({ error: 'Помилка при отриманні новин' }, { status: 500 });
  }
}
