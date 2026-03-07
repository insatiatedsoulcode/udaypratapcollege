import { NextResponse } from 'next/server';

// Basic email regex for backend validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            name, email, phone, subject, message,
            program, dob, gender, fatherName, motherName, address,
            prevQualification, prevInstitute, prevPercentage, entranceScore
        } = body;

        // 1. Validation
        if (!name || !email) {
            return NextResponse.json(
                { success: false, message: 'Please provide all required basic fields (Name, Email).' },
                { status: 400 }
            );
        }

        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { success: false, message: 'Please provide a valid email address.' },
                { status: 400 }
            );
        }

        // 2. Sanitization (Basic trimming to prevent massive payload spam)
        const sanitizedData = {
            name: name.trim().substring(0, 100),
            email: email.trim().toLowerCase(),
            phone: phone ? phone.trim().substring(0, 20) : '',
            subject: subject ? subject.trim().substring(0, 200) : 'General Inquiry',
            message: message ? message.trim().substring(0, 2000) : '',
            program: program ? program.trim().substring(0, 100) : '',
            dob: dob ? dob.trim().substring(0, 20) : '',
            gender: gender ? gender.trim().substring(0, 20) : '',
            fatherName: fatherName ? fatherName.trim().substring(0, 100) : '',
            motherName: motherName ? motherName.trim().substring(0, 100) : '',
            address: address ? address.trim().substring(0, 500) : '',
            prevQualification: prevQualification ? prevQualification.trim().substring(0, 100) : '',
            prevInstitute: prevInstitute ? prevInstitute.trim().substring(0, 200) : '',
            prevPercentage: prevPercentage ? prevPercentage.trim().substring(0, 10) : '',
            entranceScore: entranceScore ? entranceScore.trim().substring(0, 20) : ''
        };

        // 3. Forward to Google Sheets Webhook
        const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;

        if (!webhookUrl) {
            throw new Error('Google Sheets Webhook URL is not configured.');
        }

        const response = await fetch(webhookUrl, {
            method: 'POST',
            // Google Apps Script requires text/plain to parse postData.contents properly sometimes,
            // but application/json usually works if sending stringified body.
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sanitizedData),
        });

        const data = await response.json();

        if (data.status !== 'success') {
            throw new Error(data.message || 'Failed to save to Google Sheets.');
        }

        return NextResponse.json(
            { success: true, message: 'Inquiry submitted successfully.' },
            { status: 201 }
        );
    } catch (error: unknown) {
        console.error('Error submitting inquiry to Google Sheets:', error);

        return NextResponse.json(
            { success: false, message: 'Server error. Please try again later.' },
            { status: 500 }
        );
    }
}
