import { NextResponse } from "next/server";
import User from "../../../../models/user"
import bcrypt from 'bcryptjs'

//register request
export async function POST(request) {
    const emailMatch = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    try{
        const body = await request.json();

        const {login, email, password, password_repeat} = body
        if(!login || !email || !password || !password_repeat){
            console.log('Не всі поля заповнені')
            return NextResponse.json('Не всі поля заповнені', {status: 400})
        }
        if(password !== password_repeat){
            console.log('Паролі не збігаються')
            return NextResponse.json('Паролі не збігаються', {status: 400})

        }
        if (!emailMatch.test(email)) {
            console.log('Неправильний формат електронної пошти')
            return NextResponse.json(
                { message: "Неправильний формат електронної пошти", user: error},
                { status: 400 }
              );        
            }
        const hashed = await bcrypt.hash(password, 10)

        const addUser = await User.create({
            login: login,
            email: email,
            password: hashed
        });

        console.log('Користувач успішно зареєструвався')
        return NextResponse.json(
            { message: "Користувач успішно зареєструвався", user: addUser },
            { status: 201 }
          );
        

    } catch(error) {
        console.error("Не вдалося виконати реєстрацію користувача:", error)
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


