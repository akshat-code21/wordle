import axios from 'axios';

const DATAMUSE_API_URL = 'https://api.datamuse.com/words';

export async function generateWord(length: number): Promise<string> {
    try {
        const response = await axios.get(DATAMUSE_API_URL, {
            params: {
                sp: '?'.repeat(length),
                max: 1000,
                md: 'd'
            }
        });

        if (response.data.length === 0) {
            throw new Error('No words found for the specified length');
        }

        const randomIndex = Math.floor(Math.random() * response.data.length);
        return response.data[randomIndex].word;
    } catch (error) {
        console.error('Error generating word:', error);
        throw new Error('Failed to generate word');
    }
}
