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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-0">
            <div className="bg-card p-4 sm:p-6 rounded-lg shadow-lg max-w-md w-full">
                <div className="flex justify-between items-center mb-3 sm:mb-4">
                    <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>
                    <button
                        onClick={onClose}
                        className="p-1.5 sm:p-2 hover:bg-card/80 rounded-full transition-colors"
                    >
                        <X className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                </div>
                <p className="text-base sm:text-lg mb-3 sm:mb-4">{message}</p>
                {word && (
                    <p className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
                        The word was: <span className="text-green-500">{word}</span>
                    </p>
                )}
                
                {statistics && (
                    <div className="mt-1 sm:mt-2 mb-3 sm:mb-4">
                        <p className="text-xs sm:text-sm text-center text-muted-foreground mb-2 sm:mb-3">
                            Your statistics have been updated
                        </p>
                        <div className="grid grid-cols-3 gap-2 bg-background p-2 sm:p-3 rounded-md">
                            <div className="flex flex-col items-center">
                                <span className="text-lg sm:text-xl font-bold">{statistics.totalGames}</span>
                                <span className="text-xxs sm:text-xs text-muted-foreground">Played</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-lg sm:text-xl font-bold">{winPercentage}%</span>
                                <span className="text-xxs sm:text-xs text-muted-foreground">Win %</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-lg sm:text-xl font-bold">{statistics.totalWins}</span>
                                <span className="text-xxs sm:text-xs text-muted-foreground">Wins</span>
                            </div>
                        </div>
                    </div>
                )}
                
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <button
                        onClick={onClose}
                        className="cursor-pointer mt-1 sm:mt-2 flex-1 bg-primary text-primary-foreground py-1.5 sm:py-2 px-3 sm:px-4 rounded-md hover:bg-primary/90 transition-colors text-sm sm:text-base"
                    >
                        Play Again
                    </button>
                    {statistics && (
                        <button
                            onClick={() => {
                                onClose();
                                window.location.href = '/stats';
                            }}
                            className="cursor-pointer mt-1 sm:mt-2 flex-1 bg-card border border-primary/30 py-1.5 sm:py-2 px-3 sm:px-4 rounded-md hover:bg-card/80 transition-colors text-sm sm:text-base"
                        >
                            View Stats
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
} 