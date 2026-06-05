import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Contact from "./pages/Contact";
import AddContact from "./pages/AddContact";
import UpdateContact from "./pages/UpdateContact";
import GetContact from "./pages/GetContact";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/contact" />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contact/add" element={<AddContact />} />
          <Route path="/contact/:id/edit" element={<UpdateContact />} />
          <Route path="/contact/:id" element={<GetContact />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
