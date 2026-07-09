import { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, Calendar, Clock, ArrowRight, Wifi, WifiOff, Loader2 } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useBlog } from "@/hooks/useBlog";
import { useLanguage } from "@/contexts/LanguageContext";
import { BlogPost } from "@/types/blog";

const BlogCard = ({ post, index, language }: { post: BlogPost; index: number; language: string }) => {
  const title = language === "en" && post.titleEn ? post.titleEn : post.title;
  const excerpt = language === "en" && post.excerptEn ? post.excerptEn : post.excerpt;
  const category = language === "en" && post.categoryEn ? post.categoryEn : post.category;
  
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link to={`/blog/${post.slug}`} className="block">
        <div className="relative overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/40 transition-all duration-500 hover:shadow-gold">
          {/* Image */}
          <div className="relative h-52 overflow-hidden">
            <img
              src={post.coverImage}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            <span className="absolute top-4 left-4 px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-semibold rounded-full">
              {category}
            </span>
          </div>
          
          {/* Content */}
          <div className="p-6">
            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(post.publishedAt).toLocaleDateString(language === "fr" ? "fr-FR" : "en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readingTime} min
              </span>
            </div>
            
            <h3 className="font-display text-xl font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
              {excerpt}
            </p>
            
            <div className="flex items-center gap-2 text-primary font-medium text-sm">
              {language === "fr" ? "Lire l'article" : "Read article"}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

const BlogSkeleton = () => (
  <div className="rounded-2xl bg-card border border-border overflow-hidden animate-pulse">
    <div className="h-52 bg-muted" />
    <div className="p-6 space-y-3">
      <div className="flex gap-4">
        <div className="h-4 w-20 bg-muted rounded" />
        <div className="h-4 w-16 bg-muted rounded" />
      </div>
      <div className="h-6 w-3/4 bg-muted rounded" />
      <div className="h-4 w-full bg-muted rounded" />
      <div className="h-4 w-2/3 bg-muted rounded" />
    </div>
  </div>
);

const ConnectionStatus = ({ status, t }: { status: string; t: (key: string) => string }) => {
  if (status === "online") return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`fixed top-24 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium ${
        status === "offline" 
          ? "bg-destructive text-destructive-foreground" 
          : "bg-yellow-500/90 text-yellow-950"
      }`}
    >
      {status === "offline" ? (
        <>
          <WifiOff className="w-4 h-4" />
          {t("blog.offline")}
        </>
      ) : (
        <>
          <Wifi className="w-4 h-4" />
          {t("blog.slowConnection")}
        </>
      )}
    </motion.div>
  );
};

const EmptyState = ({ t }: { t: (key: string) => string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="col-span-full text-center py-16"
  >
    <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
      <Search className="w-10 h-10 text-muted-foreground" />
    </div>
    <h3 className="font-display text-2xl font-bold text-foreground mb-2">
      {t("blog.noResults")}
    </h3>
    <p className="text-muted-foreground max-w-md mx-auto">
      {t("blog.noResultsDesc")}
    </p>
  </motion.div>
);

export default function Blog() {
  const { t, language } = useLanguage();
  const { posts, isLoading, isLoadingMore, connectionStatus, hasMore, fetchPosts, loadMorePosts } = useBlog();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  // Debounced search + immediate category filter
  const doFetch = useCallback((search: string, category: string) => {
    fetchPosts({ search: search || undefined, category: category || undefined }, true);
  }, [fetchPosts]);

  useEffect(() => {
    // Immediate on category change, debounced on search
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      doFetch(searchQuery, selectedCategory);
    }, searchQuery ? 350 : 0);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [searchQuery, selectedCategory, doFetch]);

  const categories = [
    { value: "", label: language === "fr" ? "Tous" : "All" },
    { value: "Technologie", label: language === "fr" ? "Technologie" : "Technology" },
    { value: "Marketing", label: "Marketing" },
    { value: "Design", label: "Design" },
    { value: "E-commerce", label: "E-commerce" },
    { value: "Sécurité", label: language === "fr" ? "Sécurité" : "Security" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={t("blog.seo.title")}
        description={t("blog.seo.description")}
      />
      <Header />
      <ConnectionStatus status={connectionStatus} t={t} />
      
      <main className="pt-20">
        {/* Hero */}
        <section className="section-padding bg-gradient-to-b from-accent/30 via-muted/20 to-background relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
          
          <div className="container-zenora relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-8 bg-primary" />
                <span className="text-xs font-semibold text-primary tracking-[0.3em] uppercase font-display">
                  {t("blog.title")}
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.02] tracking-tight mb-6">
                {t("blog.title")} <span className="text-gradient-gold">{t("blog.titleHighlight")}</span>
              </h1>
              <p className="text-base md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                {t("blog.description")}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 border-b border-border sticky top-20 bg-background/95 backdrop-blur-md z-40">
          <div className="container-zenora">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={t("blog.searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedCategory === cat.value
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-accent"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="section-padding">
          <div className="container-zenora">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {isLoading ? (
                Array.from({ length: 6 }).map((_, i) => <BlogSkeleton key={i} />)
              ) : posts.length > 0 ? (
                posts.map((post, index) => (
                  <BlogCard key={post.id} post={post} index={index} language={language} />
                ))
              ) : (
                <EmptyState t={t} />
              )}
            </div>

            {/* Load More */}
            {hasMore && posts.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center mt-12"
              >
                <Button
                  variant="goldOutline"
                  size="lg"
                  onClick={loadMorePosts}
                  disabled={isLoadingMore}
                >
                  {isLoadingMore ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      {t("blog.loading")}
                    </>
                  ) : (
                    t("blog.loadMore")
                  )}
                </Button>
              </motion.div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
