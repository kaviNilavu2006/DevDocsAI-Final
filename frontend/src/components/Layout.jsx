import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "../styles/layout.css";

function Layout({ children }) {

    return (

        <div className="layout">

            <Sidebar />

            <div className="content">

                <Topbar />

                {children}

            </div>

        </div>

    );

}

export default Layout;