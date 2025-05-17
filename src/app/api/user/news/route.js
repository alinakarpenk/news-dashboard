'use server'

import { NextResponse } from "next/server";
import User from "../../../../models/user"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import News from '../../../../models/news';
import dotenv from 'dotenv'
//import {logToBetterStack} from '../../../../lib/Logger'

dotenv.config()

export async function GET(request){
    try{
        const authToken = request.cookies.get('authToken')?.value;
        if(!authToken){
            return NextResponse.json({message: 'Користувач не авторизований'})
        }
        const decoded = jwt.verify(authToken, process.env.JWT_SECRET_KEY)
        const user = await User.findByPk(decoded.id)
     if (!user) {
            return NextResponse.json({ message: 'Користувача не знайдено' }, { status: 404 })
        }

        const GetNews = await News.findAll({where: { user_id: user.id} })

        return NextResponse.json({news: GetNews})
    } catch(error){
        console.log('ERROR ON SERVER',error)
        return NextResponse.json({message: 'Помилка отримання новин'}, {status: 500})
    }
}
