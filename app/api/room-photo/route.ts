import { NextRequest, NextResponse } from 'next/server';

// Serverless-compatible room photo storage using kvdb.io cloud store.
// Photos are stored as base64 data URLs under the key "room-photos".
// This works on Vercel and any read-only filesystem environment.

const KVDB_BUCKET = 'K9mU6x2nBqZy7s3d8vReWp';
const KVDB_KEY = 'room-photos';
const KVDB_URL = `https://kvdb.io/${KVDB_BUCKET}/${KVDB_KEY}`;

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

    // Limit file size to 800KB to keep base64 within kvdb limits (~1MB)
    if (file.size > 800 * 1024) {
      return NextResponse.json({ success: false, error: 'Image too large. Please use an image under 800KB.' }, { status: 400 });
    }

    // Convert to base64 data URL
    const buffer = await file.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    const dataUrl = `data:${file.type};base64,${base64}`;

    // Load existing photos map from kvdb
    let photosMap: Record<string, string> = {};
    try {
      const getRes = await fetch(KVDB_URL, { cache: 'no-store' });
      if (getRes.ok) {
        const data = await getRes.json();
        if (data && typeof data === 'object' && !Array.isArray(data)) {
          photosMap = data;
        }
      }
    } catch {}

    // Update this room's photo
    photosMap[roomId] = dataUrl;

    // Save back to kvdb
    const putRes = await fetch(KVDB_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(photosMap),
    });

    if (!putRes.ok) {
      throw new Error('Failed to save photo to cloud store');
    }

    console.log(`📷 Room photo saved to cloud for room: ${roomId}`);
    return NextResponse.json({ success: true, dataUrl });

  } catch (err: any) {
    console.error('❌ Room photo upload error:', err?.message);
    return NextResponse.json({ success: false, error: 'Upload failed. Please try again.' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const getRes = await fetch(KVDB_URL, { cache: 'no-store' });
    if (getRes.ok) {
      const data = await getRes.json();
      if (data && typeof data === 'object' && !Array.isArray(data)) {
        return NextResponse.json({ success: true, photos: data });
      }
    }
    return NextResponse.json({ success: true, photos: {} });
  } catch {
    return NextResponse.json({ success: true, photos: {} });
  }
}
