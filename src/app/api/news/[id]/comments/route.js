import { NextResponse } from 'next/server';
import Comments from "../../../../../models/comment"
import { headers } from 'next/headers';
import jwt from 'jsonwebtoken';
import User from '../../../../../models/user'
import { format } from 'date-fns';

export async function POST(request, {params}) {
    try{
    const headersList = await headers();
    const cookie = headersList.get('cookie') || '';
    const token = cookie.split(';').find(cookie => cookie.trim().startsWith('authToken='))?.split('=')[1];
        if (!token) {
           console.log("user not auth")
           return NextResponse.json({ message: 'user not auth' }, { status: 401 });
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
        return NextResponse.json(commentData, { status: 201 });
    } catch(error){
        console.log("Error create comments", error)
        return NextResponse.json('Помилка додання коментаря', error)
    }
    
}

