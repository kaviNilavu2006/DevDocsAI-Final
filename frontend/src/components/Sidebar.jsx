
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/sidebar.css";

function Sidebar() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("email");

        navigate("/");

    };

    return (

        <div className="sidebar">

            <div className="logo">

                <h2>🚀 DevDocsAI</h2>

            </div>

            <nav>

                <NavLink to="/dashboard">
                    📊 Dashboard
                </NavLink>

                <NavLink to="/upload">
                    📄 Upload PDF
                </NavLink>

                <NavLink to="/documents">
                    📚 Documents
                </NavLink>

                <NavLink to="/chat">
                    💬 AI Chat
                </NavLink>

                <NavLink to="/ai-tools">
                    🤖 AI Tools
                </NavLink>

                <NavLink to="/documents">
                    📈 Activity
                </NavLink>

                <NavLink to="/profile">
                    👤 Profile
                </NavLink>

            </nav>

            <button
                className="logout-btn"
                onClick={logout}
            >
                🚪 Logout
            </button>

        </div>

    );

}

export default Sidebar;