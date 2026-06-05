import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import EditTask from "./pages/EditTask";
import AddTask from "./pages/AddTask";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/api/tasks" />} />
          <Route path="/api/tasks" element={<Dashboard />} />
          <Route path="/edit/:id" element={<EditTask />} />
          <Route path="/add" element={<AddTask />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
