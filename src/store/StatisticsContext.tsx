import { createContext, useContext, useState, useEffect } from "react"


interface Statistics {
    totalGames: number;
    totalWins: number;
}

export const StatisticsContext = createContext({
    statistics: {
        totalGames: 0,
        totalWins: 0,
    },
    updateStatistics: (newStatistics: Statistics) => {},
});

export const StatisticsProvider = ({ children }: { children: React.ReactNode }) => {

    const [statistics, setStatistics] = useState<Statistics>(() => {
        const savedStats = localStorage.getItem('wordleStats');
        if (savedStats) {
            try {
                return JSON.parse(savedStats);
            } catch (error) {
                console.error('Error parsing stats from localStorage:', error);
                return { totalGames: 0, totalWins: 0 };
            }
        }
        return { totalGames: 0, totalWins: 0 };
    });

    useEffect(() => {
        localStorage.setItem('wordleStats', JSON.stringify(statistics));
    }, [statistics]);

    const updateStatistics = (newStatistics: Statistics) => {
        setStatistics(newStatistics);
    };

    return (
        <StatisticsContext.Provider value={{ statistics, updateStatistics }}>
            {children}
        </StatisticsContext.Provider>
    );
};

export const useStatistics = () => {
    return useContext(StatisticsContext);
};
