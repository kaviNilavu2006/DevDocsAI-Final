import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import api from "../api/api";
import jsPDF from "jspdf";
import "../styles/studynotes.css";

function StudyNotes() {

    const { id } = useParams();

    const [notes, setNotes] = useState("");

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadStudyNotes = async () => {

            try {

                const response = await api.get(`/studynotes/${id}`);

                setNotes(response.data);

            }

            catch (error) {

                console.error(error);

                setNotes("Failed to generate study notes.");

            }

            finally {

                setLoading(false);

            }

        };

        loadStudyNotes();

    }, [id]);

    const downloadPdf = () => {

        const doc = new jsPDF();

        doc.setFontSize(22);
        doc.setTextColor(37,99,235);
        doc.text("DevDocsAI",20,20);

        doc.setFontSize(18);
        doc.setTextColor(0,0,0);
        doc.text("AI Study Notes",20,35);

        doc.setFontSize(10);
        doc.setTextColor(120);
        doc.text(
            "Generated : " + new Date().toLocaleString(),
            20,
            45
        );

        doc.line(20,50,190,50);

        doc.setFontSize(12);
        doc.setTextColor(30);

        const lines = doc.splitTextToSize(notes,170);

        let y = 60;

        lines.forEach((line)=>{

            if(y>280){

                doc.addPage();

                y=20;

            }

            doc.text(line,20,y);

            y+=8;

        });

        doc.save("DevDocsAI_StudyNotes.pdf");

    };

    const copyNotes = async () => {

        await navigator.clipboard.writeText(notes);

        alert("Study Notes copied!");

    };

    return (

        <Layout>

            <div className="notes-page">

                <div className="notes-header">

                    <div>

                        <h1 className="notes-title">

                            📘 AI Study Notes

                        </h1>

                        <p className="notes-subtitle">

                            Smart revision notes generated using AI.

                        </p>

                    </div>

                </div>

                {

                    loading ?

                        (

                            <div className="loading-card">

                                <div
                                    className="spinner-border text-primary"
                                    role="status"
                                ></div>

                                <h4 className="mt-3">

                                    Generating Study Notes...

                                </h4>

                            </div>

                        )

                        :

                        (

                            <>

                                <div className="notes-card">

                                    <div className="notes-content">

                                        {notes}

                                    </div>

                                </div>

                                <div className="notes-buttons">

                                    <button
                                        className="download-btn"
                                        onClick={downloadPdf}
                                    >

                                        📄 Download PDF

                                    </button>

                                    <button
                                        className="copy-btn"
                                        onClick={copyNotes}
                                    >

                                        📋 Copy Notes

                                    </button>

                                </div>

                            </>

                        )

                }

            </div>

        </Layout>

    );

}

export default StudyNotes;