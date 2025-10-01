import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { createSpreadsheet, getSpreadsheetsByUserId, createUser, getUserByEmail } from '@/lib/db';
import { getSpreadsheetMetadata } from '@/lib/google-sheets';

export async function GET() {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get or create user
    let user = await getUserByEmail(session.user.email);
    if (!user) {
      user = await createUser({
        email: session.user.email,
        name: session.user.name || undefined,
        image: session.user.image || undefined,
      });
    }

    const spreadsheets = await getSpreadsheetsByUserId(user.id);
    return NextResponse.json(spreadsheets);
  } catch (error) {
    console.error('Error fetching spreadsheets:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get or create user
    let user = await getUserByEmail(session.user.email);
    if (!user) {
      user = await createUser({
        email: session.user.email,
        name: session.user.name || undefined,
        image: session.user.image || undefined,
      });
    }

    const body = await request.json();
    const { spreadsheetId } = body;

    if (!spreadsheetId) {
      return NextResponse.json({ error: 'Spreadsheet ID is required' }, { status: 400 });
    }

    // Retrieve access token from session
    const accessToken = session.accessToken;
    if (!accessToken) {
      return NextResponse.json({ error: 'No access token found. Please re-authenticate.' }, { status: 401 });
    }
    
    try {
      const metadata = await getSpreadsheetMetadata(spreadsheetId, accessToken);
      
      const spreadsheet = await createSpreadsheet({
        userId: user.id,
        spreadsheetId,
        name: metadata.title,
        url: metadata.url,
      });

      return NextResponse.json(spreadsheet);
    } catch (error) {
      console.error('Error accessing spreadsheet:', error);
      return NextResponse.json({ 
        error: 'Unable to access spreadsheet. Please check the ID and permissions.' 
      }, { status: 400 });
    }
  } catch (error) {
    console.error('Error creating spreadsheet:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}