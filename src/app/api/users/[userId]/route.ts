import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import connectDB from '@/app/lib/db';
import User from '@/app/models/User';

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    if (session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Permission denied' }, { status: 403 });
    }

    const body = await req.json();
    const { role } = body;
    if (userId === session.user.id && role !== 'admin') {
      return NextResponse.json(
        { error: 'You cannot demote yourself' },
        { status: 400 }
      );
    }

    await connectDB();

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    ).select('-password');

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
