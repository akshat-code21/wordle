import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HowToPlay() {
    const navigate = useNavigate();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delay: 0.3,
                when: "beforeChildren",
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground dark flex flex-col items-center py-6 px-3 sm:py-8 sm:px-4">
            <div className="flex flex-row items-center justify-between w-full max-w-4xl mb-6 sm:mb-8">
                <button 
                    onClick={() => navigate(-1)}
                    className="cursor-pointer w-10 h-10 sm:w-12 sm:h-12 bg-card rounded-md flex items-center justify-center hover:bg-card/80 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                
                <h1 className="text-2xl sm:text-4xl font-bold">How To Play</h1>
                
                <div className="w-10 h-10 sm:w-12 sm:h-12"></div> {/* Empty div for balanced layout */}
            </div>

            <motion.div
                className="flex flex-col items-center max-w-4xl w-full gap-4 sm:gap-6 px-1 sm:px-0"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div className="w-full" variants={itemVariants}>
                    <Card className="border-2 border-primary/20">
                        <CardHeader className="py-3 px-4 sm:py-6 sm:px-6">
                            <CardTitle className="text-xl sm:text-2xl font-bold">Game Objective</CardTitle>
                        </CardHeader>
                        <CardContent className="py-2 px-4 sm:py-4 sm:px-6">
                            <p className="text-sm sm:text-base mb-2 sm:mb-4">
                                Wordle is a word-guessing game where you have 6 attempts to guess a 5-letter word. 
                                Your goal is to figure out the hidden word with as few attempts as possible.
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div className="w-full" variants={itemVariants}>
                    <Card className="border-2 border-primary/20">
                        <CardHeader className="py-3 px-4 sm:py-6 sm:px-6">
                            <CardTitle className="text-xl sm:text-2xl font-bold">Basic Rules</CardTitle>
                        </CardHeader>
                        <CardContent className="py-2 px-4 sm:py-4 sm:px-6 space-y-2 sm:space-y-4">
                            <ul className="list-disc list-inside text-left space-y-1 sm:space-y-2 text-sm sm:text-base">
                                <li>Each guess must be a valid 5-letter word</li>
                                <li>You have 6 attempts to guess the hidden word</li>
                                <li>After each guess, the tiles will change color to show how close your guess was</li>
                                <li>The game ends when you guess the word correctly or use all 6 attempts</li>
                            </ul>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div className="w-full" variants={itemVariants}>
                    <Card className="border-2 border-primary/20">
                        <CardHeader className="py-3 px-4 sm:py-6 sm:px-6">
                            <CardTitle className="text-xl sm:text-2xl font-bold">Color Indicators</CardTitle>
                        </CardHeader>
                        <CardContent className="py-2 px-4 sm:py-4 sm:px-6">
                            <div className="space-y-4 sm:space-y-6">
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <div className="w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center bg-green-500 text-white text-xl sm:text-2xl font-bold rounded-md border-2 border-green-500">A</div>
                                    <div>
                                        <p className="font-bold text-sm sm:text-base">Green Tile</p>
                                        <p className="text-xs sm:text-sm">The letter is in the word and in the correct position.</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <div className="w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center bg-yellow-500 text-white text-xl sm:text-2xl font-bold rounded-md border-2 border-yellow-500">B</div>
                                    <div>
                                        <p className="font-bold text-sm sm:text-base">Yellow Tile</p>
                                        <p className="text-xs sm:text-sm">The letter is in the word but in the wrong position.</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <div className="w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center bg-gray-500 text-white text-xl sm:text-2xl font-bold rounded-md border-2 border-gray-500">C</div>
                                    <div>
                                        <p className="font-bold text-sm sm:text-base">Gray Tile</p>
                                        <p className="text-xs sm:text-sm">The letter is not in the word at all.</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div className="w-full" variants={itemVariants}>
                    <Card className="border-2 border-primary/20">
                        <CardHeader className="py-3 px-4 sm:py-6 sm:px-6">
                            <CardTitle className="text-xl sm:text-2xl font-bold">Gameplay Example</CardTitle>
                        </CardHeader>
                        <CardContent className="py-2 px-4 sm:py-4 sm:px-6">
                            <p className="text-sm sm:text-base mb-3 sm:mb-4">Let's say the hidden word is "HEART":</p>
                            
                            <div className="space-y-3 sm:space-y-4">
                                <div>
                                    <p className="text-sm sm:text-base font-semibold mb-1 sm:mb-2">First guess: "STONE"</p>
                                    <div className="flex gap-1 sm:gap-1.5 justify-center">
                                        <div className="w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center bg-gray-500 text-white text-sm sm:text-xl font-bold rounded-md">S</div>
                                        <div className="w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center bg-gray-500 text-white text-sm sm:text-xl font-bold rounded-md">T</div>
                                        <div className="w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center bg-gray-500 text-white text-sm sm:text-xl font-bold rounded-md">O</div>
                                        <div className="w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center bg-gray-500 text-white text-sm sm:text-xl font-bold rounded-md">N</div>
                                        <div className="w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center bg-yellow-500 text-white text-sm sm:text-xl font-bold rounded-md">E</div>
                                    </div>
                                    <p className="mt-1 sm:mt-2 text-xs sm:text-sm">The E is in the word but in the wrong position.</p>
                                </div>
                                
                                <div>
                                    <p className="text-sm sm:text-base font-semibold mb-1 sm:mb-2">Second guess: "BREAK"</p>
                                    <div className="flex gap-1 sm:gap-1.5 justify-center">
                                        <div className="w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center bg-gray-500 text-white text-sm sm:text-xl font-bold rounded-md">B</div>
                                        <div className="w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center bg-yellow-500 text-white text-sm sm:text-xl font-bold rounded-md">R</div>
                                        <div className="w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center bg-yellow-500 text-white text-sm sm:text-xl font-bold rounded-md">E</div>
                                        <div className="w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center bg-yellow-500 text-white text-sm sm:text-xl font-bold rounded-md">A</div>
                                        <div className="w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center bg-gray-500 text-white text-sm sm:text-xl font-bold rounded-md">K</div>
                                    </div>
                                    <p className="mt-1 sm:mt-2 text-xs sm:text-sm">R, E, and A are in the word but in wrong positions.</p>
                                </div>
                                
                                <div>
                                    <p className="text-sm sm:text-base font-semibold mb-1 sm:mb-2">Third guess: "HEART"</p>
                                    <div className="flex gap-1 sm:gap-1.5 justify-center">
                                        <div className="w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center bg-green-500 text-white text-sm sm:text-xl font-bold rounded-md">H</div>
                                        <div className="w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center bg-green-500 text-white text-sm sm:text-xl font-bold rounded-md">E</div>
                                        <div className="w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center bg-green-500 text-white text-sm sm:text-xl font-bold rounded-md">A</div>
                                        <div className="w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center bg-green-500 text-white text-sm sm:text-xl font-bold rounded-md">R</div>
                                        <div className="w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center bg-green-500 text-white text-sm sm:text-xl font-bold rounded-md">T</div>
                                    </div>
                                    <p className="mt-1 sm:mt-2 text-xs sm:text-sm">Correct! All letters are in the right position.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div className="w-full" variants={itemVariants}>
                    <Card className="border-2 border-primary/20">
                        <CardHeader className="py-3 px-4 sm:py-6 sm:px-6">
                            <CardTitle className="text-xl sm:text-2xl font-bold">Tips & Strategies</CardTitle>
                        </CardHeader>
                        <CardContent className="py-2 px-4 sm:py-4 sm:px-6">
                            <ul className="list-disc list-inside space-y-1 sm:space-y-3 text-sm sm:text-base">
                                <li>Start with words that have common vowels (A, E, I, O, U)</li>
                                <li>Try to use common consonants in your early guesses (S, T, R, N, L)</li>
                                <li>Pay attention to the keyboard colors to avoid reusing letters that aren't in the word</li>
                                <li>If a letter shows as yellow, try placing it in different positions in subsequent guesses</li>
                                <li>Remember that words may contain repeated letters</li>
                            </ul>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div className="flex justify-center mt-4 sm:mt-6" variants={itemVariants}>
                    <Button
                        size="sm"
                        onClick={() => navigate("/game")}
                        className="bg-primary hover:bg-primary/80 text-primary-foreground px-6 sm:px-8 py-2 cursor-pointer text-sm sm:text-base"
                    >
                        Start Playing
                    </Button>
                </motion.div>
            </motion.div>
        </div>
    );
}
