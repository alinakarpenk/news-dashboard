import News from '../../../../models/news';
import User from '../../../../models/user';
import Comments from '../../../../models/comment'
import {logToBetterStack} from '../../../../lib/Logger'
import { NextResponse } from 'next/server';

export async function GET(request, {params}) {
    try{
        const { id } = params
        const newsId = await News.findByPk(id, {
            include: [
                {
                    model: User,
                    attributes: ['login'],
                },
                {
                    model: Comments,
                    //attributes: ['id','text', 'user_id', 'news_id', 'date',  ],
                    include: [{model: User, attributes: ['login']}]                
                }
            ],
            attributes: ['id', 'image', 'title', 'text', 'date', 'user_id'],

        })
        const commentsid = newsId.Comments?.map(comment => comment.text) || []
            await logToBetterStack({
              level: 'info',
              message: 'Перегляд новини',
              user_id: newsId.user_id,
              news_id: newsId.id,
              comments_id: commentsid,
              method: request.method,
              url: request.url,
              date: new Date()
            });
        console.log(newsId)
        return NextResponse.json(newsId);
    } catch (error) {
       await logToBetterStack({
            level: 'error',
            message: 'Не вдалося отримати новини',
            error: error.message,
            method: request.method,
            url: request.url,
            date: new Date()
          });
        console.error("Новини відсутні:", error); 
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
  
  }
  