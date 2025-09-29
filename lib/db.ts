import fs from 'fs/promises';
import path from 'path';

// Simple file-based database for development
const DB_PATH = path.join(process.cwd(), 'data');

export interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
  createdAt: string;
}

export interface Spreadsheet {
  id: string;
  userId: string;
  spreadsheetId: string;
  name: string;
  url: string;
  createdAt: string;
}

export interface Content {
  id: string;
  spreadsheetId: string;
  rowIndex: number;
  text?: string;
  imageUrl?: string;
  scheduledDate?: string;
  status: 'PENDING' | 'SCHEDULED' | 'POSTED' | 'ERROR';
  createdAt: string;
}

export interface SnsAccount {
  id: string;
  userId: string;
  platform: 'TWITTER' | 'INSTAGRAM' | 'FACEBOOK';
  accountId: string;
  accountName: string;
  accessToken: string;
  refreshToken?: string;
  expiresAt?: string;
  createdAt: string;
}

async function ensureDataDir() {
  try {
    await fs.access(DB_PATH);
  } catch {
    await fs.mkdir(DB_PATH, { recursive: true });
  }
}

async function readJsonFile<T>(filename: string): Promise<T[]> {
  try {
    const filePath = path.join(DB_PATH, filename);
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeJsonFile<T>(filename: string, data: T[]): Promise<void> {
  await ensureDataDir();
  const filePath = path.join(DB_PATH, filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

// User operations
export async function createUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
  const users = await readJsonFile<User>('users.json');
  const user: User = {
    id: crypto.randomUUID(),
    ...userData,
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  await writeJsonFile('users.json', users);
  return user;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const users = await readJsonFile<User>('users.json');
  return users.find(user => user.email === email) || null;
}

export async function getUserById(id: string): Promise<User | null> {
  const users = await readJsonFile<User>('users.json');
  return users.find(user => user.id === id) || null;
}

// Spreadsheet operations
export async function createSpreadsheet(spreadsheetData: Omit<Spreadsheet, 'id' | 'createdAt'>): Promise<Spreadsheet> {
  const spreadsheets = await readJsonFile<Spreadsheet>('spreadsheets.json');
  const spreadsheet: Spreadsheet = {
    id: crypto.randomUUID(),
    ...spreadsheetData,
    createdAt: new Date().toISOString(),
  };
  spreadsheets.push(spreadsheet);
  await writeJsonFile('spreadsheets.json', spreadsheets);
  return spreadsheet;
}

export async function getSpreadsheetsByUserId(userId: string): Promise<Spreadsheet[]> {
  const spreadsheets = await readJsonFile<Spreadsheet>('spreadsheets.json');
  return spreadsheets.filter(s => s.userId === userId);
}

// Content operations
export async function createContent(contentData: Omit<Content, 'id' | 'createdAt'>): Promise<Content> {
  const contents = await readJsonFile<Content>('contents.json');
  const content: Content = {
    id: crypto.randomUUID(),
    ...contentData,
    createdAt: new Date().toISOString(),
  };
  contents.push(content);
  await writeJsonFile('contents.json', contents);
  return content;
}

export async function getContentBySpreadsheetId(spreadsheetId: string): Promise<Content[]> {
  const contents = await readJsonFile<Content>('contents.json');
  return contents.filter(c => c.spreadsheetId === spreadsheetId);
}

export async function updateContentStatus(contentId: string, status: Content['status']): Promise<void> {
  const contents = await readJsonFile<Content>('contents.json');
  const index = contents.findIndex(c => c.id === contentId);
  if (index !== -1) {
    contents[index].status = status;
    await writeJsonFile('contents.json', contents);
  }
}

// SNS Account operations
export async function createSnsAccount(accountData: Omit<SnsAccount, 'id' | 'createdAt'>): Promise<SnsAccount> {
  const accounts = await readJsonFile<SnsAccount>('sns-accounts.json');
  const account: SnsAccount = {
    id: crypto.randomUUID(),
    ...accountData,
    createdAt: new Date().toISOString(),
  };
  accounts.push(account);
  await writeJsonFile('sns-accounts.json', accounts);
  return account;
}

export async function getSnsAccountsByUserId(userId: string): Promise<SnsAccount[]> {
  const accounts = await readJsonFile<SnsAccount>('sns-accounts.json');
  return accounts.filter(a => a.userId === userId);
}