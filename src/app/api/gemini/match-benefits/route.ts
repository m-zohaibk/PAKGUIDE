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

    const numericFields = [profile.age, profile.monthlyIncome, profile.landOwnershipAcres, profile.householdMembers];
    if (
      numericFields.some((value) => typeof value !== 'number' || !Number.isFinite(value) || value < 0) ||
      profile.age < 1 || profile.age > 120 ||
      profile.householdMembers < 1 ||
      typeof profile.district !== 'string' || !profile.district.trim()
    ) {
      return NextResponse.json({ error: 'Please provide valid age, income, land, household, and district values.' }, { status: 400 });
    }

    const schemes = await calculateDemographicEligibility(profile, apiKey);
    return NextResponse.json({ schemes });
  } catch (error: any) {
    console.error('Benefit Matcher API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
