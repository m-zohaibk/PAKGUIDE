import { NextRequest, NextResponse } from 'next/server';
import { calculateDemographicEligibility } from '@/lib/gemini/client';
import { DemographicProfile } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { profile, apiKey } = body as { profile: DemographicProfile; apiKey?: string };

    if (!profile) {
      return NextResponse.json({ error: 'Profile data is required' }, { status: 400 });
    }

    const schemes = await calculateDemographicEligibility(profile, apiKey);
    return NextResponse.json({ schemes });
  } catch (error: any) {
    console.error('Benefit Matcher API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
