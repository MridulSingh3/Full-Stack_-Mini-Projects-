import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Notes from "./Pages/notes";
import EditNotes from "./Pages/EditNotes";
import AddNotes from "./Pages/AddNotes";
import GetNotes from "./Pages/GetNotes";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/notes" />} />
        <Route path="/notes/:id" element={<GetNotes />} />
        <Route path='/notes' element={<Notes />} />
        <Route path="/notes/:id/edit" element={<EditNotes />} />
        <Route path="/notes/add" element={<AddNotes />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
