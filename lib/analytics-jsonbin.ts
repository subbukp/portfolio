// Alternative analytics storage using JSONBin.io for Vercel deployment
// Sign up at https://jsonbin.io to get your API key

import { VisitorLog } from './analytics';

const JSONBIN_API_KEY = process.env.JSONBIN_API_KEY || '';
const JSONBIN_BIN_ID = process.env.JSONBIN_BIN_ID || '';
const JSONBIN_BASE_URL = 'https://api.jsonbin.io/v3';

export async function readLogsFromJSONBin(): Promise<VisitorLog[]> {
  if (!JSONBIN_API_KEY || !JSONBIN_BIN_ID) {
    console.error('JSONBin credentials not configured');
    return [];
  }

  try {
    const response = await fetch(`${JSONBIN_BASE_URL}/b/${JSONBIN_BIN_ID}/latest`, {
      headers: {
        'X-Master-Key': JSONBIN_API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`JSONBin API error: ${response.status}`);
    }

    const data = await response.json();
    return data.record || [];
  } catch (error) {
    console.error('Error reading from JSONBin:', error);
    return [];
  }
}

export async function writeLogsToJSONBin(logs: VisitorLog[]): Promise<void> {
  if (!JSONBIN_API_KEY || !JSONBIN_BIN_ID) {
    console.error('JSONBin credentials not configured');
    return;
  }

  try {
    const response = await fetch(`${JSONBIN_BASE_URL}/b/${JSONBIN_BIN_ID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': JSONBIN_API_KEY,
      },
      body: JSON.stringify(logs),
    });

    if (!response.ok) {
      throw new Error(`JSONBin API error: ${response.status}`);
    }
  } catch (error) {
    console.error('Error writing to JSONBin:', error);
  }
}

// Instructions:
// 1. Sign up at https://jsonbin.io
// 2. Create a new bin with an empty array: []
// 3. Copy your API key and Bin ID
// 4. Add to your Vercel environment variables:
//    - JSONBIN_API_KEY=your-api-key
//    - JSONBIN_BIN_ID=your-bin-id