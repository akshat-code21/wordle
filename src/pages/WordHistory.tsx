import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useWordHistory } from "../store/WordHistoryContext";

export default function WordHistory() {
    const navigate = useNavigate();
    const { wordHistory } = useWordHistory();
    
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatDefinition = (definition: string) => {        
        if (definition.includes('\t')) {
            const parts = definition.split('\t');
            const pos = parts[0];
            const actualDefinition = parts[1];
            
            const posMap: Record<string, string> = {
                'n': 'noun',
                'v': 'verb',
                'adj': 'adjective',
                'adv': 'adverb'
            };
            
            const fullPos = posMap[pos] || pos;
            return <><span className="italic text-primary">{fullPos}</span>: {actualDefinition}</>;
        }
        
        return definition;
    };

    return (
        <div className="min-h-screen flex flex-col items-center py-6 px-3 sm:py-8 sm:px-4">
            <div className="flex flex-row items-center justify-between w-full max-w-4xl mb-6 sm:mb-8">
                <button 
                    onClick={() => navigate(-1)}
                    className="cursor-pointer w-10 h-10 sm:w-12 sm:h-12 bg-card rounded-md flex items-center justify-center hover:bg-card/80 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                
                <h1 className="text-2xl sm:text-4xl font-bold">Word History</h1>
                
                <div className="w-10 h-10 sm:w-12 sm:h-12"></div> 
            </div>

            <div className="w-full max-w-2xl px-2 sm:px-0">
                {wordHistory.length === 0 ? (
                    <div className="bg-card/50 rounded-lg p-4 sm:p-6 text-center">
                        <p className="text-sm sm:text-base text-muted-foreground">No word history yet. Play some games to see your word history!</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3 sm:gap-4">
                        {wordHistory.map((entry, index) => (
                            <div key={index} className="bg-card/50 rounded-lg p-4 sm:p-6 shadow-md">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-1 sm:gap-0">
                                    <h2 className="text-xl sm:text-2xl font-bold uppercase">{entry.word}</h2>
                                    <span className="text-xs sm:text-sm text-muted-foreground">{formatDate(entry.date)}</span>
                                </div>
                                <div className="mt-2 p-3 sm:p-4 bg-background rounded-md">
                                    <h3 className="text-sm sm:text-base font-semibold mb-1">Definition:</h3>
                                    <p className="text-sm sm:text-base">{formatDefinition(entry.definition)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-6 text-center">
                    <button 
                        onClick={() => navigate("/game")}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/80 transition-colors"
                    >
                        Play Again
                    </button>
                </div>
            </div>
        </div>
    );
} 