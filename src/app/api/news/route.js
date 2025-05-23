import { NextResponse } from 'next/server';
//import { writeFile } from 'fs/promises';
//import path from 'path';
import streamifier from 'streamifier';
import cloudinary from '../../../lib/cloudinary';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import News from '../../../models/news';
import User from '../../../models/user';
import {logToBetterStack} from '../../../lib/Logger'


export const config = {
  api: {
    bodyParser: false,
  },
};

async function uploadToCloudinary(file) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'news_images',
      },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(Buffer.from(file)).pipe(stream);
  });
}


export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image');
    const title = formData.get('title');
    const text = formData.get('text');
    const address = formData.get('address')

    if (!file || typeof file === 'string') {
      await logToBetterStack({
        level: 'warn',
        message: 'Файл не переданий',
        file,
        method: request.method,
        url: request.url,
        date: new Date()
      });
      return NextResponse.json({ error: 'Файл не переданий' }, { status: 400 });
    }
    const cookie = await cookies() 
    const token = cookie.get('authToken')?.value;
    if (!token) {
      await logToBetterStack({
        level: 'warn',
        message: 'Користувач не авторизований',
        method: request.method,
        url: request.url,
        date: new Date()
      });
      return NextResponse.json({ error: 'Не авторизований користувач' }, { status: 401 });
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user_id = payload.id;

    const buffer = Buffer.from(await file.arrayBuffer());
    const upload = await uploadToCloudinary(buffer);
    /*const fileName = `${file.name}`;
    const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);
    await writeFile(filePath, buffer);*/
    const addNews = await News.create({
      /*image: `/uploads/${fileName}`,*/
      image: upload.secure_url,
      title,
      text,
      address,
      user_id,
    });
    await logToBetterStack({
      level: 'info',
      message: 'Новина успішно додана',
      news_id: addNews.id,
      title,
      address,
      user_id,
      method: request.method,
      url: request.url,
      date: new Date()
    });

    return NextResponse.json({ message: 'Новина успішно додана', news: addNews }, { status: 201 });
  } catch (error) {
    await logToBetterStack({
      level: 'error',
      message: 'Помилка при збереженні новини',
      method: request.method,
      url: request.url,
      date: new Date(),
      error: error.message,
    });
    console.error('Помилка при додаванні новини:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    
      const news = await News.findAndCountAll({
          include: [
              {
                  model: User,
                  attributes: ['login'],
              },
          ],
          attributes: ['id', 'image', 'title', 'text', 'date', 'user_id'],
      });
      
      await logToBetterStack({
        level: 'info',
        message: 'Всі новини відображаються',
        total: news.count,
        method: request.method,
        url: request.url,
        timestamp: new Date()
      });

  
      //console.log(news)
      return NextResponse.json(news);
  } catch (error) {
    await logToBetterStack({
      level: 'error',
      message: 'Не вдалося отримати новини',
      error: error.message,
      method: request.method,
      url: request.url,
      timestamp: new Date()
    })
      console.error("Новини відсутні:", error); 
      return NextResponse.json({ error: error.message }, { status: 500 });
  }
}



