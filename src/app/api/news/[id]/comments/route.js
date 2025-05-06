import { NextResponse } from 'next/server';
import Comments from "../../../models/comment"
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

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
    return NextResponse.json(addComment, { status: 201 });
    } catch(error){
        console.log("Error create comments", error)
        return NextResponse.json('Помилка додання коментаря', error)
    }
    
}