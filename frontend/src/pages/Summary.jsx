


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import Layout from "../components/Layout";
import api from "../api/api";
import "../styles/summary.css";

function Summary() {

    const { id } = useParams();

    const [summary, setSummary] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchSummary = async () => {

            try {

                const response = await api.post(`/ai/summary/${id}`);

                setSummary(response.data);

            }

            catch (error) {

                console.error(error);

                alert("Failed to generate summary");

            }

            finally {

                setLoading(false);

            }

        };

        fetchSummary();

    }, [id]);

    const downloadPdf = () => {

        const doc = new jsPDF();

        doc.setFontSize(22);
        doc.setTextColor(37,99,235);
        doc.text("DevDocsAI",20,20);

        doc.setFontSize(18);
        doc.setTextColor(0,0,0);
        doc.text("AI Summary",20,35);

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

        const lines = doc.splitTextToSize(summary,170);

        let y = 60;

        lines.forEach((line)=>{

            if(y>280){

                doc.addPage();

                y=20;

            }

            doc.text(line,20,y);

            y+=8;

        });

        doc.save("DevDocsAI_Summary.pdf");

    };

    const copySummary = async()=>{

        await navigator.clipboard.writeText(summary);

        alert("Summary Copied!");

    };

    return (

        <Layout>

            <div className="summary-page">

                <div className="summary-header">

                    <div>

                        <h1 className="summary-title">

                            🤖 AI Summary

                        </h1>

                        <p className="summary-subtitle">

                            AI generated summary for your uploaded document.

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

                                <h4>

                                    Generating AI Summary...

                                </h4>

                            </div>

                        )

                        :

                        (

                            <>

                                <div className="summary-card">

                                    <div className="summary-content">

                                        {summary}

                                    </div>

                                </div>

                                <div className="summary-buttons">

                                    <button
                                        className="download-btn"
                                        onClick={downloadPdf}
                                    >

                                        📄 Download PDF

                                    </button>

                                    <button
                                        className="copy-btn"
                                        onClick={copySummary}
                                    >

                                        📋 Copy Summary

                                    </button>

                                </div>

                            </>

                        )

                }

            </div>

        </Layout>

    );

}

export default Summary;