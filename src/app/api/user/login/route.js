'use server'

import { NextResponse } from "next/server";
import User from "../../../../models/user"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import {logToBetterStack} from '../../../../lib/Logger'

//import { cookies } from 'next/headers';

dotenv.config()

//login request

export async function POST(request) {
    try{
        const body = await request.json();
        const { email, password } = body;
        const user = await User.findOne({ where: { email } });
        if(!user || !(await bcrypt.compare(password, user.password))){
            await logToBetterStack({
                level: 'warn',
                message: 'Невдала спроба входу',
                email,
                method: request.method,
                url: request.url,
                timestamp: new Date()
              });
            console.log('Неправильна пошта або пароль')
            return new NextResponse(JSON.stringify({ message: 'Неправильна пошта або пароль' }), {
        status: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, DELETE, PATCH, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
         });
        }
        const token = jwt.sign(
            { 
                id: user.id 
            }, 

            process.env.JWT_SECRET_KEY, 

            {
                expiresIn: '1h',
            }
        );
      
      const response = new NextResponse(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
          const res =  NextResponse.json({ success: true });
          res.cookies.set('authToken', token, { httpOnly: true, maxAge: 3600, path: '/',});
              await logToBetterStack({
                level: 'info',
                message: 'Користувач успішно залогінився',
                id: user.id ,
                method: request.method,
                url: request.url,
                email,
                timestamp: new Date()
              });
          console.log(token)
          return res;

    } catch(error) {
        await logToBetterStack({
            level: 'error',
            message: 'Помилка при спробі увійти в свій аккаунт',
            method: request.method,
            url: request.url,
            timestamp: new Date()
          });
        console.log(error)
       return new NextResponse(JSON.stringify({ message: 'Помилка сервера' }), {
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
    }
}

export async function DELETE(request) {
    const response = NextResponse.redirect(new URL('/', request.url))
    response.cookies.delete('authToken')
    return response
}

export async function GET(request) {
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
        const { password, ...safeUser } = user.toJSON()
        return NextResponse.json(safeUser);
    } catch(error){
        console.log("Користувач не авторизований")
        return NextResponse.json({error: error.message}, {status: 500})
    }
}

export async function PATCH(request) {
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

        const {login, lastpass, futurepass} = await request.json()
        if (lastpass && futurepass){
            const isPassCorrect = await bcrypt.compare(lastpass, user.password)
            if(!isPassCorrect){
                return NextResponse.json({message: 'Неправильно введено старий пароль'}, {status: 400})
            }

            const hashpass = await bcrypt.hash(futurepass, 10)
            user.password = hashpass
        }

        if(login){
            user.login = login
        }

        await user.save()
        const {password, ...safeUser} = user.toJSON()
        return NextResponse.json({message: 'Профіль успішно оновлено', user: safeUser})
    } catch(error){
        console.log(error)
        return NextResponse.json({error: error.message}, {status: 500})
    }

}