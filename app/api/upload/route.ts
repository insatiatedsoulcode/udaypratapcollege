import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    
    if (!files || files.length === 0) {
      return NextResponse.json(
        { success: false, message: 'No files provided' },
        { status: 400 }
      );
    }

    const uploadedFiles = [];
    
    for (const file of files) {
      // Validate file type
      const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      
      if (!allowedTypes.includes(file.type)) {
        continue; // Skip invalid file types
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        continue; // Skip oversized files
      }

      // Generate unique filename
      const timestamp = Date.now();
      const extension = path.extname(file.name);
      const filename = `${timestamp}-${Math.random().toString(36).substring(7)}${extension}`;
      const filePath = path.join(uploadsDir, filename);
      
      // Convert file to buffer and save
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      fs.writeFileSync(filePath, buffer);
      
      uploadedFiles.push({
        originalName: file.name,
        filename: filename,
        size: file.size,
        mimetype: file.type,
        url: `/uploads/${filename}`
      });
    }
    
    return NextResponse.json({
      success: true,
      message: 'Files uploaded successfully',
      files: uploadedFiles
    });
    
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, message: 'File upload failed' },
      { status: 500 }
    );
  }
}
