import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, query, onSnapshot } from 'firebase/firestore';
import { Home, LayoutDashboard, User, Palette, Sparkles, LogOut, Menu, X } from 'lucide-react'; // Using lucide-react for icons

// Main App Component
const App = () => {
    // State to manage current page view (simulates routing)
    const [currentPage, setCurrentPage] = useState('home');
    // State for Firebase/Supabase initialization and user ID
    const [db, setDb] = useState(null);
    const [auth, setAuth] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Initialize Firebase and set up authentication listener
    useEffect(() => {
        try {
            // Retrieve Firebase config and app ID from global variables
            const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
            const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
            const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

            // Initialize Firebase app
            const app = initializeApp(firebaseConfig);
            const firestoreDb = getFirestore(app);
            const firebaseAuth = getAuth(app);

            setDb(firestoreDb);
            setAuth(firebaseAuth);

            // Listen for authentication state changes
            const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
                if (user) {
                    setUserId(user.uid);
                } else {
                    // Sign in anonymously if no user is authenticated and no custom token is provided
                    if (!initialAuthToken) {
                        await signInAnonymously(firebaseAuth);
                    }
                }
                setIsAuthReady(true); // Mark authentication as ready
            });

            // Sign in with custom token if available
            const signIn = async () => {
                if (initialAuthToken) {
                    try {
                        await signInWithCustomToken(firebaseAuth, initialAuthToken);
                    } catch (error) {
                        console.error("Error signing in with custom token:", error);
                        await signInAnonymously(firebaseAuth); // Fallback to anonymous
                    }
                } else {
                    await signInAnonymously(firebaseAuth);
                }
            };
            signIn();

            return () => unsubscribe(); // Cleanup auth listener on component unmount
        } catch (error) {
            console.error("Error initializing Firebase:", error);
        }
    }, []);

    // Function to navigate between pages
    const navigateTo = (page) => {
        setCurrentPage(page);
        setIsMobileMenuOpen(false); // Close mobile menu on navigation
    };

    // Render different pages based on currentPage state
    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return (
                    <>
                        <HeroSection navigateTo={navigateTo} />
                        <FeaturesSection />
                        <CallToActionSection navigateTo={navigateTo} />
                    </>
                );
            case 'dashboard':
                return <DashboardPage db={db} auth={auth} userId={userId} isAuthReady={isAuthReady} />;
            case 'profile':
                return <ProfilePage db={db} auth={auth} userId={userId} isAuthReady={isAuthReady} />;
            case 'brand-tone':
                return <BrandTonePage db={db} auth={auth} userId={userId} isAuthReady={isAuthReady} />;
            default:
              return (
                <>
                    <HeroSection navigateTo={navigateTo} />
                    <FeaturesSection />
                    <CallToActionSection navigateTo={navigateTo} />
                </>
            );
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-inter text-gray-800 flex flex-col">
            <Header navigateTo={navigateTo} userId={userId} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
            <main className="flex-grow">
                {renderPage()}
            </main>
            <Footer />
        </div>
    );
};

