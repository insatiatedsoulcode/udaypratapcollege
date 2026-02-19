import { NextRequest, NextResponse } from 'next/server';
import { addApplication, getApplications } from '@/lib/database';
import { sendApplicationNotification, sendConfirmationEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.phone || !data.program || !data.qualification) {
      return NextResponse.json(
        { success: false, message: 'Required fields are missing' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate phone format (basic validation)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(data.phone.replace(/\D/g, ''))) {
      return NextResponse.json(
        { success: false, message: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    // Save to database
    const result = await addApplication(data);

    // Send notifications (don't wait for them)
    Promise.all([
      sendApplicationNotification(data),
      sendConfirmationEmail(data.email, 'application', data)
    ]).catch(error => {
      console.error('Email notification error:', error);
    });

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully!',
      data: { id: result.lastInsertRowid, ...data }
    });
  } catch (error) {
    console.error('Error saving application:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit application', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const applications = await getApplications();
    return NextResponse.json({
      success: true,
      data: applications
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}
