import { X } from "lucide-react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
    word?: string;
}

export default function Modal({ isOpen, onClose, title, message, word }: ModalProps) {
    if (!isOpen) return null;

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
                    <p className="text-lg font-semibold">
                        The word was: <span className="text-green-500">{word}</span>
                    </p>
                )}
                <button
                    onClick={onClose}
                    className="cursor-pointer mt-6 w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
                >
                    Play Again
                </button>
            </div>
        </div>
    );
} 