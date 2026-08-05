import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { HelmetProvider } from "react-helmet-async";
import { motion } from "framer-motion";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ScrollToTop } from "@/components/ScrollToTop";
import { AppBoot } from "@/components/AppBoot";
import Index from "./pages/Index";

// Lazy-loaded: keeps the initial bundle lean, the boot loader covers the gap.
const Services = lazy(() => import("./pages/Services"));
const APropos = lazy(() => import("./pages/APropos"));
const Methode = lazy(() => import("./pages/Methode"));
const Contact = lazy(() => import("./pages/Contact"));
const DeveloppementWeb = lazy(() => import("./pages/services/DeveloppementWeb"));
const MarketingDigital = lazy(() => import("./pages/services/MarketingDigital"));
const DesignGraphic = lazy(() => import("./pages/services/DesignGraphic"));
const SolutionsMetiers = lazy(() => import("./pages/services/SolutionsMetiers"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Projects = lazy(() => import("./pages/Projects"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminBlogList = lazy(() => import("./pages/admin/AdminBlogList"));
const AdminBlogEditor = lazy(() => import("./pages/admin/AdminBlogEditor"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const MentionsLegales = lazy(() => import("./pages/MentionsLegales"));
const FAQ = lazy(() => import("./pages/FAQ"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="min-w-0"
    >
      <Suspense fallback={null}>
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
      </Suspense>
    </motion.div>
  );
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} storageKey="theme">
        <LanguageProvider>
          <TooltipProvider>
            <AppBoot>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <ScrollToTop />
                <AnimatedRoutes />
              </BrowserRouter>
            </AppBoot>
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
