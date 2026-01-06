import { Routes, Route } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Home } from "../pages/Home";
import { FilmDescription } from "../pages/FilmDescription";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/film/:id" element={<FilmDescription />} />
      </Route>
    </Routes>
  );
};
