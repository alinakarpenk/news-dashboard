import { NextResponse } from 'next/server';
import Comments from "../../../../../models/comment"
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import User from '../../../../../models/user'
import { format } from 'date-fns';
import { logToBetterStack } from '../../../../../lib/Logger';

export async function POST(request, context) {
    try{
        const { params } = await context
        const cookie = await cookies();
         const token = cookie.get('authToken')?.value;
           if (!token) {
             await logToBetterStack({
               level: 'warn',
               message: 'Користувач не авторизований',
               method: request.method,
               url: request.url,
               date: new Date()
             });
             console.log('Не авторизований користувач')
             return NextResponse.json({ error: 'Не авторизований користувач' }, { status: 401 });
           }
        const body = await request.json();
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user_id = payload.id;
        const {text} = body
        const news_id = params.id;
        const addComment = await Comments.create({
            text,
            user_id,
            news_id
        })
        const commentWithUser = await Comments.findByPk(addComment.id, {
            include: { model: User, attributes: ['login'] }
        });
       const commentData = commentWithUser.toJSON();
       commentData.date = format(new Date(commentData.date), 'dd.MM.yyyy');
              await logToBetterStack({
                     level: 'info',
                     message: 'Успішно додано коментар',
                     comments_id: commentData.comments_id,
                     user_id: commentData.user_id,
                     news_id: commentData.news_id,
                     method: request.method,
                     url: request.url,
                     date: new Date()
                   });
        return NextResponse.json(commentData, { status: 201 });
    } catch(error){
        console.log("Error create comments", error)
         await logToBetterStack({
                     level: 'error',
                     message: 'Помилка при додаванні коментаря',
                     method: request.method,
                     url: request.url,
                     date: new Date()
                   });
        return NextResponse.json({ error: 'Помилка додання коментаря' }, { status: 500 });
    }
    
}

 