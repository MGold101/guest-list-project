import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

async function forwardAdminRequest(request, method) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('adminSession')?.value;

    if (!token) {
      return NextResponse.json(
        {
          message: 'Authentication is required.',
        },
        {
          status: 401,
        }
      );
    }

    const options = {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    };

    if (method !== 'GET') {
      const body = await request.json();

      options.headers['Content-Type'] = 'application/json';
      options.body = JSON.stringify(body);
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/guests`,
      options
    );

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error(`Admin ${method} guests route failed:`, error);

    return NextResponse.json(
      {
        message: 'An unexpected error occurred.',
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET(request) {
  return forwardAdminRequest(request, 'GET');
}

export async function POST(request) {
  return forwardAdminRequest(request, 'POST');
}

export async function PUT(request) {
  return forwardAdminRequest(request, 'PUT');
}

export async function DELETE(request) {
  return forwardAdminRequest(request, 'DELETE');
}