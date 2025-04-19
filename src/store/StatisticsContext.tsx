import { createContext, useContext, useState } from "react"

export const StatisticsContext = createContext({
    statistics: {
        totalGames: 0,
        totalWins: 0,
    },
    updateStatistics: (newStatistics: { totalGames: number; totalWins: number }) => {},
});

export const StatisticsProvider = ({ children }: { children: React.ReactNode }) => {
    const [statistics, setStatistics] = useState({
        totalGames: 0,
        totalWins: 0,
    });

    const updateStatistics = (newStatistics: { totalGames: number; totalWins: number }) => {
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
