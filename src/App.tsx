import { Routes, Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import AuthenticatedLayout from "./layouts/AuthenticatedLayout";
import UnauthenticatedLayout from "./layouts/UnauthenticatedLayout";

import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Write from "./pages/Write";
import Read from "./pages/Read";

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/read/:id" element={<Read />} />

        <Route element={<UnauthenticatedLayout />}>
          <Route path="/auth" element={<Auth />} />
        </Route>

        <Route element={<AuthenticatedLayout />}>
          <Route path="/write" element={<Write />} />
        </Route>
      </Route>
    </Routes>
  );
}
