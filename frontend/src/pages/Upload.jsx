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

            const response = await api.post("/documents/upload", formData);

            const msg = response.data?.message || "✅ PDF Uploaded Successfully";

            alert(msg);

            setFile(null);

        }

        catch (error) {

            console.error("Upload Error:", error);

            let errorMsg = "Upload Failed";

            if (error.response?.data) {

                const data = error.response.data;

                if (typeof data === "string") {

                    errorMsg = data;

                } else if (typeof data === "object") {

                    errorMsg = data.message || data.error || JSON.stringify(data);

                }

            } else if (error.message) {

                errorMsg = error.message;

            }

            alert(`Upload Failed: ${errorMsg}`);

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