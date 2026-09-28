import {
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import Admin from "./pages/Admin";
import Editor from "./pages/Editor";
import Viewer from "./pages/Viewer";

import ProtectedRoute from "./components/ProtectedRoute";


function App() {

    return (

        <Routes>

            {/* Login */}
            <Route
                path="/login"
                element={<Login />}
            />


            {/* Dashboard */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />


            {/* Admin Only */}
            <Route
                path="/admin"
                element={
                    <ProtectedRoute
                        allowedRoles={["admin"]}
                    >
                        <Admin />
                    </ProtectedRoute>
                }
            />


            {/* Admin + Editor */}
            <Route
                path="/editor"
                element={
                    <ProtectedRoute
                        allowedRoles={[
                            "admin",
                            "editor"
                        ]}
                    >
                        <Editor />
                    </ProtectedRoute>
                }
            />


            {/* All Roles */}
            <Route
                path="/viewer"
                element={
                    <ProtectedRoute
                        allowedRoles={[
                            "admin",
                            "editor",
                            "viewer"
                        ]}
                    >
                        <Viewer />
                    </ProtectedRoute>
                }
            />


            {/* Unknown URL */}
            <Route
                path="*"
                element={
                    <Navigate
                        to="/login"
                        replace
                    />
                }
            />

        </Routes>

    );
}

export default App;