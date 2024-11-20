import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BlogList from './pages/BlogList';
import BlogDetails from './pages/BlogDetails';
import CreateEditBlog from './pages/CreateEditBlog';
import DeleteBlog from './pages/DeleteBlog';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css'

const App = () => {
  return (
    <Router>
      <Header />
      {/* Render the Header component (navigation bar) across all pages */}
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<ProtectedRoute><CreateEditBlog /></ProtectedRoute>} />
        <Route path="/edit/:id" element={<ProtectedRoute><CreateEditBlog /></ProtectedRoute>} />
        <Route path="/post/:id" element={<BlogDetails />} />
        <Route path="/delete/:id" element={<DeleteBlog />} />
      </Routes>
    </Router>
  );
};

export default App;



