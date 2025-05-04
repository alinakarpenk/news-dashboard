import News from '../../../../models/news';
import User from '../../../../models/user';
import { NextResponse } from 'next/server';

export async function GET(request, {params}) {
    try{
        const {id} = params
        const newsId = await News.findByPk(id, {
            include: [
                {
                    model: User,
                    attributes: ['login'],
                },
                {
                    model: Comment,
                    include: [{model: User, attributes: ['login']}],
                    order: [['DESC']]
                }
            ],
            attributes: ['id', 'image', 'title', 'text', 'date', 'user_id'],
        })
        console.log(newsId)
        return NextResponse.json(newsId);
    } catch (error) {
        console.error("Новини відсутні:", error); 
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
  
  }
  