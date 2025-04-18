import { Repeat2 } from "lucide-react";
import { useEffect, useState } from "react";
import { generateWord } from "../lib/generateWord";
import Modal from "../components/Modal";
import "../animations.css";

interface Tile {
    letter: string;
    state: 'empty' | 'correct' | 'present' | 'absent';
    isFlipping?: boolean;
}

export default function Game() {
    const [word, setWord] = useState<string>('');
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

    useEffect(() => {
        startNewGame();
    }, []);

    const startNewGame = async () => {
        const newWord = await generateWord(5);
        setWord(newWord);
        setCurrentRow(0);
        setCurrentCol(0);
        setGameOver(false);
        setShowModal(false);
        setBoard(Array(6).fill(null).map(() =>
            Array(5).fill(null).map(() => ({ letter: '', state: 'empty' }))
        ));
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
            setGameResult({
                title: 'Congratulations! 🎉',
                message: 'You guessed the word correctly!'
            });
            setGameOver(true);
            setShowModal(true);
        } else if (currentRow === 5) {
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

    return (
        <div className="min-h-screen flex flex-col items-center justify-between py-8 px-4">
            <div className="flex flex-row items-center gap-3">
                <h1 className="text-6xl font-bold">Guess the Word !</h1>
                <button
                    onClick={startNewGame}
                    className="w-12 h-12 bg-card rounded-md flex items-center justify-center cursor-pointer hover:bg-card/80 transition-colors"
                >
                    <Repeat2 className="w-6 h-6" />
                </button>
            </div>

            <div className="flex flex-col gap-4">
                {board.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex flex-row gap-2">
                        {row.map((tile, colIndex) => (
                            <div
                                key={`${rowIndex}-${colIndex}`}
                                className={`w-14 h-14 rounded-md border-2 flex items-center justify-center text-2xl font-bold
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

            <div className="flex flex-col items-center gap-3 w-full max-w-2xl">
                <div className="flex gap-1.5">
                    {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map((letter) => (
                        <button
                            key={letter}
                            onClick={() => handleKeyPress(letter)}
                            className="w-12 h-14 bg-card rounded-md flex items-center justify-center cursor-pointer hover:bg-card/80 transition-colors"
                        >
                            <span className="text-lg font-medium">{letter}</span>
                        </button>
                    ))}
                </div>

                <div className="flex gap-1.5">
                    {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map((letter) => (
                        <button
                            key={letter}
                            onClick={() => handleKeyPress(letter)}
                            className="w-12 h-14 bg-card rounded-md flex items-center justify-center cursor-pointer hover:bg-card/80 transition-colors"
                        >
                            <span className="text-lg font-medium">{letter}</span>
                        </button>
                    ))}
                </div>

                <div className="flex gap-1.5">
                    {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map((letter) => (
                        <button
                            key={letter}
                            onClick={() => handleKeyPress(letter)}
                            className="w-12 h-14 bg-card rounded-md flex items-center justify-center cursor-pointer hover:bg-card/80 transition-colors"
                        >
                            <span className="text-lg font-medium">{letter}</span>
                        </button>
                    ))}
                    <button
                        onClick={() => handleKeyPress('BACKSPACE')}
                        className="w-16 h-14 bg-card rounded-md flex items-center justify-center cursor-pointer hover:bg-card/80 transition-colors"
                    >
                        <span className="text-lg font-medium">⌫</span>
                    </button>
                </div>
            </div>

            <Modal
                isOpen={showModal}
                onClose={startNewGame}
                title={gameResult.title}
                message={gameResult.message}
                word={!gameResult.title.includes('Congratulations') ? word : undefined}
            />
        </div>
    );
}