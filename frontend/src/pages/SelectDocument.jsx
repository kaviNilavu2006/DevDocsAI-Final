import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import api from "../api/api";
import "../styles/selectdocument.css";

function SelectDocument() {

    const { tool } = useParams();

    const navigate = useNavigate();

    const [documents, setDocuments] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadDocuments = async () => {

            try {

                const response = await api.get("/documents");

                setDocuments(response.data);

            }

            catch (error) {

                console.error(error);

            }

            finally {

                setLoading(false);

            }

        };

        loadDocuments();

    }, []);

    const openTool = (id) => {

        switch(tool){

            case "summary":

                navigate(`/summary/${id}`);
                break;



            case "flashcards":

                navigate(`/flashcards/${id}`);
                break;

            case "quiz":

                navigate(`/quiz/${id}`);
                break;

            case "interview":

                navigate(`/interview/${id}`);
                break;

            case "notes":

                navigate(`/studynotes/${id}`);
                break;

            default:

                navigate("/documents");

        }

    };

    return (

        <Layout>

            <div className="select-page">

                <h1 className="select-title">

                    📚 Select Document

                </h1>

                <p className="select-subtitle">

                    Choose the document you want to use with AI.

                </p>

                {

                    loading ?

                        (

                            <div className="loading-card">

                                <div className="spinner-border text-primary"></div>

                                <h4 className="mt-3">

                                    Loading Documents...

                                </h4>

                            </div>

                        )

                        :

                        (

                            <div className="row">

                                {

                                    documents.map((doc)=>(

                                        <div
                                            className="col-lg-4 col-md-6 mb-4"
                                            key={doc.id}
                                        >

                                            <div className="select-card">

                                                <div className="pdf-icon">

                                                    📄

                                                </div>

                                                <h4>

                                                    {doc.fileName}

                                                </h4>

                                                <p>

                                                    {doc.fileType}

                                                </p>

                                                <small>

                                                    {(doc.fileSize/1024).toFixed(2)} KB

                                                </small>

                                                <button

                                                    className="btn btn-primary mt-4"

                                                    onClick={()=>openTool(doc.id)}

                                                >

                                                    Open

                                                </button>

                                            </div>

                                        </div>

                                    ))

                                }

                            </div>

                        )

                }

            </div>

        </Layout>

    );

}

export default SelectDocument;