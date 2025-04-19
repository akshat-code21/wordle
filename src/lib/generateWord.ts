import axios from 'axios';

const DATAMUSE_API_URL = 'https://api.datamuse.com/words';

interface WordData {
    word: string;
    definition: string;
}

export async function generateWord(length: number): Promise<WordData> {
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
        const selectedWord = response.data[randomIndex];
        
        let definition = 'No definition available';
        if (selectedWord.defs && selectedWord.defs.length > 0) {
            definition = selectedWord.defs[0];
        }

        return {
            word: selectedWord.word,
            definition
        };
    } catch (error) {
        console.error('Error generating word:', error);
        throw new Error('Failed to generate word');
    }
}
