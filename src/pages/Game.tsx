import { Repeat2 } from "lucide-react";
export default function Game() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-between py-8 px-4">
            <div className="flex flex-row items-center gap-3">
                <h1 className="text-6xl font-bold">Guess the Word !</h1>
                <button className="w-12 h-12 bg-card rounded-md flex items-center justify-center cursor-pointer hover:bg-card/80 transition-colors">
                    <Repeat2 className="w-6 h-6" />
                </button>
            </div>
            
            <div className="flex items-center justify-center gap-4">
                {[0, 1, 2, 3, 4].map(() => {
                    return (
                        <div className="flex flex-col gap-2">
                            {[0, 1, 2, 3, 4, 5].map(() => {
                                return <div className="w-14 h-14 bg-card rounded-md border-2 border-card/20"></div>
                            })}
                        </div>
                    )
                })}
            </div>

            <div className="flex flex-col items-center gap-3 w-full max-w-2xl">
                <div className="flex gap-1.5">
                    {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map((letter) => (
                        <button key={letter} className="w-12 h-14 bg-card rounded-md flex items-center justify-center cursor-pointer hover:bg-card/80 transition-colors">
                            <span className="text-lg font-medium">{letter}</span>
                        </button>
                    ))}
                </div>

                <div className="flex gap-1.5">
                    {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map((letter) => (
                        <button key={letter} className="w-12 h-14 bg-card rounded-md flex items-center justify-center cursor-pointer hover:bg-card/80 transition-colors">
                            <span className="text-lg font-medium">{letter}</span>
                        </button>
                    ))}
                </div>

                <div className="flex gap-1.5">
                    {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map((letter) => (
                        <button key={letter} className="w-12 h-14 bg-card rounded-md flex items-center justify-center cursor-pointer hover:bg-card/80 transition-colors">
                            <span className="text-lg font-medium">{letter}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}