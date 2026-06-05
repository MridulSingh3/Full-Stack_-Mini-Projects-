import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import CreateTask from "./Pages/CreateTask";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/tasks" />} />
                    <Route path="/tasks" element={<Home />} />
                    <Route path="/tasks/add" element={<CreateTask />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default App
