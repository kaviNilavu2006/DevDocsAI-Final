import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

function InterviewQuestions() {

    const { id } = useParams();

    const [questions, setQuestions] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        generateQuestions();

    }, []);

    const generateQuestions = async () => {

        try {

            const response = await api.post(
                `/interview/${id}`
            );

            setQuestions(response.data);

        } catch (error) {

            console.error(error);

            setQuestions("Failed to generate interview questions.");

        }

        setLoading(false);

    };

    return (

        <div className="container mt-5">

            <div className="card shadow">

                <div className="card-header bg-success text-white">

                    <h3>AI Interview Questions</h3>

                </div>

                <div className="card-body">

                    {loading ? (

                        <h5>Generating Interview Questions...</h5>

                    ) : (

                        <pre style={{
                            whiteSpace: "pre-wrap",
                            fontFamily: "inherit"
                        }}>
                            {questions}
                        </pre>

                    )}

                </div>

            </div>

        </div>

    );

}

export default InterviewQuestions;