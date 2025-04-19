import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
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

    const letterVariants = {
        initial: { y: -20, opacity: 0 },
        animate: (i: number) => ({
            y: 0,
            opacity: 1,
            transition: {
                delay: i * 0.1,
                duration: 0.4,
                ease: "easeOut"
            }
        })
    };

    const letters = ["W", "O", "R", "D", "L", "E"];

    return (
        <div className="min-h-screen bg-background text-foreground dark flex flex-col items-center justify-center p-4">
            <motion.div
                className="flex flex-col items-center max-w-4xl w-full gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div className="flex mb-8" variants={itemVariants}>
                    {letters.map((letter, i) => (
                        <motion.div
                            key={i}
                            custom={i}
                            variants={letterVariants}
                            initial="initial"
                            animate="animate"
                            className="w-16 h-16 mx-1 bg-primary text-primary-foreground font-bold text-3xl rounded-md flex items-center justify-center"
                        >
                            {letter}
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div className="w-full" variants={itemVariants}>
                    <Card className="border-2 border-primary/20">
                        <CardHeader>
                            <CardTitle className="text-3xl font-bold text-center">Welcome to Wordle</CardTitle>
                            <CardDescription className="text-center text-lg mt-2">
                                Test your vocabulary skills with this addictive word game
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-center">
                            <p className="mb-4">
                                Guess the hidden word in 6 tries. Each guess must be a valid 5-letter word.
                                After each guess, the color of the tiles will change to show how close your guess was.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                <Card className="bg-card/50">
                                    <CardHeader>
                                        <CardTitle className="text-xl">How to Play</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="list-disc list-inside text-left space-y-2">
                                            <li>Each guess must be a valid 5-letter word</li>
                                            <li>Green tiles indicate a correct letter in the right position</li>
                                            <li>Yellow tiles indicate a correct letter in the wrong position</li>
                                            <li>Gray tiles indicate a letter not in the word</li>
                                        </ul>
                                    </CardContent>
                                </Card>
                                <Card className="bg-card/50">
                                    <CardHeader>
                                        <CardTitle className="text-xl">Features</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="list-disc list-inside text-left space-y-2">
                                            <li>Daily challenges with new words</li>
                                            <li>Track your statistics</li>
                                            <li>Share your results with friends</li>
                                        </ul>
                                    </CardContent>
                                </Card>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-center gap-4 mt-4">
                            <Button
                                size="lg"
                                onClick={() => navigate("/game")}
                                className="bg-primary hover:bg-primary/80 text-primary-foreground px-8 cursor-pointer"
                            >
                                Play Now
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => navigate("/how-to-play")}
                                className="hover:bg-accent/20 cursor-pointer"
                            >
                                Learn More
                            </Button>
                        </CardFooter>
                    </Card>
                </motion.div>

                <motion.div className="w-full mt-8" variants={itemVariants}>
                    <div className="text-center mb-4">
                        <h2 className="text-2xl font-bold">Example Gameplay</h2>
                    </div>
                    <div className="flex justify-center my-4">
                        <div className="grid grid-cols-5 gap-2">
                            <div className="w-14 h-14 flex items-center justify-center bg-green-500 text-white text-2xl font-bold rounded-md border-2 border-green-500">H</div>
                            <div className="w-14 h-14 flex items-center justify-center bg-yellow-500 text-white text-2xl font-bold rounded-md border-2 border-yellow-500">E</div>
                            <div className="w-14 h-14 flex items-center justify-center bg-gray-500 text-white text-2xl font-bold rounded-md border-2 border-gray-500">A</div>
                            <div className="w-14 h-14 flex items-center justify-center bg-yellow-500 text-white text-2xl font-bold rounded-md border-2 border-yellow-500">R</div>
                            <div className="w-14 h-14 flex items-center justify-center bg-gray-500 text-white text-2xl font-bold rounded-md border-2 border-gray-500">T</div>
                        </div>
                    </div>
                    <div className="text-center text-sm text-muted-foreground">
                        <div className="flex justify-center gap-6 mt-4">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-green-500 rounded-sm"></div>
                                <span>Correct spot</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-yellow-500 rounded-sm"></div>
                                <span>Wrong spot</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-gray-500 rounded-sm"></div>
                                <span>Not in word</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.footer className="w-full mt-8 text-center text-sm text-muted-foreground" variants={itemVariants}>
                    <p>© 2025 Wordle Game. All rights reserved.</p>
                </motion.footer>
            </motion.div>
        </div>
    );
}