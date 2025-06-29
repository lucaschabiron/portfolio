// Function to get all favorite images from the API
export async function getFavoriteImages(): Promise<string[]> {
  try {
    const response = await fetch('/api/favorites');
    if (!response.ok) {
      throw new Error('Failed to fetch favorite images');
    }
    const images = await response.json();
    return images;
  } catch (error) {
    console.error('Error fetching favorite images:', error);
    return [];
  }
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
