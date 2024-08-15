import {NextRequest, NextResponse} from "next/server";


export async function POST(req: NextRequest){
    const body = await req.json();
    console.log(body);
    const {email, password,confirm_password,userName} = body;

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password,confirm_password,userName})
    })

    if (!response.ok){
        return NextResponse.json({
                message: "Fail to register"
            },
            {
                status: response.status
            })
    }

    return NextResponse.json({
            message: "Register success"
        },
        {
            status: 200
        })

}
