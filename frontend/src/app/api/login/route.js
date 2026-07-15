import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const credentials = await request.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
        cache: 'no-store',
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          message: data.message || 'Failed to log in.',
        },
        {
          status: response.status,
        }
      );
    }

    if (!data.token) {
      console.error('Login response did not include a token');

      return NextResponse.json(
        {
          message: 'The login session could not be created.',
        },
        {
          status: 500,
        }
      );
    }

    const result = NextResponse.json({
      message: data.message,
    });

    result.cookies.set('adminSession', data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 2,
    });

    return result;
  } catch (error) {
    console.error('Login route error:', error);

    return NextResponse.json(
      {
        message: 'An unexpected error occurred while logging in.',
      },
      {
        status: 500,
      }
    );
  }
}