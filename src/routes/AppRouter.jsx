import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Games from "../pages/Games";
import GameDetails from "../pages/GameDetails";
import Publisher from "../pages/Publisher";
import Favorites from "../pages/Favorites";
import NotFound from "../pages/NotFound";
import Navbar from "../components/layout/Navbar";
function AppRouter() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/games/:id" element={<GameDetails />} />
        <Route path="/publisher/:id" element={<Publisher />} />
        <Route path="/favorites" element={<Favorites />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;