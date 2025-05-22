import { NextResponse } from 'next/server';
import Comments from "../../../../../../models/comment"
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function DELETE(request, { params }) {
    const { id: news_id, commentId: id } = await params;
    try {
         const cookie = await cookies();
         const token = cookie.get('authToken')?.value;    
         if (!token) {
      return NextResponse.json({ message: 'Не авторизований користувач' }, { status: 401 });
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user_id = payload.id;
    const comment = await Comments.findOne({
      where: { id, news_id }
    });
        if (!comment) {
           return NextResponse.json({ message: "Коментар не знайдено" }, { status: 404 });
        }
    console.log('Token:', token);
    console.log('Payload:', payload);
    console.log('Comment user_id:', comment.user_id);
    console.log('Payload user_id:', user_id);
    console.log('Тип comment.user_id:', typeof comment.user_id);
    console.log('Тип user_id:', typeof user_id);
    console.log('Коментар:', comment);

    if (comment.user_id !== user_id) {
      return NextResponse.json({ message: "Ви не маєте права видаляти цей коментар" }, { status: 403 });
    }
        await Comments.destroy({ where: { id } });
        await comment.destroy();
        return NextResponse.json({ message: "Коментар видалено" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Помилка сервера" }, { status: 500 });
    }
}
