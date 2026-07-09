import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { HelmetProvider } from "react-helmet-async";
import { AnimatePresence, motion } from "framer-motion";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ScrollToTop } from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Services from "./pages/Services";
import APropos from "./pages/APropos";
import Methode from "./pages/Methode";
import Contact from "./pages/Contact";
import DeveloppementWeb from "./pages/services/DeveloppementWeb";
import MarketingDigital from "./pages/services/MarketingDigital";
import DesignGraphic from "./pages/services/DesignGraphic";
import SolutionsMetiers from "./pages/services/SolutionsMetiers";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Projects from "./pages/Projects";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBlogList from "./pages/admin/AdminBlogList";
import AdminBlogEditor from "./pages/admin/AdminBlogEditor";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import MentionsLegales from "./pages/MentionsLegales";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <Routes location={location}>
        <Route path="/" element={<Index />} />
        <Route path="/a-propos" element={<APropos />} />
        <Route path="/methode" element={<Methode />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/developpement-web" element={<DeveloppementWeb />} />
        <Route path="/services/marketing-digital" element={<MarketingDigital />} />
        <Route path="/services/design-graphic" element={<DesignGraphic />} />
        <Route path="/services/solutions-metiers" element={<SolutionsMetiers />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projets" element={<Projects />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/blogs" element={<AdminBlogList />} />
        <Route path="/admin/blogs/new" element={<AdminBlogEditor />} />
        <Route path="/admin/blogs/edit/:id" element={<AdminBlogEditor />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/faq" element={<FAQ />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </motion.div>
  );
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <AnimatedRoutes />
            </BrowserRouter>
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;

