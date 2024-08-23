import { NextRequest, NextResponse } from 'next/server';
import prismadb from '../../../../../prisma/prisma'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, username, phone, website } = body
        const result = await prismadb.user.create({
            data: {
                name,
                email,
                username,
                phone,
                website
            },
        })

        return NextResponse.json(
            {
                data: body,
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: 'Error processing request', error },
            { status: 500 }
        );
    }
}
