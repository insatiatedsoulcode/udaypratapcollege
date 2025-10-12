import { NextRequest, NextResponse } from 'next/server';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest) {
  try {
    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const form = formidable({
      uploadDir: uploadsDir,
      keepExtensions: true,
      maxFileSize: 5 * 1024 * 1024, // 5MB limit
      filter: ({ mimetype }) => {
        // Allow only specific file types
        const allowedTypes = [
          'image/jpeg',
          'image/png',
          'image/gif',
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];
        return allowedTypes.includes(mimetype || '');
      }
    });

    const [fields, files] = await form.parse(await request.formData());
    
    const uploadedFiles = [];
    
    if (files.files) {
      const fileArray = Array.isArray(files.files) ? files.files : [files.files];
      
      for (const file of fileArray) {
        if (file.filepath) {
          // Generate unique filename
          const timestamp = Date.now();
          const extension = path.extname(file.originalFilename || '');
          const filename = `${timestamp}-${Math.random().toString(36).substring(7)}${extension}`;
          const newPath = path.join(uploadsDir, filename);
          
          // Move file to final location
          fs.renameSync(file.filepath, newPath);
          
          uploadedFiles.push({
            originalName: file.originalFilename,
            filename: filename,
            size: file.size,
            mimetype: file.mimetype,
            url: `/uploads/${filename}`
          });
        }
      }
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
