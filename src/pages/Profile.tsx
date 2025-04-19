import { useState, useEffect } from "react";
import { ArrowLeft, Save, User, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../store/UserContext";
import { useStatistics } from "../store/StatisticsContext";

export default function Profile() {
    const navigate = useNavigate();
    const { userProfile, setUsername, isLoggedIn, logout } = useUser();
    const { statistics } = useStatistics();
    
    const [formData, setFormData] = useState({
        username: userProfile?.username || "",
    });
    
    const [errors, setErrors] = useState({
        username: "",
    });
    
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
    const [isEditing, setIsEditing] = useState(!isLoggedIn);
    
    const winRate = statistics.totalGames > 0 
        ? Math.round((statistics.totalWins / statistics.totalGames) * 100) 
        : 0;
    
    useEffect(() => {
        if (userProfile) {
            setFormData({
                username: userProfile.username,
            });
        }
    }, [userProfile]);
    
    const validateUsername = (username: string): string => {
        if (!username.trim()) {
            return "Username is required";
        }
        if (username.length < 3) {
            return "Username must be at least 3 characters";
        }
        if (username.length > 20) {
            return "Username must be less than 20 characters";
        }
        if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            return "Username can only contain letters, numbers, and underscores";
        }
        return "";
    };
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setErrors({
            ...errors,
            [name]: "",
        });
        setSubmitStatus("idle");
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const usernameError = validateUsername(formData.username);
        
        if (usernameError) {
            setErrors({
                ...errors,
                username: usernameError,
            });
            setSubmitStatus("error");
            return;
        }
        setUsername(formData.username);
        setSubmitStatus("success");
        setIsEditing(false);
        setTimeout(() => {
            setSubmitStatus("idle");
        }, 3000);
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
                
                <h1 className="text-2xl sm:text-4xl font-bold">Profile Settings</h1>
                
                <div className="w-10 h-10 sm:w-12 sm:h-12"></div>
            </div>

            <div className="w-full max-w-md bg-card/50 rounded-lg p-4 sm:p-6 shadow-md">
                {isLoggedIn && !isEditing ? (
                    <div className="mb-6">
                        <div className="flex flex-col items-center justify-center p-4 bg-background rounded-md mb-4">
                            <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mb-4">
                                <User className="w-10 h-10 text-primary-foreground" />
                            </div>
                            <h2 className="text-xl font-semibold">{userProfile?.username}</h2>
                            <p className="text-sm text-muted-foreground mt-1">
                                Member since {userProfile?.createdAt ? new Date(userProfile.createdAt).toLocaleDateString() : ''}
                            </p>
                        </div>
                        
                        <div className="flex justify-center gap-4 mt-4">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/80 transition-colors"
                            >
                                Edit Profile
                            </button>
                            <button
                                onClick={logout}
                                className="px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/80 transition-colors"
                            >
                                Log Out
                            </button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label 
                                htmlFor="username" 
                                className="block text-sm font-medium mb-1"
                            >
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                className={`w-full p-2 bg-background rounded-md border ${
                                    errors.username ? 'border-destructive' : 'border-primary/20'
                                }`}
                                placeholder="Enter a username"
                            />
                            {errors.username && (
                                <p className="mt-1 text-sm text-destructive flex items-center">
                                    <AlertCircle className="w-3 h-3 mr-1" />
                                    {errors.username}
                                </p>
                            )}
                            <p className="mt-1 text-xs text-muted-foreground">
                                Username must be 3-20 characters and can only contain letters, numbers, and underscores.
                            </p>
                        </div>
                        
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className={`px-4 py-2 rounded-md flex items-center ${
                                    submitStatus === 'success'
                                        ? 'bg-green-500 text-white'
                                        : 'bg-primary text-primary-foreground hover:bg-primary/80'
                                } transition-colors`}
                                disabled={submitStatus === 'success'}
                            >
                                <Save className="w-4 h-4 mr-2" />
                                {submitStatus === 'success' ? 'Saved!' : 'Save Profile'}
                            </button>
                        </div>
                        
                        {submitStatus === 'success' && (
                            <div className="mt-2 p-2 bg-green-500/10 text-green-500 rounded-md text-sm flex items-center">
                                <AlertCircle className="w-4 h-4 mr-2" />
                                Profile updated successfully!
                            </div>
                        )}
                    </form>
                )}
            </div>
            
            {isLoggedIn && (
                <div className="w-full max-w-md bg-card/50 rounded-lg p-4 sm:p-6 shadow-md mt-4">
                    <h2 className="text-xl font-semibold mb-4">Game Statistics</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-background p-3 rounded-md">
                            <h3 className="text-sm font-medium text-muted-foreground">Total Games</h3>
                            <p className="text-2xl font-bold">{statistics.totalGames}</p>
                        </div>
                        <div className="bg-background p-3 rounded-md">
                            <h3 className="text-sm font-medium text-muted-foreground">Win Rate</h3>
                            <p className="text-2xl font-bold">{winRate}%</p>
                        </div>
                        <div className="bg-background p-3 rounded-md">
                            <h3 className="text-sm font-medium text-muted-foreground">Total Wins</h3>
                            <p className="text-2xl font-bold">{statistics.totalWins}</p>
                        </div>
                        <div className="bg-background p-3 rounded-md">
                            <h3 className="text-sm font-medium text-muted-foreground">Current Streak</h3>
                            <p className="text-2xl font-bold">{statistics.totalWins}</p>
                        </div>
                    </div>
                </div>
            )}
            
            <div className="mt-6 text-center">
                <button 
                    onClick={() => navigate("/game")}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/80 transition-colors"
                >
                    Play Game
                </button>
            </div>
        </div>
    );
} 