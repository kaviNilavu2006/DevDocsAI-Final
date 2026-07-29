import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../api/api";

function Profile() {

    const [profile, setProfile] = useState(null);

    useEffect(() => {

        const loadProfile = async () => {

            try {

                const email = localStorage.getItem("email");

                const response = await api.get(
                    `/profile?email=${email}`
                );

                setProfile(response.data);

            } catch (error) {

                console.error(error);

                alert("Failed to load profile");

            }

        };

        loadProfile();

    }, []);

    if (!profile) {

        return (

            <Layout>

                <div className="container mt-5">

                    <h3>Loading Profile...</h3>

                </div>

            </Layout>

        );

    }

    return (

        <Layout>

            <div className="container mt-5">

                <div className="card shadow p-4">

                    <h2 className="mb-4">
                        👤 My Profile
                    </h2>

                    <hr />

                    <h5>
                        Name
                    </h5>

                    <p>
                        {profile.fullName}
                    </p>

                    <h5>
                        Email
                    </h5>

                    <p>
                        {profile.email}
                    </p>

                    <h5>
                        Role
                    </h5>

                    <p>
                        {profile.role}
                    </p>

                    <h5>
                        Documents Uploaded
                    </h5>

                    <p>
                        {profile.totalDocuments}
                    </p>

                    <button className="btn btn-primary mt-3">
                        Edit Profile
                    </button>

                </div>

            </div>

        </Layout>

    );

}

export default Profile;