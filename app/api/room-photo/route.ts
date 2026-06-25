import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

// File-system based room photo storage.
// Photos are saved to public/uploads/ as named files (e.g. family-suite-admin.jpg).
// This is zero-dependency, works on local dev without any Prisma schema changes,
// and the photos are served as static files by Next.js.

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');
const PHOTOS_JSON = path.join(process.cwd(), 'public', 'uploads', 'room-photos.json');

async function ensureUploadDir() {
  if (!existsSync(UPLOAD_DIR)) {
    await mkdir(UPLOAD_DIR, { recursive: true });
  }
}

async function readPhotosMap(): Promise<Record<string, string>> {
  try {
    if (existsSync(PHOTOS_JSON)) {
      const raw = await readFile(PHOTOS_JSON, 'utf-8');
      return JSON.parse(raw);
    }
  } catch {}
  return {};
}

async function writePhotosMap(map: Record<string, string>) {
  await writeFile(PHOTOS_JSON, JSON.stringify(map, null, 2), 'utf-8');
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const roomId = formData.get('roomId') as string | null;

    if (!file || !roomId) {
      return NextResponse.json({ success: false, error: 'Missing file or roomId' }, { status: 400 });
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ success: false, error: 'File must be an image' }, { status: 400 });
    }

    await ensureUploadDir();

    // Determine extension from MIME type
    const ext = file.type.split('/')[1]?.replace('jpeg', 'jpg') || 'jpg';
    const filename = `${roomId}-admin.${ext}`;
    const filepath = path.join(UPLOAD_DIR, filename);

    // Write file to disk
    const bytes = await file.arrayBuffer();
    await writeFile(filepath, Buffer.from(bytes));

    // Store the public URL in our photos map
    const publicUrl = `/uploads/${filename}?v=${Date.now()}`;
    const photosMap = await readPhotosMap();
    photosMap[roomId] = publicUrl;
    await writePhotosMap(photosMap);

    console.log(`📷 Room photo saved to disk: ${filepath}`);
    return NextResponse.json({ success: true, dataUrl: publicUrl });

  } catch (err: any) {
    console.error('❌ Room photo upload error:', err?.message || err);
    return NextResponse.json({ success: false, error: 'Upload failed. ' + (err?.message || 'Server error.') }, { status: 500 });
  }
}

export async function GET() {
  try {
    const photos = await readPhotosMap();
    return NextResponse.json({ success: true, photos });
  } catch {
    return NextResponse.json({ success: true, photos: {} });
  }
}
