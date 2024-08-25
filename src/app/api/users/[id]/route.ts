import { NextRequest, NextResponse } from 'next/server';
import prismadb from '@/prisma/prisma'

export async function GET(request: NextRequest, context: { params: { id: string } }) {
  const id = context.params.id;
  console.log('id', id)
  const user = await prismadb.user.findUnique({
    where: {
      id,
    },
  })

  console.log('user', user)

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  return NextResponse.json(
    {
      data: user,
    },
    { status: 200 }
  );
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...editedUser } = body;

    // Ensure the id is provided
    if (!id) {
      return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
    }

    const updatedUser = await prismadb.user.update({
      where: {
        id: id,
      },
      data: editedUser,
    });

    return NextResponse.json({ data: updatedUser }, { status: 200 });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ message: 'Failed to update user' }, { status: 500 });
  }
}
