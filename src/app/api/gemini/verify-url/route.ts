import { NextRequest, NextResponse } from 'next/server';
import { analyzePhishingUrlWithAI } from '@/lib/gemini/client';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url, apiKey } = body;

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const result = await analyzePhishingUrlWithAI(url, apiKey);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Verify URL API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
