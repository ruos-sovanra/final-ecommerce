import {cookies} from "next/headers";
import {NextResponse} from "next/server";
import {serialize} from "cookie";

export async function POST(){
    const cookieStore = cookies();
    const cookieName = process.env.COOKIE_REFRESH_TOKEN_NAME || "refresh";
    const credential = cookieStore.get(cookieName);

    if(!credential){
        return NextResponse.json({
            message: "Token not found"
        },{
            status: 404
        })
    }

    const refreshToken = credential.value;

    console.log("Log from Refresh Route",refreshToken)

    const response = await fetch(`${process.env.BASE_URL}/auth/refresh`,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({refreshToken: refreshToken})
    })

    if (!response.ok){
        return NextResponse.json({
            message: "Failed to refresh access token"
        },{
            status: response.status
        })
    }


    const data = await response.json();
    const refresh= data?.payload?.refreshToken || null;
    const access= data?.payload?.accessToken || null;

    console.log("Log from Refresh Route",data)


    const serialized = serialize(cookieName, refresh, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax"
    });

    return NextResponse.json({
        accessToken: access
    },{
        headers: {
            "Set-Cookie": serialized
        }
    })
}