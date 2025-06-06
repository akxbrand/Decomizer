import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phoneNumber, password, role = 'client' } = body;

    // Validate required fields
    if (!name || !email || !phoneNumber || !password) {
      return NextResponse.json(
        { 
          success: false,
          message: 'Please provide all required fields'
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { 
          success: false,
          message: 'Please provide a valid email address'
        },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 8) {
      return NextResponse.json(
        { 
          success: false,
          message: 'Password must be at least 8 characters long'
        },
        { status: 400 }
      );
    }

    // Validate phone number format (10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return NextResponse.json(
        { 
          success: false,
          message: 'Please enter a valid 10-digit phone number'
        },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
           email 
      }
    });

    if (existingUser) {
      return NextResponse.json(
        { 
          success: false,
          message: 'An account with this email already exists'
        },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phoneNumber,
        password: hashedPassword,
        role
      }
    });

    // Create notification for admin
    await prisma.adminNotification.create({
      data: {
        type: 'new_user',
        title: 'New User Registration',
        message: `${name} has registered with email ${email}`,
        isRead: false,
        metadata: {
          userId: user.id,
          email: user.email,
          phoneNumber: user.phoneNumber
        }
      }
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      { 
        success: true,
        user: userWithoutPassword 
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { 
        success: false,
        message: 'An error occurred during registration. Please try again.'
      },
      { status: 500 }
    );
  }
}