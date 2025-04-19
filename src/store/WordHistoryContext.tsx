import { createContext, useContext, useState, useEffect } from "react";

interface WordEntry {
    word: string;
    definition: string;
    date: string;
}

interface WordHistoryContextType {
    wordHistory: WordEntry[];
    addWordToHistory: (word: string, definition: string) => void;
}

export const WordHistoryContext = createContext<WordHistoryContextType>({
    wordHistory: [],
    addWordToHistory: () => { },
});

export const WordHistoryProvider = ({ children }: { children: React.ReactNode }) => {
    const [wordHistory, setWordHistory] = useState<WordEntry[]>(() => {
        const savedHistory = localStorage.getItem('wordleHistory');
        if (savedHistory) {
            try {
                return JSON.parse(savedHistory);
            } catch (error) {
                console.error('Error parsing word history from localStorage:', error);
                return [];
            }
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem('wordleHistory', JSON.stringify(wordHistory));
    }, [wordHistory]);

    const addWordToHistory = (word: string, definition: string) => {
        setWordHistory(prevHistory => {
            const newEntry: WordEntry = {
                word,
                definition,
                date: new Date().toISOString()
            };

            const updatedHistory = [newEntry, ...prevHistory].slice(0, 5);
            return updatedHistory;
        });
    };

    return (
        <WordHistoryContext.Provider value={{ wordHistory, addWordToHistory }}>
            {children}
        </WordHistoryContext.Provider>
    );
};

export const useWordHistory = () => {
    return useContext(WordHistoryContext);
}; 