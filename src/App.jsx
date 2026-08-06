import { useEffect } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import Navbar from "./components/Navbar.jsx"
import Footer from "./components/Footer.jsx"
import MobileNav from "./components/MobileNav.jsx"
import ScrollProgress from "./components/ScrollProgress.jsx"
import ScrollTop from "./components/ScrollTop.jsx"
import CursorGlow from "./components/CursorGlow.jsx"
import Home from "./pages/Home.jsx"
import Subjects from "./pages/Subjects.jsx"
import SubjectDetail from "./pages/SubjectDetail.jsx"
import DocumentView from "./pages/DocumentView.jsx"
import Requests from "./pages/Requests.jsx"
import Feedback from "./pages/Feedback.jsx"
import Login from "./pages/Login.jsx"
import Admin from "./pages/Admin.jsx"
import NotFound from "./pages/NotFound.jsx"

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [pathname])
  return null
}

export default function App() {
  const location = useLocation()
  return (
    <div className="flex min-h-screen flex-col pb-[calc(3.75rem+env(safe-area-inset-bottom))] md:pb-0">
      <ScrollToTop />
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <main className="flex-1 pt-[calc(4rem+env(safe-area-inset-top))]">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/subjects/:subjectId" element={<SubjectDetail />} />
            <Route path="/document/:docId" element={<DocumentView />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <MobileNav />
      <ScrollTop />
    </div>
  )
}
