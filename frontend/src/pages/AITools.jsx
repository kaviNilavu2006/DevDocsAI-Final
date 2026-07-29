import Layout from "../components/Layout";
import "../styles/aitools.css";
import { useNavigate } from "react-router-dom";

function AITools() {

    const navigate = useNavigate();

    const tools = [

        {
            icon: "📝",
            title: "AI Summary",
            description: "Generate concise summaries from your PDF in seconds.",
            route: "/select-document/summary"
        },

        {
            icon: "📘",
            title: "Study Notes",
            description: "Convert documents into easy revision notes.",
            route: "/select-document/notes"
        },

        {
            icon: "🃏",
            title: "Flashcards",
            description: "Create AI-powered flashcards for quick learning.",
            route: "/select-document/flashcards"
        },

        {
            icon: "📋",
            title: "Quiz Generator",
            description: "Generate MCQs and test your knowledge instantly.",
            route: "/select-document/quiz"
        },



        {
            icon: "🎯",
            title: "Interview Questions",
            description: "Prepare for placements using AI-generated questions.",
            route: "/select-document/interview"
        }

    ];

    return (

        <Layout>

            <div className="container-fluid">

                <h1 className="page-title">
                    🤖 AI Tools
                </h1>

                <p className="page-subtitle">
                    Choose an AI-powered tool to enhance your learning experience.
                </p>

                <div className="row g-4">

                    {tools.map((tool, index) => (

                        <div
                            key={index}
                            className="col-lg-4 col-md-6"
                        >

                            <div className="tool-card">

                                <div className="tool-icon">
                                    {tool.icon}
                                </div>

                                <h4>{tool.title}</h4>

                                <p>{tool.description}</p>

                                <button
                                    className="btn"
                                    onClick={() => navigate(tool.route)}
                                >
                                    Launch Tool
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </Layout>

    );

}

export default AITools;