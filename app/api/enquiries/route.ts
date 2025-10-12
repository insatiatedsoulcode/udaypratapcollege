import { NextRequest, NextResponse } from 'next/server';
import { addEnquiry, getEnquiries } from '../../../lib/database';
import { sendEnquiryNotification, sendConfirmationEmail } from '../../../lib/email';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.name || !data.email || !data.subject || !data.message) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
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
    
    // Save to database
    const result = addEnquiry(data);
    
    // Send notifications (don't wait for them)
    Promise.all([
      sendEnquiryNotification(data),
      sendConfirmationEmail(data.email, 'enquiry', data)
    ]).catch(error => {
      console.error('Email notification error:', error);
    });
    
    return NextResponse.json({
      success: true,
      message: 'Enquiry submitted successfully!',
      data: { id: result.lastInsertRowid, ...data }
    });
  } catch (error) {
    console.error('Error saving enquiry:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit enquiry' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const enquiries = getEnquiries();
    return NextResponse.json({
      success: true,
      data: enquiries
    });
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch enquiries' },
      { status: 500 }
    );
  }
}
