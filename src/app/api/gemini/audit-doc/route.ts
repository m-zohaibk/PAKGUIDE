import { NextRequest, NextResponse } from 'next/server';
import { auditDocumentWithVision } from '@/lib/gemini/client';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { imageBase64, mimeType = 'image/jpeg', apiKey } = body;

    if (!imageBase64) {
      return NextResponse.json({ error: 'Image data is required' }, { status: 400 });
    }

    const auditResult = await auditDocumentWithVision(imageBase64, mimeType, apiKey);
    return NextResponse.json(auditResult);
  } catch (error: any) {
    console.error('Doc Audit API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
