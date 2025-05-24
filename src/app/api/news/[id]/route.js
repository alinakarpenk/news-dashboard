import News from '../../../../models/news';
import User from '../../../../models/user';
import Comments from '../../../../models/comment'
import {logToBetterStack} from '../../../../lib/Logger'
import { NextResponse } from 'next/server';
import { format } from 'date-fns';
import streamifier from 'streamifier';
import cloudinary from '../../../../lib/cloudinary';

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

export async function GET(request, context) {
    try{
         const params = await context.params; 
         const { id } = params;
        const newsId = await News.findByPk(id, {
            include: [
                {
                    model: User,
                    attributes: ['login'],
                },
                {
                    model: Comments,
                    attributes: ['id','text', 'user_id', 'news_id', 'date'],
                    include: [{model: User, attributes: ['login']}]                
                }
            ],
            attributes: ['id', 'image', 'title', 'text', 'address', 'date', 'user_id'],

        })
          if (!newsId) {
      return NextResponse.json({ error: 'Новина не знайдена' }, { status: 404 });
    }

    const newsData = newsId.toJSON();
    newsData.date = format(new Date(newsData.date), 'dd.MM.yyyy');
if (Array.isArray(newsData.Comments)) {
    newsData.Comments = newsData.Comments.map(comment => ({
        ...comment,
        date: format(new Date(comment.date), 'dd.MM.yyyy')
    }));
}
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
        return NextResponse.json(newsData);
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

 export async function PATCH(request, context) {
    const { id } = context.params;
    try {
        const formData = await request.formData();
        const title = formData.get('title');
        const text = formData.get('text');
        const file = formData.get('image');
        const address = formData.get('address')
        const news = await News.findByPk(id);
        if (!news) {
            return NextResponse.json({ message: "Оголошення не знайдено" }, { status: 404 });
        }
        let upload
        //let imagePath = news.image;
        if (file && file.name) {
            const buffer = Buffer.from(await file.arrayBuffer());
            upload = await uploadToCloudinary(buffer);
            //const fileName = `${Date.now()}-${file.name}`;
            //onst filePath = path.join(process.cwd(), 'public', 'uploads', fileName);
            //await writeFile(filePath, buffer);
            //imagePath = `/uploads/${fileName}`;
        }
        await news.update({
            title,
            text,
            address,
            image: upload.secure_url
        });
        return NextResponse.json({ message: "Оголошення оновлено", news });
    } catch (error) {
        console.error("PATCH error:", error);
        return NextResponse.json({ message: "Помилка сервера" }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
const { id } = await params;
    try {
        const news = await News.findByPk(id);
        if (!news) {
            return NextResponse.json({ message: "Оголошення не знайдено" }, { status: 404 });
        }
          await Comments.destroy({ where: { news_id: id } });
        await news.destroy();
        return NextResponse.json({ message: "Оголошення видалено" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Помилка сервера" }, { status: 500 });
    }
}

