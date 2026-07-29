
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Documents from "./pages/Documents";
import Summary from "./pages/Summary";
import Chat from "./pages/Chat";
import InterviewQuestions from "./pages/InterviewQuestions";
import StudyNotes from "./pages/StudyNotes";
import Flashcards from "./pages/Flashcards";
import Quiz from "./pages/Quiz";
import AITools from "./pages/AITools";
import SelectDocument from "./pages/SelectDocument";
import Profile from "./pages/Profile";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* Authentication */}

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                {/* Dashboard */}

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                {/* Upload */}

                <Route
                    path="/upload"
                    element={<Upload />}
                />

                {/* Documents */}

                <Route
                    path="/documents"
                    element={<Documents />}
                />

                {/* AI Summary */}

                <Route
                    path="/summary/:id"
                    element={<Summary />}
                />

                {/* General AI Chat */}

                <Route path="/chat" element={<Chat />} />

                {/* Interview Questions */}

                <Route
                    path="/interview/:id"
                    element={<InterviewQuestions />}
                />

                {/* Study Notes */}

                <Route
                    path="/studynotes/:id"
                    element={<StudyNotes />}
                />

                {/* Flashcards */}

                <Route
                    path="/flashcards/:id"
                    element={<Flashcards />}
                />

                {/* Quiz */}

                <Route
                    path="/quiz/:id"
                    element={<Quiz />}
                />

                {/* AI Tools */}

                <Route
                    path="/ai-tools"
                    element={<AITools />}
                />

                {/* Select Document */}

                <Route
                    path="/select-document/:tool"
                    element={<SelectDocument />}
                />

                {/* Profile */}

                <Route
                    path="/profile"
                    element={<Profile />}
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;