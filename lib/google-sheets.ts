import { google } from 'googleapis';

export interface SpreadsheetContent {
  rowIndex: number;
  scheduledDate?: Date;
  text?: string;
  imageUrl?: string;
}

export async function getGoogleSheetsClient(accessToken: string) {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });
  
  return google.sheets({ version: 'v4', auth });
}

export async function readSpreadsheetContent(
  spreadsheetId: string,
  range: string = 'A:D',
  accessToken: string
): Promise<SpreadsheetContent[]> {
  try {
    const sheets = await getGoogleSheetsClient(accessToken);
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values || [];
    const content: SpreadsheetContent[] = [];

    // Skip header row, assuming first row contains headers
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const [dateStr, text, imageUrl] = row;
      
      let scheduledDate: Date | undefined;
      if (dateStr) {
        try {
          scheduledDate = new Date(dateStr);
        } catch (error) {
          console.warn(`Invalid date format in row ${i + 1}: ${dateStr}`);
        }
      }

      if (text || imageUrl) {
        content.push({
          rowIndex: i + 1,
          scheduledDate,
          text: text || undefined,
          imageUrl: imageUrl || undefined,
        });
      }
    }

    return content;
  } catch (err) {
    console.error('Error reading spreadsheet:', err);
    throw new Error('Failed to read spreadsheet content');
  }
}

export async function getSpreadsheetMetadata(
  spreadsheetId: string,
  accessToken: string
) {
  try {
    const sheets = await getGoogleSheetsClient(accessToken);
    
    const response = await sheets.spreadsheets.get({
      spreadsheetId,
    });

    return {
      title: response.data.properties?.title || 'Untitled Spreadsheet',
      url: `https://docs.google.com/spreadsheets/d/${spreadsheetId}`,
      sheets: response.data.sheets?.map(sheet => ({
        title: sheet.properties?.title || 'Untitled Sheet',
        sheetId: sheet.properties?.sheetId,
      })) || [],
    };
  } catch (err) {
    console.error('Error getting spreadsheet metadata:', err);
    throw new Error('Failed to get spreadsheet information');
  }
}