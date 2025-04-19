import { X } from "lucide-react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
    word?: string;
    statistics?: {
        totalGames: number;
        totalWins: number;
    };
}

export default function Modal({ isOpen, onClose, title, message, word, statistics }: ModalProps) {
    if (!isOpen) return null;

    const winPercentage = statistics && statistics.totalGames > 0 
        ? Math.round((statistics.totalWins / statistics.totalGames) * 100) 
        : 0;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-card p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">{title}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-card/80 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <p className="text-lg mb-4">{message}</p>
                {word && (
                    <p className="text-lg font-semibold mb-4">
                        The word was: <span className="text-green-500">{word}</span>
                    </p>
                )}
                
                {statistics && (
                    <div className="mt-2 mb-4">
                        <p className="text-sm text-center text-muted-foreground mb-3">
                            Your statistics have been updated
                        </p>
                        <div className="grid grid-cols-3 gap-2 bg-background p-3 rounded-md">
                            <div className="flex flex-col items-center">
                                <span className="text-xl font-bold">{statistics.totalGames}</span>
                                <span className="text-xs text-muted-foreground">Played</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-xl font-bold">{winPercentage}%</span>
                                <span className="text-xs text-muted-foreground">Win %</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-xl font-bold">{statistics.totalWins}</span>
                                <span className="text-xs text-muted-foreground">Wins</span>
                            </div>
                        </div>
                    </div>
                )}
                
                <div className="flex flex-row gap-3">
                    <button
                        onClick={onClose}
                        className="cursor-pointer mt-2 flex-1 bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
                    >
                        Play Again
                    </button>
                    {statistics && (
                        <button
                            onClick={() => {
                                onClose();
                                window.location.href = '/stats';
                            }}
                            className="cursor-pointer mt-2 flex-1 bg-card border border-primary/30 py-2 px-4 rounded-md hover:bg-card/80 transition-colors"
                        >
                            View Stats
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
} 