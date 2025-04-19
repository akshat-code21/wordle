import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useStatistics } from "../store/StatisticsContext";
import { useEffect, useState } from "react";

export default function Statistics() {
    const navigate = useNavigate();
    const { statistics } = useStatistics();
    const [isDataPersisted, setIsDataPersisted] = useState(false);
    
    useEffect(() => {
        const savedStats = localStorage.getItem('wordleStats');
        setIsDataPersisted(!!savedStats);
    }, []);
    
    const winPercentage = statistics.totalGames > 0 
        ? Math.round((statistics.totalWins / statistics.totalGames) * 100) 
        : 0;

    return (
        <div className="min-h-screen flex flex-col items-center py-8 px-4">
            <div className="flex flex-row items-center justify-between w-full max-w-4xl mb-8">
                <button 
                    onClick={() => navigate("/game")}
                    className="cursor-pointer w-12 h-12 bg-card rounded-md flex items-center justify-center hover:bg-card/80 transition-colors"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
                
                <h1 className="text-4xl font-bold">Statistics</h1>
                
                <div className="w-12 h-12"></div> 
            </div>

            <div className="w-full max-w-md bg-card/50 rounded-lg p-6 shadow-md">
                {isDataPersisted && (
                    <div className="mb-4 text-center text-sm text-green-400">
                        Your statistics are saved automatically
                    </div>
                )}

                <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="flex flex-col items-center">
                        <span className="text-3xl font-bold">{statistics.totalGames}</span>
                        <span className="text-sm text-muted-foreground">Played</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-3xl font-bold">{winPercentage}%</span>
                        <span className="text-sm text-muted-foreground">Win %</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-3xl font-bold">{statistics.totalWins}</span>
                        <span className="text-sm text-muted-foreground">Wins</span>
                    </div>
                </div>

                <div className="w-full bg-background rounded-md p-4">
                    <h2 className="text-xl font-bold mb-4">Current Streak</h2>
                    <div className="flex justify-between items-center">
                        <div>
                            <span className="text-2xl font-bold mr-2">{statistics.totalWins}</span>
                            <span className="text-sm text-muted-foreground">wins</span>
                        </div>
                        <div>
                            <span className="text-2xl font-bold mr-2">{statistics.totalGames - statistics.totalWins}</span>
                            <span className="text-sm text-muted-foreground">losses</span>
                        </div>
                    </div>
                </div>

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