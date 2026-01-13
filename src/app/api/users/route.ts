import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import connectDB from '@/app/lib/db';
import User from '@/app/models/User';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const users = await User.find({})
      .select('-password')
      .sort({ createdAt: -1 });

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
