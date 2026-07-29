import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import Layout from "../components/Layout";
import "../styles/dashboard.css";

function Dashboard() {

    const navigate = useNavigate();

    const [stats, setStats] = useState({
        totalDocuments: 0,
        totalSummaries: 0,
        totalInterviews: 0,
        totalChats: 0,
        recentDocuments: [],
    });

    useEffect(() => {

        const loadDashboard = async () => {

            try {

                const response = await api.get("/dashboard");

                setStats(response.data);

            } catch (error) {

                console.error("Failed to load dashboard", error);

            }

        };

        loadDashboard();

    }, []);

    return (

        <Layout>

            <div className="container-fluid">

                {/* Dashboard Header */}

                <div className="dashboard-header mb-5">

                    <h1 className="dashboard-title">
                        🚀 Welcome to DevDocsAI
                    </h1>

                    <p className="dashboard-subtitle">
                        Upload PDFs, generate AI summaries, create flashcards,
                        quizzes, study notes and chat with your documents.
                    </p>

                </div>

                {/* Statistics */}

                <div className="row g-4 mb-5">

                    <div className="col-lg-3 col-md-6">

                        <div className="stat-card">

                            <div className="stat-icon">📄</div>

                            <div className="stat-title">
                                Documents
                            </div>

                            <div className="stat-number">
                                {stats.totalDocuments}
                            </div>

                        </div>

                    </div>

                    <div className="col-lg-3 col-md-6">

                        <div className="stat-card">

                            <div className="stat-icon">🤖</div>

                            <div className="stat-title">
                                AI Summaries
                            </div>

                            <div className="stat-number">
                                {stats.totalSummaries}
                            </div>

                        </div>

                    </div>

                    <div className="col-lg-3 col-md-6">

                        <div className="stat-card">

                            <div className="stat-icon">💬</div>

                            <div className="stat-title">
                                AI Chats
                            </div>

                            <div className="stat-number">
                                {stats.totalChats}
                            </div>

                        </div>

                    </div>

                    <div className="col-lg-3 col-md-6">

                        <div className="stat-card">

                            <div className="stat-icon">🎯</div>

                            <div className="stat-title">
                                Interview Questions
                            </div>

                            <div className="stat-number">
                                {stats.totalInterviews}
                            </div>

                        </div>

                    </div>

                </div>

                {/* Quick Actions */}

                <h2 className="mb-4">
                    ⚡ Quick Actions
                </h2>

                <div className="row g-4 mb-5">

                    {/* Upload */}

                    <div className="col-lg-4 col-md-6">

                        <div
                            className="menu-card"
                            onClick={() => navigate("/upload")}
                        >

                            <h1>📄</h1>

                            <h5>Upload PDF</h5>

                            <p>
                                Upload and process your documents.
                            </p>

                        </div>

                    </div>

                    {/* Documents */}

                    <div className="col-lg-4 col-md-6">

                        <div
                            className="menu-card"
                            onClick={() => navigate("/documents")}
                        >

                            <h1>📚</h1>

                            <h5>My Documents</h5>

                            <p>
                                Browse and manage uploaded PDFs.
                            </p>

                        </div>

                    </div>

                    {/* AI Tools */}

                    <div className="col-lg-4 col-md-6">

                        <div
                            className="menu-card"
                            onClick={() => navigate("/ai-tools")}
                        >

                            <h1>🤖</h1>

                            <h5>AI Tools</h5>

                            <p>
                                Summary, Quiz, Flashcards & Notes.
                            </p>

                        </div>

                    </div>

                    {/* AI Chat */}

                    <div className="col-lg-4 col-md-6">

                        <div
                            className="menu-card"
                            onClick={() => navigate("/chat")}
                        >

                            <h1>💬</h1>

                            <h5>AI Chat</h5>

                            <p>
                                Ask questions about your uploaded PDF.
                            </p>

                        </div>

                    </div>

                    {/* Profile */}

                    <div className="col-lg-4 col-md-6">

                        <div
                            className="menu-card"
                            onClick={() => navigate("/profile")}
                        >

                            <h1>👤</h1>

                            <h5>Profile</h5>

                            <p>
                                View and manage your account.
                            </p>

                        </div>

                    </div>

                    {/* Interview */}

                    <div className="col-lg-4 col-md-6">

                        <div
                            className="menu-card"
                            onClick={() => navigate("/select-document/interview")}
                        >

                            <h1>🎯</h1>

                            <h5>Interview Prep</h5>

                            <p>
                                Generate AI interview questions.
                            </p>

                        </div>

                    </div>

                </div>

                {/* Recent Documents */}

                <h2 className="mb-4">
                    📄 Recent Documents
                </h2>

                <div className="row">

                    {stats.recentDocuments.length === 0 ? (

                        <div className="col-12">

                            <div className="alert alert-info">
                                No recent documents found.
                            </div>

                        </div>

                    ) : (

                        stats.recentDocuments.map((doc) => (

                            <div
                                className="col-lg-4 col-md-6 mb-4"
                                key={doc.id}
                            >

                                <div className="recent-card h-100">

                                    <h5 className="recent-title">
                                        📘 {doc.fileName}
                                    </h5>

                                    <p className="recent-date">
                                        {doc.fileType}
                                    </p>

                                    <p>
                                        {(doc.fileSize / 1024).toFixed(2)} KB
                                    </p>

                                    <button
                                        className="btn btn-outline-primary w-100 mt-3"
                                        onClick={() => navigate("/documents")}
                                    >
                                        Open Document
                                    </button>

                                </div>

                            </div>

                        ))

                    )}

                </div>

            </div>

        </Layout>

    );

}

export default Dashboard;