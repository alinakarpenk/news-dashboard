import { NextResponse } from 'next/server';
import Comments from "../../../../../models/comment"
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import User from '../../../../../models/user'
import News from '@/app/(news)/news/page';

export async function POST(request, {params}) {
    try{
        const token = cookies().get('authToken')?.value;
        if (!token) {
           console.log("user not auth")
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

        return NextResponse.json(commentWithUser, { status: 201 });
    } catch(error){
        console.log("Error create comments", error)
        return NextResponse.json('Помилка додання коментаря', error)
    }
    
}

export async function PATCH(request, { params }) {
    const { id } = params;
    const data = await request.json();

    try {
        const news = await News.findByPk(id);
        if (!news) {
            return NextResponse.json({ message: "Оголошення не знайдено" }, { status: 404 });
        }

        await news.save(data);

        return NextResponse.json({ message: "Оголошення оновлено", news });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Помилка сервера" }, { status: 500 });
    }
}