import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import TheoryPage from "./pages/TheoryPage";
import MapPage from "./pages/MapPage";
import ForumPage from "./pages/ForumPage";
import PostDetailPage from "./pages/PostDetailPage";
import CreatePostPage from "./pages/CreatePostPage";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<TheoryPage />} />
          <Route path="/theory" element={<TheoryPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/forum" element={<ForumPage />} />
          <Route path="/forum/post/:id" element={<PostDetailPage />} />
          <Route path="/forum/create" element={<CreatePostPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
