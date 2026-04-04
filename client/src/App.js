import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './admin/components/PrivateRoute';
import LoginPage from './admin/pages/LoginPage';
import ProjectListPage from './admin/pages/ProjectListPage';
import ProjectFormPage from './admin/pages/ProjectFormPage';
import ProjectDetailPage from './pages/ProjectDetailPage';

import './App.css';
import Header from './components/header/Header';
import Home from './components/home/Home';
import About from './components/about/About';
import Skills from './components/skills/Skills';
import Services from './components/services/Services';
import Qualification from './components/qualification/Qualification';
import Testimonials from './components/testimonials/Testimonials';
import Contact from './components/contact/Contact';
import Footer from './components/footer/Footer';

function CVSite() {
  return (
    <div className="App">
      <Header />
      <div className="main">
        <Home />
        <About />
        <Skills />
        <Services />
        <Qualification />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" richColors closeButton />
      <Routes>
        {/* Public CV site */}
        <Route path="/" element={<CVSite />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />

        {/* Admin */}
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin" element={<PrivateRoute><ProjectListPage /></PrivateRoute>} />
        <Route path="/admin/projects/new" element={<PrivateRoute><ProjectFormPage /></PrivateRoute>} />
        <Route path="/admin/projects/:id/edit" element={<PrivateRoute><ProjectFormPage /></PrivateRoute>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
