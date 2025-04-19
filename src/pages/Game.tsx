import { Repeat2,ArrowLeft, BarChart, BookMarked, User } from "lucide-react";
import { useEffect, useState } from "react";
import { generateWord } from "../lib/generateWord";
import Modal from "../components/Modal";
import "../animations.css";
import { useNavigate } from "react-router-dom";
import { useStatistics } from "../store/StatisticsContext";
import { useWordHistory } from "../store/WordHistoryContext";
import { useUser } from "../store/UserContext";

interface Tile {
    letter: string;
    state: 'empty' | 'correct' | 'present' | 'absent';
    isFlipping?: boolean;
}

type KeyboardState = {
    [key: string]: 'unused' | 'correct' | 'present' | 'absent';
};

export default function Game() {
    const navigate = useNavigate();
    const { statistics, updateStatistics } = useStatistics();
    const { addWordToHistory } = useWordHistory();
    const { userProfile, isLoggedIn } = useUser();
    const [word, setWord] = useState<string>('');
    const [currentDefinition, setCurrentDefinition] = useState<string>('');
    const [currentRow, setCurrentRow] = useState(0);
    const [currentCol, setCurrentCol] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [gameResult, setGameResult] = useState<{ title: string; message: string }>({ title: '', message: '' });
    const [board, setBoard] = useState<Tile[][]>(
        Array(6).fill(null).map(() =>
            Array(5).fill(null).map(() => ({ letter: '', state: 'empty' }))
        )
    );
    const [keyboardState, setKeyboardState] = useState<KeyboardState>(
        Object.fromEntries([...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'].map(letter => [letter, 'unused']))
    );

    useEffect(() => {
        startNewGame();
    }, []);

    const startNewGame = async () => {
        const wordData = await generateWord(5);
        setWord(wordData.word);
        setCurrentDefinition(wordData.definition);
        setCurrentRow(0);
        setCurrentCol(0);
        setGameOver(false);
        setShowModal(false);
        setBoard(Array(6).fill(null).map(() =>
            Array(5).fill(null).map(() => ({ letter: '', state: 'empty' }))
        ));
        setKeyboardState(
            Object.fromEntries([...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'].map(letter => [letter, 'unused']))
        );
    };

    const checkGuess = async () => {
        const guess = board[currentRow].map(tile => tile.letter).join('').toLowerCase();
        const targetWord = word.toLowerCase();

        const tileStates = Array(5).fill('absent');

        const targetLetters = [...targetWord];

        for (let i = 0; i < 5; i++) {
            if (guess[i] === targetWord[i]) {
                tileStates[i] = 'correct';
                targetLetters[i] = '#';
            }
        }

        for (let i = 0; i < 5; i++) {
            if (tileStates[i] === 'correct') continue;

            const letterIndex = targetLetters.indexOf(guess[i]);
            if (letterIndex >= 0) {
                tileStates[i] = 'present';
                targetLetters[letterIndex] = '#';
            }
        }

        let newBoard = [...board];

        const newKeyboardState = { ...keyboardState };
        for (let i = 0; i < 5; i++) {
            const letter = board[currentRow][i].letter;
            const state = tileStates[i];
            
            if (
                (state === 'correct') || 
                (state === 'present' && newKeyboardState[letter] !== 'correct') ||
                (state === 'absent' && newKeyboardState[letter] !== 'correct' && newKeyboardState[letter] !== 'present')
            ) {
                newKeyboardState[letter] = state;
            }
        }
        setKeyboardState(newKeyboardState);

        for (let i = 0; i < 5; i++) {
            newBoard = [...newBoard];
            newBoard[currentRow] = [...newBoard[currentRow]];
            newBoard[currentRow][i] = { ...newBoard[currentRow][i], isFlipping: true };
            setBoard(newBoard);

            await new Promise(resolve => setTimeout(resolve, 250));

            newBoard = [...newBoard];
            newBoard[currentRow] = [...newBoard[currentRow]];
            newBoard[currentRow][i] = {
                ...newBoard[currentRow][i],
                state: tileStates[i],
            };
            setBoard(newBoard);

            await new Promise(resolve => setTimeout(resolve, 250));

            newBoard = [...newBoard];
            newBoard[currentRow] = [...newBoard[currentRow]];
            newBoard[currentRow][i] = {
                ...newBoard[currentRow][i],
                isFlipping: false,
            };
            setBoard(newBoard);

            if (i < 4) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }
        }

        const isCorrect = guess === targetWord;

        if (isCorrect) {
            updateStatistics({
                totalGames: statistics.totalGames + 1,
                totalWins: statistics.totalWins + 1
            });
            addWordToHistory(word, currentDefinition);
            
            setGameResult({
                title: 'Congratulations! 🎉',
                message: 'You guessed the word correctly!'
            });
            setGameOver(true);
            setShowModal(true);
        } else if (currentRow === 5) {
            updateStatistics({
                totalGames: statistics.totalGames + 1,
                totalWins: statistics.totalWins
            });
            addWordToHistory(word, currentDefinition);
            
            setGameResult({
                title: 'Game Over!',
                message: 'Better luck next time!'
            });
            setGameOver(true);
            setShowModal(true);
        } else {
            setCurrentRow(prev => prev + 1);
            setCurrentCol(0);
        }
    };

    const handleKeyPress = (key: string) => {
        if (gameOver) return;
        if (key !== 'BACKSPACE' && keyboardState[key] === 'absent') return; 

        if (key === 'BACKSPACE') {
            if (currentCol > 0) {
                const newBoard = [...board];
                newBoard[currentRow][currentCol - 1].letter = '';
                setBoard(newBoard);
                setCurrentCol(prev => prev - 1);
            }
        } else if (currentCol < 5) {
            const newBoard = [...board];
            newBoard[currentRow][currentCol].letter = key;
            setBoard(newBoard);
            setCurrentCol(prev => prev + 1);
            if (currentCol === 4) {
                checkGuess();
            }
        }
    };

    const getKeyboardButtonClass = (letter: string) => {
        const baseClass = "w-8 h-10 sm:w-11 md:w-12 sm:h-12 md:h-14 rounded-md flex items-center justify-center cursor-pointer transition-colors";
        
        switch (keyboardState[letter]) {
            case 'correct':
                return `${baseClass} bg-green-500 border-green-500 text-white`;
            case 'present':
                return `${baseClass} bg-yellow-500 border-yellow-500 text-white`;
            case 'absent':
                return `${baseClass} bg-gray-500 border-gray-500 text-white opacity-70`;
            default:
                return `${baseClass} bg-card hover:bg-card/80`;
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-between py-4 sm:py-6 md:py-8 px-2 sm:px-4">
            <div className="flex flex-row items-center justify-between w-full max-w-4xl">
                <button 
                    onClick={() => navigate(-1)}
                    className="cursor-pointer w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-card rounded-md flex items-center justify-center hover:bg-card/80 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </button>
                
                <div className="flex flex-row items-center gap-2 sm:gap-3">
                    <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold">Guess the Word !</h1>
                    <button
                        onClick={startNewGame}
                        className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-card rounded-md flex items-center justify-center cursor-pointer hover:bg-card/80 transition-colors"
                    >
                        <Repeat2 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    </button>
                </div>
                
                <div className="flex gap-1 sm:gap-2">
                    <button 
                        className="cursor-pointer w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-card rounded-md flex items-center justify-center hover:bg-card/80 transition-colors"
                        onClick={() => navigate("/profile")}
                        title={isLoggedIn ? `Profile: ${userProfile?.username}` : "Sign In"}
                    >
                        <User className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    </button>
                    <button 
                        className="cursor-pointer w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-card rounded-md flex items-center justify-center hover:bg-card/80 transition-colors"
                        onClick={() => navigate("/stats")}
                    >
                        <BarChart className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    </button>
                    <button 
                        className="cursor-pointer w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-card rounded-md flex items-center justify-center hover:bg-card/80 transition-colors"
                        onClick={() => navigate("/word-history")}
                    >
                        <BookMarked className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    </button>
                </div>
            </div>

            {isLoggedIn && (
                <div className="text-sm text-muted-foreground mt-2">
                    Playing as: <span className="font-semibold">{userProfile?.username}</span>
                </div>
            )}

            <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 my-6">
                {board.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex flex-row gap-1 sm:gap-2">
                        {row.map((tile, colIndex) => (
                            <div
                                key={`${rowIndex}-${colIndex}`}
                                className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-md border-2 flex items-center justify-center text-base sm:text-xl md:text-2xl font-bold
                                    ${tile.isFlipping ? 'rotate-y-180' : ''}
                                    ${tile.state === 'empty' ? 'bg-card border-card/20' :
                                        tile.state === 'correct' ? 'bg-green-500 border-green-500' :
                                            tile.state === 'present' ? 'bg-yellow-500 border-yellow-500' :
                                                'bg-gray-500 border-gray-500'}`}
                            >
                                {tile.letter}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div className="flex flex-col items-center gap-1.5 sm:gap-2 md:gap-3 w-full max-w-xl sm:max-w-2xl mb-4">
                <div className="flex gap-0.5 sm:gap-1 md:gap-1.5">
                    {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map((letter) => (
                        <button
                            key={letter}
                            onClick={() => handleKeyPress(letter)}
                            className={getKeyboardButtonClass(letter)}
                            disabled={keyboardState[letter] === 'absent'}
                        >
                            <span className="text-sm sm:text-base md:text-lg font-medium">{letter}</span>
                        </button>
                    ))}
                </div>

                <div className="flex gap-0.5 sm:gap-1 md:gap-1.5">
                    <div className="w-4 sm:w-5 md:w-6"></div> {/* Spacing for alignment */}
                    {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map((letter) => (
                        <button
                            key={letter}
                            onClick={() => handleKeyPress(letter)}
                            className={getKeyboardButtonClass(letter)}
                            disabled={keyboardState[letter] === 'absent'}
                        >
                            <span className="text-sm sm:text-base md:text-lg font-medium">{letter}</span>
                        </button>
                    ))}
                    <div className="w-4 sm:w-5 md:w-6"></div> {/* Spacing for alignment */}
                </div>

                <div className="flex gap-0.5 sm:gap-1 md:gap-1.5">
                    <div className="w-8"></div> {/* Spacing for alignment */}
                    {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map((letter) => (
                        <button
                            key={letter}
                            onClick={() => handleKeyPress(letter)}
                            className={getKeyboardButtonClass(letter)}
                            disabled={keyboardState[letter] === 'absent'}
                        >
                            <span className="text-sm sm:text-base md:text-lg font-medium">{letter}</span>
                        </button>
                    ))}
                    <button
                        onClick={() => handleKeyPress('BACKSPACE')}
                        className="w-12 h-10 sm:w-14 sm:h-12 md:w-16 md:h-14 bg-card rounded-md flex items-center justify-center cursor-pointer hover:bg-card/80 transition-colors"
                    >
                        <span className="text-sm sm:text-base md:text-lg font-medium">⌫</span>
                    </button>
                </div>
            </div>

            <Modal
                isOpen={showModal}
                onClose={startNewGame}
                title={gameResult.title}
                message={gameResult.message}
                word={!gameResult.title.includes('Congratulations') ? word : undefined}
                statistics={statistics}
            />
        </div>
    );
}