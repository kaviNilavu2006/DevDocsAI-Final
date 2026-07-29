import "../styles/topbar.css";

function Topbar() {

    return (

        <header className="topbar">

            <div>

                <h3 className="page-name">
                    🚀 DevDocsAI
                </h3>

                <p className="page-subtitle">
                    AI Powered Study Platform
                </p>

            </div>

            <div className="topbar-right">

                <button className="theme-btn">
                    🌙
                </button>

                <div className="profile">

                    👤

                </div>

            </div>

        </header>

    );

}

export default Topbar;