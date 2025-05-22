import  News  from '../../../../models/news';
import { NextResponse } from 'next/server';
import { logToBetterStack } from '../../../../lib/Logger';

export async function GET(request) {
  try {
    const news = await News.findAll({
      order: [['date', 'DESC']],
      limit: 10,
      attributes: ['id', 'title', 'image', 'date'],
    });
    await logToBetterStack({
                     level: 'info',
                     message: 'Успішно отримано найновіші новини',
                     total: news.count,
                     method: request.method,
                     url: request.url,
                     date: new Date()
                   });
    return NextResponse.json({ news });
  } catch (error) {
        await logToBetterStack({
                     level: 'error',
                     message: 'Помилка при отриманні',
                     method: request.method,
                     url: request.url,
                     date: new Date()
                   });
    return NextResponse.json({ error: 'Помилка при отриманні новин' }, { status: 500 });
    
  }
}
