import { useState } from "react";
import Layout from "../components/Layout";
import api from "../api/api";
import "../styles/upload.css";

function Upload() {

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleUpload = async () => {

        if (!file) {

            alert("Please select a PDF.");

            return;

        }

        const formData = new FormData();

        formData.append("file", file);

        setLoading(true);

        try {

            await api.post("/documents/upload", formData, {

                headers: {

                    "Content-Type": "multipart/form-data"

                }

            });

            alert("✅ PDF Uploaded Successfully");

            setFile(null);

        }

        catch (error) {

            console.error(error);

            alert("Upload Failed");

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <Layout>

            <div className="upload-page">

                <h1 className="upload-title">

                    📄 Upload PDF

                </h1>

                <p className="upload-subtitle">

                    Upload your PDF and let AI generate summaries,
                    quizzes, flashcards and interview questions.

                </p>

                <div className="upload-card">

                    <div className="upload-icon">

                        📄

                    </div>

                    <h3>

                        Drag & Drop PDF

                    </h3>

                    <p>

                        or choose a PDF from your computer

                    </p>

                    <input

                        type="file"

                        accept=".pdf"

                        onChange={(e)=>setFile(e.target.files[0])}

                    />

                    {

                        file &&

                        <div className="selected-file">

                            ✅ {file.name}

                        </div>

                    }

                    <button

                        className="upload-btn"

                        onClick={handleUpload}

                        disabled={loading}

                    >

                        {

                            loading

                                ?

                                "Uploading..."

                                :

                                "Upload PDF"

                        }

                    </button>

                </div>

            </div>

        </Layout>

    );

}

export default Upload;