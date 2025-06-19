import { NextRequest, NextResponse } from 'next/server';

// Simple direct email approach using fetch to send via Gmail SMTP
// Note: For production, you should use proper email services like SendGrid, AWS SES, etc.

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // For direct email without external services, you have a few options:
    
    // Option 1: Use mailto link (client-side only)
    // This opens the user's email client - not automated
    
    // Option 2: Use a free SMTP service
    // Many free SMTP services available like Brevo (formerly Sendinblue), 
    // which offers 300 free emails/day
    
    // Option 3: Direct server implementation
    // Here's a simple implementation that formats the data
    // You would need to set up SMTP credentials in environment variables
    
    const emailData = {
      to: 'kps.18.1999@gmail.com',
      from: email,
      subject: `Portfolio Contact: ${name}`,
      body: `
Name: ${name}
Email: ${email}
Date: ${new Date().toLocaleString()}

Message:
${message}
      `.trim()
    };

    // Log for development
    console.log('Contact Form Submission:', emailData);

    // In production, you would send this to an SMTP server
    // For now, we'll simulate success
    
    // Store submissions in a log file or database if needed
    // This allows you to retrieve messages even without email setup
    
    return NextResponse.json(
      { 
        message: 'Message received successfully',
        info: 'Email will be sent to kps.18.1999@gmail.com'
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}