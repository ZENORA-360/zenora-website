import { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Search, Wifi, WifiOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BlogCard } from "@/components/blog/BlogCard";
import { useBlog } from "@/hooks/useBlog";
import { useLanguage } from "@/contexts/LanguageContext";
import { blogCategories } from "@/data/blog";
import { pickLocale } from "@/data/locale";

const BlogSkeleton = () => (
  <div className="rounded-lg bg-card border border-border overflow-hidden animate-pulse">
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
    <h3 className="font-display text-2xl font-bold text-foreground mb-2">{t("blog.noResults")}</h3>
    <p className="text-muted-foreground max-w-md mx-auto">{t("blog.noResultsDesc")}</p>
  </motion.div>
);

export const BlogListingSection = () => {
  const { t, language } = useLanguage();
  const { posts, isLoading, isLoadingMore, connectionStatus, hasMore, fetchPosts, loadMorePosts } = useBlog();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  const doFetch = useCallback(
    (search: string, category: string) => {
      fetchPosts({ search: search || undefined, category: category || undefined }, true);
    },
    [fetchPosts],
  );

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      doFetch(searchQuery, selectedCategory);
    }, searchQuery ? 350 : 0);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchQuery, selectedCategory, doFetch]);

  const categories = blogCategories.map((cat) => ({
    value: cat.value,
    label: pickLocale(language, cat.label),
  }));

  return (
    <>
      <ConnectionStatus status={connectionStatus} t={t} />

      <section className="py-8 border-b border-border sticky top-20 bg-background/95 backdrop-blur-md z-40">
        <div className="container-zenora">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
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

          {hasMore && posts.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mt-12">
              <Button variant="goldOutline" size="lg" onClick={loadMorePosts} disabled={isLoadingMore}>
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
    </>
  );
};
