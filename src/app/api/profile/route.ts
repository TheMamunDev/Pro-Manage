import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { z } from 'zod';
import { authOptions } from '@/app/lib/auth';
import connectDB from '@/app/lib/db';
import User from '@/app/models/User';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  image: z.string().url().optional().or(z.literal('')),
});

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const validation = profileSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    await connectDB();

    const updatedUser = await User.findByIdAndUpdate(
      session.user.id,
      {
        name: validation.data.name,
        image: validation.data.image,
      },
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
