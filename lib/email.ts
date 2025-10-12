import nodemailer from 'nodemailer';

// Type definitions
interface EnquiryData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ApplicationData {
  name: string;
  email: string;
  phone: string;
  program: string;
  qualification: string;
  address?: string;
  dob?: string;
  gender?: string;
  father_name?: string;
  mother_name?: string;
  guardian_phone?: string;
}

// Email configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || 'your-email@gmail.com',
    pass: process.env.SMTP_PASS || 'your-app-password'
  }
});

export const sendEnquiryNotification = async (enquiry: EnquiryData) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_USER || 'your-email@gmail.com',
      to: process.env.ADMIN_EMAIL || 'admin@college.com',
      subject: `New Enquiry: ${enquiry.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Enquiry Received</h2>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${enquiry.name}</p>
            <p><strong>Email:</strong> ${enquiry.email}</p>
            <p><strong>Subject:</strong> ${enquiry.subject}</p>
            <p><strong>Submitted At:</strong> ${new Date().toLocaleString('en-IN')}</p>
          </div>
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h3 style="color: #374151; margin-top: 0;">Message</h3>
            <p style="line-height: 1.6; color: #4b5563;">${enquiry.message}</p>
          </div>
          <div style="margin-top: 20px; padding: 15px; background-color: #fef3c7; border-radius: 8px;">
            <p style="margin: 0; color: #92400e; font-size: 14px;">
              Please respond to this enquiry within 24 hours for better customer service.
            </p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Enquiry notification email sent successfully');
    return true;
  } catch (error) {
    console.error('❌ Error sending enquiry notification:', error);
    return false;
  }
};

export const sendApplicationNotification = async (application: ApplicationData) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_USER || 'your-email@gmail.com',
      to: process.env.ADMIN_EMAIL || 'admin@college.com',
      subject: `New Application: ${application.program} - ${application.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Application Received</h2>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Applicant Details</h3>
            <p><strong>Name:</strong> ${application.name}</p>
            <p><strong>Email:</strong> ${application.email}</p>
            <p><strong>Phone:</strong> ${application.phone}</p>
            <p><strong>Program:</strong> ${application.program}</p>
            <p><strong>Qualification:</strong> ${application.qualification}</p>
            <p><strong>Submitted At:</strong> ${new Date().toLocaleString('en-IN')}</p>
          </div>
          ${application.address ? `
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Additional Information</h3>
            <p><strong>Address:</strong> ${application.address}</p>
            ${application.dob ? `<p><strong>Date of Birth:</strong> ${application.dob}</p>` : ''}
            ${application.gender ? `<p><strong>Gender:</strong> ${application.gender}</p>` : ''}
            ${application.father_name ? `<p><strong>Father's Name:</strong> ${application.father_name}</p>` : ''}
            ${application.mother_name ? `<p><strong>Mother's Name:</strong> ${application.mother_name}</p>` : ''}
            ${application.guardian_phone ? `<p><strong>Guardian's Phone:</strong> ${application.guardian_phone}</p>` : ''}
          </div>
          ` : ''}
          <div style="margin-top: 20px; padding: 15px; background-color: #d1fae5; border-radius: 8px;">
            <p style="margin: 0; color: #065f46; font-size: 14px;">
              Please review this application and contact the applicant for further processing.
            </p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Application notification email sent successfully');
    return true;
  } catch (error) {
    console.error('❌ Error sending application notification:', error);
    return false;
  }
};

export const sendConfirmationEmail = async (email: string, type: 'enquiry' | 'application', data: EnquiryData | ApplicationData) => {
  try {
    const isEnquiry = type === 'enquiry';
    const enquiryData = isEnquiry ? data as EnquiryData : null;
    const applicationData = !isEnquiry ? data as ApplicationData : null;
    
    const mailOptions = {
      from: process.env.SMTP_USER || 'your-email@gmail.com',
      to: email,
      subject: `Thank you for your ${isEnquiry ? 'enquiry' : 'application'} - Uday Pratap College`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2563eb;">Uday Pratap College</h1>
          </div>
          
          <h2 style="color: #374151;">Thank you for your ${isEnquiry ? 'enquiry' : 'application'}!</h2>
          
          <p style="color: #4b5563; line-height: 1.6;">
            Dear ${data.name},
          </p>
          
          <p style="color: #4b5563; line-height: 1.6;">
            We have received your ${isEnquiry ? 'enquiry' : 'application'} and thank you for your interest in Uday Pratap College. 
            ${isEnquiry ? 'Our team will review your enquiry and get back to you within 24-48 hours.' : 'We will review your application and contact you soon with further details.'}
          </p>
          
          ${isEnquiry ? `
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Your Enquiry Details</h3>
            <p><strong>Subject:</strong> ${enquiryData?.subject}</p>
            <p><strong>Message:</strong> ${enquiryData?.message}</p>
          </div>
          ` : `
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Your Application Details</h3>
            <p><strong>Program:</strong> ${applicationData?.program}</p>
            <p><strong>Qualification:</strong> ${applicationData?.qualification}</p>
            <p><strong>Phone:</strong> ${applicationData?.phone}</p>
          </div>
          `}
          
          <p style="color: #4b5563; line-height: 1.6;">
            If you have any questions or need immediate assistance, please don't hesitate to contact us:
          </p>
          
          <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #92400e; font-size: 14px;">
              <strong>Contact Information:</strong><br>
              Email: info@udaypratapcollege.com<br>
              Phone: +91-XXXXXXXXXX<br>
              Address: Uday Pratap College, [College Address]
            </p>
          </div>
          
          <p style="color: #4b5563; line-height: 1.6;">
            Best regards,<br>
            <strong>Uday Pratap College Team</strong>
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Confirmation email sent to ${email}`);
    return true;
  } catch (error) {
    console.error('❌ Error sending confirmation email:', error);
    return false;
  }
};
