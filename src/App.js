import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homes from "./pages/Homes";
import Movies from "./pages/Movies";
import Navbar from "./components/Navbar";
import "./App.css";
import MovieDetails from "./pages/MovieDetails";
import TvDetails from "./pages/TvDetails";
import SearchResults from "./pages/SearchResults"; // Import the SearchResults component
import ErrorPage from "./pages/ErrorPage";
import TvShows from "./pages/TvShows";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path={"/"} element={<Homes />} />
          <Route path={"/movies"} element={<Movies />} />
          <Route path={"/searchResults"} element={<SearchResults />} /> {/* Add this line */}
          <Route path={"/MovieDetails/:id"} element={<MovieDetails />} />
          <Route path={"/tvShows"} element={<TvShows />} />
          <Route path={"/TvDetails/:id"} element={<TvDetails />} />
          <Route path={"/*"} element={<ErrorPage />} /> {/* Handle other paths or show an error page */}
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
