import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const favoritesPath = path.join(process.cwd(), 'public', 'favourites', 'images');
    
    if (!fs.existsSync(favoritesPath)) {
      return NextResponse.json([]);
    }

    const files = fs.readdirSync(favoritesPath);
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    
    const imageFiles = files.filter((file) =>
      imageExtensions.some((ext) => file.toLowerCase().endsWith(ext))
    );

    return NextResponse.json(imageFiles);
  } catch (error) {
    console.error('Error reading favorites directory:', error);
    return NextResponse.json([]);
  }
}
