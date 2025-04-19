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
        <div className="min-h-screen flex flex-col items-center py-8 px-4">
            <div className="flex flex-row items-center justify-between w-full max-w-4xl mb-8">
                <button 
                    onClick={() => navigate("/game")}
                    className="cursor-pointer w-12 h-12 bg-card rounded-md flex items-center justify-center hover:bg-card/80 transition-colors"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
                
                <h1 className="text-4xl font-bold">Word History</h1>
                
                <div className="w-12 h-12"></div> 
            </div>

            <div className="w-full max-w-2xl">
                {wordHistory.length === 0 ? (
                    <div className="bg-card/50 rounded-lg p-6 text-center">
                        <p className="text-muted-foreground">No word history yet. Play some games to see your word history!</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {wordHistory.map((entry, index) => (
                            <div key={index} className="bg-card/50 rounded-lg p-6 shadow-md">
                                <div className="flex justify-between items-center mb-2">
                                    <h2 className="text-2xl font-bold uppercase">{entry.word}</h2>
                                    <span className="text-sm text-muted-foreground">{formatDate(entry.date)}</span>
                                </div>
                                <div className="mt-2 p-4 bg-background rounded-md">
                                    <h3 className="font-semibold mb-1">Definition:</h3>
                                    <p>{formatDefinition(entry.definition)}</p>
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