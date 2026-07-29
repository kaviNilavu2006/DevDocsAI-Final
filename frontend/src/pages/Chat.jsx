import { useState, useRef, useEffect } from "react";
import Layout from "../components/Layout";
import api from "../api/api";
import "../styles/chat.css";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function Chat() {

    const [messages, setMessages] = useState([]);
    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(false);

    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [messages, loading]);

    useEffect(() => {

        const loadHistory = async () => {

            try {

                const email = localStorage.getItem("email");

                if (!email) return;

                const response = await api.get(`/chat/history/${email}`);

                const history = [];

                response.data.forEach(chat => {

                    history.push({
                        sender: "user",
                        text: chat.question
                    });

                    history.push({
                        sender: "ai",
                        text: chat.answer
                    });

                });

                setMessages(history);

            } catch (error) {

                console.log("No previous chat history.");

            }

        };

        loadHistory();

    }, []);

    const sendMessage = async () => {

        if (question.trim() === "") return;

        const email = localStorage.getItem("email");

        const userMessage = {
            sender: "user",
            text: question
        };

        setMessages(prev => [...prev, userMessage]);

        const currentQuestion = question;

        setQuestion("");

        setLoading(true);

        try {

            const response = await api.post("/chat", {

                email: email,

                message: currentQuestion

            });

            setMessages(prev => [

                ...prev,

                {

                    sender: "ai",

                    text: response.data.response

                }

            ]);

        } catch (error) {

            console.error(error);

            setMessages(prev => [

                ...prev,

                {

                    sender: "ai",

                    text: "❌ Unable to contact AI."

                }

            ]);

        } finally {

            setLoading(false);

        }

    };

    const handleKeyDown = (e) => {

        if (e.key === "Enter") {

            sendMessage();

        }

    };

    return (

        <Layout>

            <div className="chat-container">

                <div className="chat-header">

                    <h2>💬 Chat with DevDocsAI</h2>

                    <p>
                        Ask anything about your uploaded documents.
                    </p>

                </div>

                <div className="chat-body">

                    {messages.length === 0 && (

                        <div className="empty-chat">

                            <h1>🤖</h1>

                            <h3>Start a Conversation</h3>

                            <p>Ask your first question.</p>

                        </div>

                    )}

                    {messages.map((msg, index) => (

                        <div
                            key={index}
                            className={`message ${msg.sender}`}
                        >

                            <div className="bubble">

                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                >
                                    {msg.text}
                                </ReactMarkdown>

                            </div>

                        </div>

                    ))}

                    {loading && (

                        <div className="message ai">

                            <div className="typing">

                                <span></span>
                                <span></span>
                                <span></span>

                            </div>

                        </div>

                    )}

                    <div ref={bottomRef}></div>

                </div>

                <div className="chat-footer">

                    <div className="chat-input">

                        <input
                            type="text"
                            placeholder="Ask anything..."
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />

                        <button onClick={sendMessage}>
                            Send ➜
                        </button>

                    </div>

                </div>

            </div>

        </Layout>

    );

}

export default Chat;