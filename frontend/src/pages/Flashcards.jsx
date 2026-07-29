import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import Layout from "../components/Layout";
import "../styles/flashcards.css";

function Flashcards() {

    const { id } = useParams();

    const [flashcards, setFlashcards] = useState([]);
    const [loading, setLoading] = useState(true);

    const [current, setCurrent] = useState(0);

    const [showAnswer, setShowAnswer] = useState(false);

    useEffect(() => {

        const loadFlashcards = async () => {

            try {

                const response = await api.get(`/flashcards/${id}`);

                const cards = response.data
                    .split("\n\n")
                    .map(card => {

                        const lines = card.split("\n");

                        return {

                            question: lines[0]?.replace("Q:", "").trim(),
                            answer: lines[1]?.replace("A:", "").trim()

                        };

                    });

                setFlashcards(cards);

            }

            catch (error) {

                console.error(error);

            }

            finally {

                setLoading(false);

            }

        };

        loadFlashcards();

    }, [id]);

    const nextCard = () => {

        if(current < flashcards.length - 1){

            setCurrent(current + 1);

            setShowAnswer(false);

        }

    };

    const previousCard = () => {

        if(current > 0){

            setCurrent(current - 1);

            setShowAnswer(false);

        }

    };

    if(loading){

        return(

            <Layout>

                <div className="loading-card">

                    <div
                        className="spinner-border text-primary"
                    ></div>

                    <h4 className="mt-3">

                        Generating Flashcards...

                    </h4>

                </div>

            </Layout>

        );

    }

    if(flashcards.length===0){

        return(

            <Layout>

                <h3 className="text-center mt-5">

                    No Flashcards Generated

                </h3>

            </Layout>

        );

    }

    const card = flashcards[current];

    return(

        <Layout>

            <div className="flashcards-page">

                <h1 className="flashcards-title">

                    🃏 AI Flashcards

                </h1>

                <p className="flashcards-subtitle">

                    Learn one concept at a time.

                </p>

                <div className="card-counter">

                    Card {current+1} / {flashcards.length}

                </div>

                <div className="flashcard-box">

                    <h3>

                        {

                            showAnswer

                                ?

                                card.answer

                                :

                                card.question

                        }

                    </h3>

                </div>

                <div className="flash-buttons">

                    <button
                        className="btn btn-secondary"
                        onClick={previousCard}
                        disabled={current===0}
                    >

                        ⬅ Previous

                    </button>

                    <button
                        className="btn btn-primary"
                        onClick={()=>setShowAnswer(!showAnswer)}
                    >

                        {

                            showAnswer

                                ?

                                "Hide Answer"

                                :

                                "Flip Card"

                        }

                    </button>

                    <button
                        className="btn btn-success"
                        onClick={nextCard}
                        disabled={current===flashcards.length-1}
                    >

                        Next ➜

                    </button>

                </div>

            </div>

        </Layout>

    );

}

export default Flashcards;