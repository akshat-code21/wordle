import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useUser } from "../store/UserContext";
import { User } from "lucide-react";

export default function LandingPage() {
    const navigate = useNavigate();
    const { userProfile, isLoggedIn } = useUser();

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
        <div className="min-h-screen bg-background text-foreground dark flex flex-col items-center justify-center p-3 sm:p-4">
            <motion.div
                className="flex flex-col items-center max-w-4xl w-full gap-6 sm:gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div className="flex mb-4 sm:mb-8" variants={itemVariants}>
                    {letters.map((letter, i) => (
                        <motion.div
                            key={i}
                            custom={i}
                            variants={letterVariants}
                            initial="initial"
                            animate="animate"
                            className="w-10 h-10 sm:w-16 sm:h-16 mx-0.5 sm:mx-1 bg-primary text-primary-foreground font-bold text-xl sm:text-3xl rounded-md flex items-center justify-center"
                        >
                            {letter}
                        </motion.div>
                    ))}
                </motion.div>

                {isLoggedIn && (
                    <motion.div
                        className="flex items-center gap-2 mb-2"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                            <User className="w-4 h-4 text-primary-foreground" />
                        </div>
                        <span className="text-lg font-medium">
                            Welcome back, <span className="font-bold">{userProfile?.username}</span>!
                        </span>
                    </motion.div>
                )}

                <motion.div className="w-full" variants={itemVariants}>
                    <Card className="border-2 border-primary/20">
                        <CardHeader>
                            <CardTitle className="text-xl sm:text-3xl font-bold text-center">Welcome to Wordle</CardTitle>
                            <CardDescription className="text-center text-sm sm:text-lg mt-2">
                                Test your vocabulary skills with this addictive word game
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-center">
                            <p className="text-sm sm:text-base mb-4">
                                Guess the hidden word in 6 tries. Each guess must be a valid 5-letter word.
                                After each guess, the color of the tiles will change to show how close your guess was.
                            </p>
                            <div className="grid grid-cols-1 gap-4 mt-4 sm:mt-6">
                                <Card className="bg-card/50">
                                    <CardHeader className="py-3 px-4 sm:py-6 sm:px-6">
                                        <CardTitle className="text-lg sm:text-xl">How to Play</CardTitle>
                                    </CardHeader>
                                    <CardContent className="py-2 px-4 sm:py-4 sm:px-6">
                                        <ul className="list-disc list-inside text-left space-y-1 sm:space-y-2 text-sm sm:text-base">
                                            <li>Each guess must be a valid 5-letter word</li>
                                            <li>Green tiles indicate a correct letter in the right position</li>
                                            <li>Yellow tiles indicate a correct letter in the wrong position</li>
                                            <li>Gray tiles indicate a letter not in the word</li>
                                        </ul>
                                    </CardContent>
                                </Card>
                                <Card className="bg-card/50">
                                    <CardHeader className="py-3 px-4 sm:py-6 sm:px-6">
                                        <CardTitle className="text-lg sm:text-xl">Features</CardTitle>
                                    </CardHeader>
                                    <CardContent className="py-2 px-4 sm:py-4 sm:px-6">
                                        <ul className="list-disc list-inside text-left space-y-1 sm:space-y-2 text-sm sm:text-base">
                                            <li>Daily challenges with new words</li>
                                            <li>Track your statistics</li>
                                            <li>Share your results with friends</li>
                                            <li>View your word history</li>
                                        </ul>
                                    </CardContent>
                                </Card>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mt-2 sm:mt-4 pb-4 sm:pb-6">
                            <Button
                                size="sm"
                                onClick={() => navigate("/game")}
                                className="w-full sm:w-auto bg-primary hover:bg-primary/80 text-primary-foreground px-4 sm:px-8 py-2 cursor-pointer text-sm sm:text-base"
                            >
                                Play Now
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => navigate("/how-to-play")}
                                className="w-full sm:w-auto hover:bg-accent/20 cursor-pointer py-2 text-sm sm:text-base"
                            >
                                Learn More
                            </Button>
                            <Button
                                size="sm"
                                onClick={() => navigate("/word-history")}
                                className="w-full sm:w-auto bg-primary hover:bg-primary/80 text-primary-foreground px-4 sm:px-8 py-2 cursor-pointer text-sm sm:text-base"
                            >
                                Word History
                            </Button>
                            <Button
                                size="sm"
                                onClick={() => navigate("/profile")}
                                className="w-full sm:w-auto bg-primary hover:bg-primary/80 text-primary-foreground px-4 sm:px-8 py-2 cursor-pointer text-sm sm:text-base"
                            >
                                {isLoggedIn ? "Profile" : "Sign In"}
                            </Button>
                        </CardFooter>
                    </Card>
                </motion.div>

                <motion.div className="w-full mt-6 sm:mt-8" variants={itemVariants}>
                    <div className="text-center mb-3 sm:mb-4">
                        <h2 className="text-xl sm:text-2xl font-bold">Example Gameplay</h2>
                    </div>
                    <div className="flex justify-center my-3 sm:my-4">
                        <div className="grid grid-cols-5 gap-1 sm:gap-2">
                            <div className="w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center bg-green-500 text-white text-base sm:text-2xl font-bold rounded-md border-2 border-green-500">H</div>
                            <div className="w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center bg-yellow-500 text-white text-base sm:text-2xl font-bold rounded-md border-2 border-yellow-500">E</div>
                            <div className="w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center bg-gray-500 text-white text-base sm:text-2xl font-bold rounded-md border-2 border-gray-500">A</div>
                            <div className="w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center bg-yellow-500 text-white text-base sm:text-2xl font-bold rounded-md border-2 border-yellow-500">R</div>
                            <div className="w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center bg-gray-500 text-white text-base sm:text-2xl font-bold rounded-md border-2 border-gray-500">T</div>
                        </div>
                    </div>
                    <div className="text-center text-xs sm:text-sm text-muted-foreground">
                        <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mt-3 sm:mt-4">
                            <div className="flex items-center gap-1 sm:gap-2">
                                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-sm"></div>
                                <span>Correct spot</span>
                            </div>
                            <div className="flex items-center gap-1 sm:gap-2">
                                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-yellow-500 rounded-sm"></div>
                                <span>Wrong spot</span>
                            </div>
                            <div className="flex items-center gap-1 sm:gap-2">
                                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-500 rounded-sm"></div>
                                <span>Not in word</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.footer className="w-full mt-6 sm:mt-8 text-center text-xs sm:text-sm text-muted-foreground" variants={itemVariants}>
                    <p>© 2025 Wordle Game. All rights reserved.</p>
                </motion.footer>
            </motion.div>
        </div>
    );
}