// Header Component
const Header = ({ navigateTo, userId, isMobileMenuOpen, setIsMobileMenuOpen }) => {
    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center">
                    <a href="#" onClick={() => navigateTo('home')} className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors duration-300">
                        <Sparkles className="h-8 w-8" />
                        <span className="font-bold text-2xl">ContentForge</span>
                    </a>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-6">
                    <NavLink icon={<Home className="h-5 w-5" />} text="Home" onClick={() => navigateTo('home')} />
                    <NavLink icon={<LayoutDashboard className="h-5 w-5" />} text="Dashboard" onClick={() => navigateTo('dashboard')} />
                    <NavLink icon={<User className="h-5 w-5" />} text="Profile" onClick={() => navigateTo('profile')} />
                    <NavLink icon={<Palette className="h-5 w-5" />} text="Brand Tone" onClick={() => navigateTo('brand-tone')} />
                    <button
                        onClick={() => navigateTo('dashboard')}
                        className="bg-purple-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                    >
                        Get Started
                    </button>
                    {userId && (
                        <span className="text-sm text-gray-600 px-3 py-1 bg-gray-100 rounded-full">
                            User ID: {userId}
                        </span>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center">
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600 hover:text-gray-800 focus:outline-none">
                        {isMobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Navigation Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white shadow-lg py-4 transition-all duration-300 ease-in-out">
                    <div className="flex flex-col items-center space-y-4">
                        <NavLink icon={<Home className="h-5 w-5" />} text="Home" onClick={() => navigateTo('home')} />
                        <NavLink icon={<LayoutDashboard className="h-5 w-5" />} text="Dashboard" onClick={() => navigateTo('dashboard')} />
                        <NavLink icon={<User className="h-5 w-5" />} text="Profile" onClick={() => navigateTo('profile')} />
                        <NavLink icon={<Palette className="h-5 w-5" />} text="Brand Tone" onClick={() => navigateTo('brand-tone')} />
                        <button
                            onClick={() => navigateTo('dashboard')}
                            className="w-full max-w-xs bg-purple-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                        >
                            Get Started
                        </button>
                        {userId && (
                            <span className="text-sm text-gray-600 px-3 py-1 bg-gray-100 rounded-full">
                                User ID: {userId}
                            </span>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

// Reusable Navigation Link Component
const NavLink = ({ icon, text, onClick }) => (
    <button
        onClick={onClick}
        className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors duration-300 px-3 py-2 rounded-md hover:bg-gray-100 focus:outline-none"
    >
        {icon}
        <span>{text}</span>
    </button>
);

// Hero Section Component (Landing Page)
const HeroSection = ({ navigateTo }) => {
    return (
        <section className="bg-gradient-to-br from-purple-50 to-blue-50 py-20 md:py-32 text-center relative overflow-hidden">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6 animate-fade-in-up">
                    Unleash Your Content Superpowers with AI
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-10 animate-fade-in-up animation-delay-200">
                    Generate captivating social media posts, blogs, and more, tailored to your brand's voice, in seconds.
                </p>
                <button
                    onClick={() => navigateTo('dashboard')}
                    className="bg-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300 animate-fade-in-up animation-delay-400"
                >
                    Start Creating for Free
                </button>
            </div>
            {/* Abstract background shapes */}
            <div className="absolute -bottom-1/4 -left-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
            <div className="absolute -top-1/4 -right-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-1000"></div>
        </section>
    );
};

// Features Section (Landing Page)
const FeaturesSection = () => {
    const features = [
        {
            icon: <Sparkles className="h-10 w-10 text-purple-600" />,
            title: "AI-Powered Content Generation",
            description: "Craft engaging posts, articles, and captions with intelligent AI suggestions."
        },
        {
            icon: <Palette className="h-10 w-10 text-blue-600" />,
            title: "Custom Brand Voice",
            description: "Define your unique brand tone and ensure all content aligns perfectly."
        },
        {
            icon: <LayoutDashboard className="h-10 w-10 text-green-600" />,
            title: "Intuitive Dashboard",
            description: "Manage all your content, projects, and clients from one central hub."
        },
        {
            icon: <Home className="h-10 w-10 text-red-600" />,
            title: "Seamless Client Management",
            description: "Organize content for multiple clients with dedicated workspaces."
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
                    Features Designed for Social Media Pros
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-center border border-gray-100"
                        >
                            <div className="mb-4 flex justify-center">{feature.icon}</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Call To Action Section (Landing Page)
const CallToActionSection = ({ navigateTo }) => {
    return (
        <section className="bg-purple-600 py-16 text-white text-center">
            <div className="container mx-auto px-4 max-w-3xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Content Workflow?</h2>
                <p className="text-lg mb-8 opacity-90">
                    Join thousands of social media managers and freelancers who are supercharging their content creation with AI.
                </p>
                <button
                    onClick={() => navigateTo('dashboard')}
                    className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
                >
                    Get Started Now
                </button>
            </div>
        </section>
    );
};

// Footer Component
const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-12">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Company Info */}
                <div>
                    <a href="#" className="flex items-center space-x-2 text-white mb-4">
                        <Sparkles className="h-6 w-6" />
                        <span className="font-bold text-xl">ContentForge</span>
                    </a>
                    <p className="text-sm">
                        AI-powered content creation for social media managers and freelancers.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-purple-400 transition-colors duration-300">Home</a></li>
                        <li><a href="#" className="hover:text-purple-400 transition-colors duration-300">Features</a></li>
                        <li><a href="#" className="hover:text-purple-400 transition-colors duration-300">Pricing</a></li>
                        <li><a href="#" className="hover:text-purple-400 transition-colors duration-300">Blog</a></li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h3 className="text-white font-semibold mb-4">Support</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-purple-400 transition-colors duration-300">Help Center</a></li>
                        <li><a href="#" className="hover:text-purple-400 transition-colors duration-300">Contact Us</a></li>
                        <li><a href="#" className="hover:text-purple-400 transition-colors duration-300">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-purple-400 transition-colors duration-300">Terms of Service</a></li>
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h3 className="text-white font-semibold mb-4">Connect With Us</h3>
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33V22H12c5.523 0 10-4.477 10-10z" clipRule="evenodd" />
                            </svg>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M12.0001 7.37764C9.33282 7.37764 7.16669 9.55745 7.16669 12.2223C7.16669 14.8871 9.33282 17.0669 12.0001 17.0669C14.6673 17.0669 16.8335 14.8871 16.8335 12.2223C16.8335 9.55745 14.6673 7.37764 12.0001 7.37764ZM12.0001 15.3223C10.2337 15.3223 8.79187 13.8799 8.79187 12.2223C8.79187 10.5647 10.2337 9.12232 12.0001 9.12232C13.7664 9.12232 15.2083 10.5647 15.2083 12.2223C15.2083 13.8799 13.7664 15.3223 12.0001 15.3223ZM18.3335 6.40024C18.3335 5.86687 17.9001 5.4335 17.3668 5.4335C16.8335 5.4335 16.4001 5.86687 16.4001 6.40024C16.4001 6.93361 16.8335 7.36698 17.3668 7.36698C17.9001 7.36698 18.3335 6.93361 18.3335 6.40024ZM12.0001 0.222305C15.2531 0.222305 15.6832 0.235555 16.8083 0.286305C17.9334 0.337055 18.6839 0.509722 19.3195 0.758472C19.9868 1.02322 20.5404 1.39322 21.1001 1.95297C21.6599 2.51272 22.0299 3.06631 22.2946 3.73361C22.5434 4.36922 22.7161 5.11972 22.7668 6.2448C22.8176 7.3699 22.8308 7.79997 22.8308 11.053C22.8308 14.3061 22.8176 14.7361 22.7668 15.8612C22.7161 16.9863 22.5434 17.7368 22.2946 18.3724C22.0299 19.0397 21.6599 19.5933 21.1001 20.1531C20.5404 20.7128 19.9868 21.0828 19.3195 21.3476C18.6839 21.5963 17.9334 21.769 16.8083 21.8198C15.6832 21.8705 15.2531 21.8838 12.0001 21.8838C8.74705 21.8838 8.31405 21.8705 7.189 21.8198C6.06392 21.769 5.31342 21.5963 4.67781 21.3476C4.01051 21.0828 3.45692 20.7128 2.89717 20.1531C2.33742 19.5933 1.96742 19.0397 1.70267 18.3724C1.45392 17.7368 1.28125 16.9863 1.2305 15.8612C1.17975 14.7361 1.1665 14.3061 1.1665 11.053C1.1665 7.79997 1.17975 7.3699 1.2305 6.2448C1.28125 5.11972 1.45392 4.36922 1.70267 3.73361C1.96742 3.06631 2.33742 2.51272 2.89717 1.95297C3.45692 1.39322 4.01051 1.02322 4.67781 0.758472C5.31342 0.509722 6.06392 0.337055 7.189 0.286305C8.31405 0.235555 8.74705 0.222305 12.0001 0.222305Z" />
                            </svg>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 10.702v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.844" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            <div className="text-center text-sm text-gray-500 mt-8 border-t border-gray-800 pt-8">
                &copy; {new Date().getFullYear()} ContentForge. All rights reserved.
            </div>
        </footer>
    );
};

// Dashboard Page Component
const DashboardPage = ({ db, auth, userId, isAuthReady }) => {
    const [contentList, setContentList] = useState([]);
    const [newContentPrompt, setNewContentPrompt] = useState('');
    const [isLoadingAI, setIsLoadingAI] = useState(false);
    const [aiResponse, setAiResponse] = useState('');
    const [showAiModal, setShowAiModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    // Fetch content from Firestore (or Supabase)
    useEffect(() => {
        if (!isAuthReady || !db || !userId) {
            console.log("Firestore not ready or user not authenticated for DashboardPage.");
            return;
        }

        // Define the collection path based on Firestore security rules
        // For private user data: /artifacts/{appId}/users/{userId}/content
        // For public/shared data: /artifacts/{appId}/public/data/content
        const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
        const contentCollectionPath = `artifacts/${appId}/users/${userId}/content`;
        const q = collection(db, contentCollectionPath);

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const items = [];
            snapshot.forEach((doc) => {
                items.push({ id: doc.id, ...doc.data() });
            });
            setContentList(items);
        }, (error) => {
            console.error("Error fetching content:", error);
        });

        return () => unsubscribe(); // Clean up the listener
    }, [db, userId, isAuthReady]);

    // Function to save new content
    const saveContent = async (content) => {
        if (!isAuthReady || !db || !userId) {
            console.log("Firestore not ready or user not authenticated for saving content.");
            return;
        }
        const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
        const contentCollectionPath = `artifacts/${appId}/users/${userId}/content`;
        try {
            // Add a new document to the 'content' collection
            await setDoc(doc(collection(db, contentCollectionPath)), {
                text: content,
                createdAt: new Date().toISOString(),
                // Add other relevant fields like 'type', 'client_id', etc.
            });
            console.log("Content saved successfully!");
            setNewContentPrompt(''); // Clear prompt after saving
            setAiResponse(''); // Clear AI response
            setShowAiModal(false); // Close modal
        } catch (error) {
            console.error("Error saving content:", error);
        }
    };

    // Function to delete content
    const deleteContent = async (id) => {
        if (!isAuthReady || !db || !userId) {
            console.log("Firestore not ready or user not authenticated for deleting content.");
            return;
        }
        const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
        const contentDocPath = `artifacts/${appId}/users/${userId}/content/${id}`;
        try {
            await deleteDoc(doc(db, contentDocPath));
            console.log("Content deleted successfully!");
            setShowConfirmModal(false); // Close confirmation modal
            setItemToDelete(null); // Clear item to delete
        } catch (error) {
            console.error("Error deleting content:", error);
        }
    };

    // Function to generate content using AI
    const generateAIContent = async () => {
        if (!newContentPrompt.trim()) {
            setAiResponse("Please enter a prompt to generate content.");
            setShowAiModal(true);
            return;
        }

        setIsLoadingAI(true);
        setAiResponse('');
        setShowAiModal(true); // Open modal to show loading state

        try {
            let chatHistory = [];
            chatHistory.push({ role: "user", parts: [{ text: newContentPrompt }] });
            const payload = { contents: chatHistory };
            const apiKey = ""; // Canvas will automatically provide the API key at runtime

            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                const text = result.candidates[0].content.parts[0].text;
                setAiResponse(text);
            } else {
                setAiResponse("Could not generate content. Please try again.");
                console.error("Unexpected AI response structure:", result);
            }
        } catch (error) {
            console.error("Error generating AI content:", error);
            setAiResponse("Failed to generate content. Please check your network or try again later.");
        } finally {
            setIsLoadingAI(false);
        }
    };

    const handleConfirmDelete = (id) => {
        setItemToDelete(id);
        setShowConfirmModal(true);
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen-minus-header">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-gray-800 text-white p-6 md:p-8 flex-shrink-0">
                <nav className="space-y-4">
                    <h2 className="text-xl font-semibold mb-4 text-gray-200">Dashboard</h2>
                    <DashboardNavLink icon={<LayoutDashboard />} text="Overview" />
                    <DashboardNavLink icon={<Sparkles />} text="Content Library" />
                    <DashboardNavLink icon={<Home />} text="Clients" />
                    <DashboardNavLink icon={<User />} text="Team" />
                    <DashboardNavLink icon={<LogOut />} text="Logout" />
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="flex-grow bg-gray-50 p-6 md:p-10">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Content Dashboard</h1>

                {/* AI Content Generation Section */}
                <div className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-100">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Generate New Content with AI</h2>
                    <textarea
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-y min-h-[120px]"
                        placeholder="e.g., 'Write a short, engaging Instagram caption for a new coffee shop promoting their latte art.' or 'Draft a blog post outline about the benefits of remote work.'"
                        value={newContentPrompt}
                        onChange={(e) => setNewContentPrompt(e.target.value)}
                    ></textarea>
                    <button
                        onClick={generateAIContent}
                        className="mt-4 bg-purple-600 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                        disabled={isLoadingAI}
                    >
                        {isLoadingAI ? 'Generating...' : 'Generate Content'}
                    </button>
                </div>

                {/* AI Response Modal */}
                {showAiModal && (
                    <Modal onClose={() => setShowAiModal(false)}>
                        <h3 className="text-xl font-semibold mb-4">AI Generated Content</h3>
                        {isLoadingAI ? (
                            <div className="flex items-center justify-center py-8">
                                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-500"></div>
                                <p className="ml-4 text-gray-600">Generating content, please wait...</p>
                            </div>
                        ) : (
                            <>
                                <div className="bg-gray-100 p-4 rounded-lg border border-gray-200 text-gray-800 whitespace-pre-wrap max-h-96 overflow-y-auto">
                                    {aiResponse || "No content generated yet. Try a different prompt!"}
                                </div>
                                <div className="mt-6 flex justify-end space-x-3">
                                    <button
                                        onClick={() => {
                                            if (aiResponse) {
                                                saveContent(aiResponse);
                                            } else {
                                                setShowAiModal(false); // Just close if no content
                                            }
                                        }}
                                        className="bg-green-500 text-white px-5 py-2 rounded-full hover:bg-green-600 transition-colors duration-300 disabled:opacity-50"
                                        disabled={!aiResponse}
                                    >
                                        Save Content
                                    </button>
                                    <button
                                        onClick={() => {
                                            // Copy to clipboard
                                            document.execCommand('copy');
                                            const el = document.createElement('textarea');
                                            el.value = aiResponse;
                                            document.body.appendChild(el);
                                            el.select();
                                            document.execCommand('copy');
                                            document.body.removeChild(el);
                                            alert("Content copied to clipboard!"); // Using alert for simplicity, replace with custom message box in production
                                        }}
                                        className="bg-blue-500 text-white px-5 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300 disabled:opacity-50"
                                        disabled={!aiResponse}
                                    >
                                        Copy
                                    </button>
                                    <button
                                        onClick={() => setShowAiModal(false)}
                                        className="bg-gray-300 text-gray-800 px-5 py-2 rounded-full hover:bg-gray-400 transition-colors duration-300"
                                    >
                                        Close
                                    </button>
                                </div>
                            </>
                        )}
                    </Modal>
                )}

                {/* Confirmation Modal */}
                {showConfirmModal && (
                    <Modal onClose={() => setShowConfirmModal(false)}>
                        <h3 className="text-xl font-semibold mb-4">Confirm Deletion</h3>
                        <p className="text-gray-700 mb-6">Are you sure you want to delete this content? This action cannot be undone.</p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => {
                                    deleteContent(itemToDelete);
                                }}
                                className="bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-600 transition-colors duration-300"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => setShowConfirmModal(false)}
                                className="bg-gray-300 text-gray-800 px-5 py-2 rounded-full hover:bg-gray-400 transition-colors duration-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </Modal>
                )}


                {/* Recent Content Section */}
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Recent Content</h2>
                    {contentList.length === 0 ? (
                        <p className="text-gray-600">No content created yet. Start generating above!</p>
                    ) : (
                        <div className="space-y-4">
                            {contentList.map((content) => (
                                <div key={content.id} className="border border-gray-200 p-4 rounded-lg flex justify-between items-start bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                                    <p className="text-gray-700 flex-grow pr-4">{content.text}</p>
                                    <button
                                        onClick={() => handleConfirmDelete(content.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded-full text-sm hover:bg-red-600 transition-colors duration-300"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

// Reusable Dashboard Navigation Link
const DashboardNavLink = ({ icon, text }) => (
    <a href="#" className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-700 px-4 py-2 rounded-md transition-colors duration-300">
        {icon && React.cloneElement(icon, { className: "h-5 w-5" })}
        <span>{text}</span>
    </a>
);

// Profile Page Component
const ProfilePage = ({ db, auth, userId, isAuthReady }) => {
    const [profileData, setProfileData] = useState({ name: '', email: '', bio: '' });
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success' or 'error'

    useEffect(() => {
        if (!isAuthReady || !db || !userId) {
            console.log("Firestore not ready or user not authenticated for ProfilePage.");
            return;
        }

        const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
        const userDocRef = doc(db, `artifacts/${appId}/users/${userId}/profile/data`);

        const fetchProfile = async () => {
            try {
                const docSnap = await getDoc(userDocRef);
                if (docSnap.exists()) {
                    setProfileData(docSnap.data());
                } else {
                    console.log("No profile data found for user:", userId);
                }
            } catch (error) {
                console.error("Error fetching profile data:", error);
                setMessage("Error fetching profile data.");
                setMessageType('error');
            }
        };

        fetchProfile();
    }, [db, userId, isAuthReady]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isAuthReady || !db || !userId) {
            setMessage("Authentication not ready. Please try again.");
            setMessageType('error');
            return;
        }

        const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
        const userDocRef = doc(db, `artifacts/${appId}/users/${userId}/profile/data`);

        try {
            await setDoc(userDocRef, profileData, { merge: true });
            setMessage("Profile updated successfully!");
            setMessageType('success');
        } catch (error) {
            console.error("Error updating profile:", error);
            setMessage("Error updating profile. Please try again.");
            setMessageType('error');
        } finally {
            // Clear message after a few seconds
            setTimeout(() => {
                setMessage('');
                setMessageType('');
            }, 3000);
        }
    };

    return (
        <div className="container mx-auto p-6 md:p-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Profile Settings</h1>
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 max-w-2xl mx-auto">
                {message && (
                    <div className={`p-3 mb-4 rounded-lg ${messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {message}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={profileData.name}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                            placeholder="John Doe"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={profileData.email}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                            placeholder="john.doe@example.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Bio / About You</label>
                        <textarea
                            id="bio"
                            name="bio"
                            value={profileData.bio}
                            onChange={handleChange}
                            rows="4"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-y"
                            placeholder="Tell us a little about yourself and your work..."
                        ></textarea>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-purple-600 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Brand Tone Page Component
const BrandTonePage = ({ db, auth, userId, isAuthReady }) => {
    const [brandTone, setBrandTone] = useState({ description: '', keywords: '', targetAudience: '' });
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success' or 'error'

    useEffect(() => {
        if (!isAuthReady || !db || !userId) {
            console.log("Firestore not ready or user not authenticated for BrandTonePage.");
            return;
        }

        const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
        const brandToneDocRef = doc(db, `artifacts/${appId}/users/${userId}/brandTone/data`);

        const fetchBrandTone = async () => {
            try {
                const docSnap = await getDoc(brandToneDocRef);
                if (docSnap.exists()) {
                    setBrandTone(docSnap.data());
                } else {
                    console.log("No brand tone data found for user:", userId);
                }
            } catch (error) {
                console.error("Error fetching brand tone data:", error);
                setMessage("Error fetching brand tone data.");
                setMessageType('error');
            }
        };

        fetchBrandTone();
    }, [db, userId, isAuthReady]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBrandTone(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isAuthReady || !db || !userId) {
            setMessage("Authentication not ready. Please try again.");
            setMessageType('error');
            return;
        }

        const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
        const brandToneDocRef = doc(db, `artifacts/${appId}/users/${userId}/brandTone/data`);

        try {
            await setDoc(brandToneDocRef, brandTone, { merge: true });
            setMessage("Brand tone updated successfully!");
            setMessageType('success');
        } catch (error) {
            console.error("Error updating brand tone:", error);
            setMessage("Error updating brand tone. Please try again.");
            setMessageType('error');
        } finally {
            // Clear message after a few seconds
            setTimeout(() => {
                setMessage('');
                setMessageType('');
            }, 3000);
        }
    };

    return (
        <div className="container mx-auto p-6 md:p-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Define Your Brand Tone</h1>
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 max-w-2xl mx-auto">
                {message && (
                    <div className={`p-3 mb-4 rounded-lg ${messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {message}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Brand Tone Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={brandTone.description}
                            onChange={handleChange}
                            rows="6"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-y"
                            placeholder="Describe your brand's voice: e.g., 'Friendly, professional, slightly humorous, and informative.'"
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="keywords" className="block text-sm font-medium text-gray-700 mb-1">Key Keywords/Phrases</label>
                        <input
                            type="text"
                            id="keywords"
                            name="keywords"
                            value={brandTone.keywords}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                            placeholder="e.g., 'innovation, community, growth, simplify, empower'"
                        />
                        <p className="mt-1 text-sm text-gray-500">Comma-separated keywords that define your brand.</p>
                    </div>
                    <div>
                        <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-700 mb-1">Target Audience</label>
                        <input
                            type="text"
                            id="targetAudience"
                            name="targetAudience"
                            value={brandTone.targetAudience}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                            placeholder="e.g., 'Small business owners, marketing agencies, social media managers'"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-purple-600 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                        >
                            Save Brand Tone
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Reusable Modal Component
const Modal = ({ children, onClose }) => {
    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full relative transform transition-all duration-300 scale-95 opacity-0 animate-scale-in">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                    <X className="h-6 w-6" />
                </button>
                {children}
            </div>
        </div>
    );
};


// CSS for animations (can be added to a global CSS file or <style> tag in index.html)
// For simplicity, these are included here but ideally would be in a separate CSS file.
const GlobalStyles = () => (
    <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

        body {
            font-family: 'Inter', sans-serif;
        }

        .min-h-screen-minus-header {
            min-height: calc(100vh - 80px); /* Adjust 80px based on your header's height */
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes blob {
            0% {
                transform: translate(0px, 0px) scale(1);
            }
            33% {
                transform: translate(30px, -50px) scale(1.1);
            }
            66% {
                transform: translate(-20px, 20px) scale(0.9);
            }
            100% {
                transform: translate(0px, 0px) scale(1);
            }
        }

        @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
        }

        .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
        }

        .animate-fade-in-up {
            animation: fadeInUp 0.6s ease-out forwards;
        }

        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-1000 { animation-delay: 1s; }

        .animate-blob {
            animation: blob 7s infinite cubic-bezier(0.68, -0.55, 0.27, 1.55);
        }

        .animate-scale-in {
            animation: scaleIn 0.3s ease-out forwards;
        }
        `}
    </style>
);

// Export the main App component and GlobalStyles
export default function ContentForgeApp() {
    return (
        <>
            <GlobalStyles />
            <App />
        </>
    );
}

