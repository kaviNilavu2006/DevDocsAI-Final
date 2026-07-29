import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import api from "../api/api";
import "../styles/quiz.css";

function Quiz() {

    const { id } = useParams();

    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    const [current, setCurrent] = useState(0);

    const [answers, setAnswers] = useState({});

    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {

        const loadQuiz = async () => {

            try {

                const response = await api.get(`/quiz/${id}`);

                setQuestions(response.data);

            }

            catch (error) {

                console.error(error);

                alert("Unable to load quiz.");

            }

            finally {

                setLoading(false);

            }

        };

        loadQuiz();

    }, [id]);

    const selectAnswer = (answer) => {

        setAnswers({
            ...answers,
            [current]: answer
        });

    };

    const nextQuestion = () => {

        if (current < questions.length - 1) {

            setCurrent(current + 1);

        }

    };

    const previousQuestion = () => {

        if (current > 0) {

            setCurrent(current - 1);

        }

    };

    const submitQuiz = () => {

        setSubmitted(true);

    };

    const calculateScore = () => {

        let score = 0;

        questions.forEach((q, index) => {

            if (answers[index] === q.answer) {

                score++;

            }

        });

        return score;

    };

    if (loading) {

        return (

            <Layout>

                <div className="container mt-5">

                    <h3>Generating AI Quiz...</h3>

                </div>

            </Layout>

        );

    }

    if (submitted) {

        return (

            <Layout>

                <div className="quiz-result">

                    <h1>🎉 Quiz Completed</h1>

                    <h2>

                        Score

                    </h2>

                    <div className="score-circle">

                        {calculateScore()} / {questions.length}

                    </div>

                </div>

            </Layout>

        );

    }

    const question = questions[current];

    return (

        <Layout>

            <div className="quiz-container">

                <h2>

                    AI Quiz

                </h2>

                <div className="progress">

                    Question {current + 1} of {questions.length}

                </div>

                <div className="quiz-card">

                    <h4>

                        {question.question}

                    </h4>

                    <button
                        className={`option ${answers[current] === "A" ? "selected" : ""}`}
                        onClick={() => selectAnswer("A")}
                    >
                        {question.optionA}
                    </button>

                    <button
                        className={`option ${answers[current] === "B" ? "selected" : ""}`}
                        onClick={() => selectAnswer("B")}
                    >
                        {question.optionB}
                    </button>

                    <button
                        className={`option ${answers[current] === "C" ? "selected" : ""}`}
                        onClick={() => selectAnswer("C")}
                    >
                        {question.optionC}
                    </button>

                    <button
                        className={`option ${answers[current] === "D" ? "selected" : ""}`}
                        onClick={() => selectAnswer("D")}
                    >
                        {question.optionD}
                    </button>

                </div>

                <div className="quiz-buttons">

                    <button
                        className="btn btn-secondary"
                        onClick={previousQuestion}
                        disabled={current === 0}
                    >
                        Previous
                    </button>

                    {

                        current === questions.length - 1 ?

                            (

                                <button
                                    className="btn btn-success"
                                    onClick={submitQuiz}
                                >
                                    Submit Quiz
                                </button>

                            )

                            :

                            (

                                <button
                                    className="btn btn-primary"
                                    onClick={nextQuestion}
                                >
                                    Next
                                </button>

                            )

                    }

                </div>

            </div>

        </Layout>

    );

}

export default Quiz;