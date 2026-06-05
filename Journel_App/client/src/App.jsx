import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UpdateJournel from "./pages/UpdateJournel";
import AddJournel from "./pages/AddJournel";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="/journel" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

          <Route path="/add" element={<ProtectedRoute><AddJournel /></ProtectedRoute>} />

          <Route path="/update/:id" element={<ProtectedRoute><UpdateJournel /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
