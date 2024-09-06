import { Navigate, Outlet } from "react-router-dom"

export function ProtectedRoutes({ authenticated }) {
    return (
        authenticated ? <Outlet /> : <Navigate to="/login" />
    )
}
