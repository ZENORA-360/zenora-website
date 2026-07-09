import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Plus,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import logoZenora from "@/assets/logo-zenora-full.png";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("zenora-admin-token");
    if (!token) {
      localStorage.setItem("zenora-admin-token", "demo-token");
    }
    setIsAuthenticated(true);

    const update = () => setIsDesktop(window.innerWidth >= 1024);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("zenora-admin-token");
    navigate("/");
  };

  const navItems = [
    { href: "/admin", icon: LayoutDashboard, label: t("admin.nav.dashboard") },
    { href: "/admin/blogs", icon: FileText, label: t("admin.nav.blogs") },
    { href: "/admin/blogs/new", icon: Plus, label: t("admin.nav.newBlog") },
    { href: "/admin/settings", icon: Settings, label: t("admin.nav.settings") },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(href);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-primary font-medium tracking-widest text-sm uppercase">Loading…</div>
      </div>
    );
  }

  const sidebarVisible = sidebarOpen || isDesktop;

  const Sidebar = (
    <motion.aside
      initial={isDesktop ? false : { x: -300 }}
      animate={{ x: 0 }}
      exit={{ x: -300 }}
      transition={{ type: "spring", damping: 26, stiffness: 220 }}
      className="fixed left-0 top-0 h-full w-72 z-50 flex flex-col bg-sidebar border-r border-sidebar-border shadow-[8px_0_40px_-20px_rgba(0,0,0,0.35)]"
    >
      {/* Ambient gold glow */}
      <div className="pointer-events-none absolute -top-24 -left-16 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

      {/* Logo */}
      <div className="relative h-20 flex items-center justify-between px-6 border-b border-sidebar-border">
        <Link to="/admin" className="flex items-center gap-2">
          <img src={logoZenora} alt="Zenora" className="h-9 w-auto" />
        </Link>
        <span className="hidden lg:inline text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground px-2 py-1 rounded-md border border-sidebar-border">
          Admin
        </span>
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden p-2 text-sidebar-foreground hover:text-primary transition-colors"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Nav */}
      <nav className="relative flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        <div className="px-4 pb-3 text-[10px] font-semibold tracking-[0.25em] uppercase text-muted-foreground">
          {t("admin.nav.section") || "Espace"}
        </div>
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`relative flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                active
                  ? "bg-primary/10 text-primary"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              }`}
            >
              {active && (
                <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r bg-primary" />
              )}
              <item.icon className={`w-[18px] h-[18px] shrink-0 transition-transform group-hover:scale-110 ${active ? "text-primary" : ""}`} />
              <span className="font-medium text-sm">{item.label}</span>
              {active && <ChevronRight className="w-4 h-4 ml-auto text-primary" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="relative p-4 border-t border-sidebar-border space-y-2">
        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          {t("admin.viewSite") || "Voir le site"}
        </Link>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-sidebar-foreground/80 hover:text-destructive hover:bg-destructive/10"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          {t("admin.logout")}
        </Button>
        <div className="pt-2 text-[10px] text-muted-foreground text-center tracking-wider">
          © {new Date().getFullYear()} ZENORA
        </div>
      </div>
    </motion.aside>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-card/95 backdrop-blur-md border-b border-border z-40 flex items-center justify-between px-4">
        <Link to="/admin">
          <img src={logoZenora} alt="Zenora" className="h-8 w-auto" />
        </Link>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-foreground hover:text-primary transition-colors"
          aria-label="Open menu"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Sidebar + overlay */}
      <AnimatePresence>
        {sidebarVisible && (
          <>
            {!isDesktop && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
                onClick={() => setSidebarOpen(false)}
              />
            )}
            {Sidebar}
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="lg:ml-72 pt-16 lg:pt-0 min-h-screen">
        <div className="p-6 lg:p-10 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
