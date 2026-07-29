import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import api, { API_BASE_URL } from "../api/api";
import "../styles/documents.css";

function Documents() {

    const navigate = useNavigate();

    const [documents, setDocuments] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(true);

    const loadDocuments = async () => {

        try {

            const response = await api.get("/documents");

            setDocuments(response.data);

        } catch (error) {

            console.error(error);

            alert("Failed to load documents.");

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadDocuments();

    }, []);

    const searchDocuments = async (value) => {

        setKeyword(value);

        try {

            if (value.trim() === "") {

                loadDocuments();

                return;

            }

            const response = await api.get(
                `/documents/search?keyword=${value}`
            );

            setDocuments(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    const deleteDocument = async (id) => {

        const confirmDelete = window.confirm(
            "Delete this document?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete(`/documents/${id}`);

            loadDocuments();

        } catch (error) {

            console.error(error);

            alert("Unable to delete document.");

        }

    };

    if (loading) {

        return (

            <Layout>

                <div className="documents-loading">

                    <h2>Loading Documents...</h2>

                </div>

            </Layout>

        );

    }

    return (

        <Layout>

            <div className="container-fluid">

                <div className="documents-header">

                    <div>

                        <h1 className="page-title">

                            📚 My Documents

                        </h1>

                        <p className="page-subtitle">

                            Manage all your uploaded PDFs and AI tools.

                        </p>

                    </div>

                </div>

                <div className="search-container">

                    <input

                        className="search-box"

                        placeholder="🔍 Search documents..."

                        value={keyword}

                        onChange={(e) =>
                            searchDocuments(e.target.value)
                        }

                    />

                </div>

                <div className="row g-4">

                    {documents.length === 0 ? (

                        <div className="col-12">

                            <div className="empty-card">

                                <h1>📂</h1>

                                <h3>No Documents Found</h3>

                                <p>

                                    Upload your first PDF to start using AI.

                                </p>

                                <button

                                    className="btn btn-primary"

                                    onClick={() => navigate("/upload")}

                                >

                                    Upload PDF

                                </button>

                            </div>

                        </div>

                    ) : (

                        documents.map((doc) => (

                            <div

                                className="col-xl-4 col-lg-6"

                                key={doc.id}

                            >

                                <div className="document-card">

                                    <div className="document-icon">

                                        📄

                                    </div>

                                    <div className="document-title">

                                        {doc.fileName}

                                    </div>

                                    <div className="document-info">

                                        {doc.fileType}

                                    </div>

                                    <div className="document-size">

                                        📦 {(doc.fileSize / 1024).toFixed(2)} KB

                                    </div>

                                    <div className="action-buttons">

                                        <button
                                            className="btn btn-success"
                                            onClick={() => navigate(`/summary/${doc.id}`)}
                                        >
                                            📝 Summary
                                        </button>

                                        <button
                                            className="btn btn-primary"
                                            onClick={() => navigate(`/studynotes/${doc.id}`)}
                                        >
                                            📘 Notes
                                        </button>

                                        <button
                                            className="btn btn-warning"
                                            onClick={() => navigate(`/flashcards/${doc.id}`)}
                                        >
                                            🃏 Flashcards
                                        </button>

                                        <button
                                            className="btn btn-info"
                                            onClick={() => navigate(`/quiz/${doc.id}`)}
                                        >
                                            📋 Quiz
                                        </button>

                                        {/*<button
                                            className="btn btn-secondary"
                                            onClick={() => navigate(`/chat/${doc.id}`)}
                                        >
                                            💬 Chat
                                        </button>*/}

                                        <button
                                            className="btn btn-dark"
                                            onClick={() => navigate(`/interview/${doc.id}`)}
                                        >
                                            🎯 Interview
                                        </button>

                                        <button
                                            className="btn btn-outline-primary"
                                            onClick={() =>
                                                window.open(
                                                    `${API_BASE_URL}/documents/view/${doc.id}`,
                                                    "_blank"
                                                )
                                            }
                                        >
                                            👁 View PDF
                                        </button>

                                        <button
                                            className="btn btn-danger"
                                            onClick={() => deleteDocument(doc.id)}
                                        >
                                            🗑 Delete
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))

                    )}

                </div>

            </div>

        </Layout>

    );

}

export default Documents;