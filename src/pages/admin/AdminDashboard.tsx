import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, Eye, TrendingUp, Plus, ArrowRight } from "lucide-react";
import AdminLayout from "./AdminLayout";
import { Button } from "@/components/ui/button";
import { useBlog } from "@/hooks/useBlog";
import { useLanguage } from "@/contexts/LanguageContext";
import { SEO } from "@/components/SEO";

const StatCard = ({ 
  icon: Icon, 
  label, 
  value, 
  trend, 
  color 
}: { 
  icon: any; 
  label: string; 
  value: number | string; 
  trend?: string;
  color: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all"
  >
    <div className="flex items-start justify-between mb-4">
      <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center`}>
        <Icon className="w-6 h-6 text-primary-foreground" />
      </div>
      {trend && (
        <span className="flex items-center gap-1 text-sm text-green-500">
          <TrendingUp className="w-4 h-4" />
          {trend}
        </span>
      )}
    </div>
    <p className="text-3xl font-bold text-foreground mb-1">{value}</p>
    <p className="text-sm text-muted-foreground">{label}</p>
  </motion.div>
);

export default function AdminDashboard() {
  const { t, language } = useLanguage();
  const { posts, fetchAllPostsAdmin, isLoading } = useBlog();

  useEffect(() => {
    fetchAllPostsAdmin();
  }, [fetchAllPostsAdmin]);

  const publishedCount = posts.filter(p => p.isPublished).length;
  const draftCount = posts.filter(p => !p.isPublished).length;

  const recentPosts = posts.slice(0, 5);

  return (
    <AdminLayout>
      <SEO title={t("admin.dashboard.title")} />
      
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              {t("admin.dashboard.title")}
            </h1>
            <p className="text-muted-foreground">
              {t("admin.dashboard.subtitle")}
            </p>
          </div>
          <Button variant="gold" asChild>
            <Link to="/admin/blogs/new">
              <Plus className="w-4 h-4 mr-2" />
              {t("admin.dashboard.newPost")}
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={FileText}
            label={t("admin.stats.totalPosts")}
            value={posts.length}
            trend="+12%"
            color="bg-gradient-gold"
          />
          <StatCard
            icon={Eye}
            label={t("admin.stats.published")}
            value={publishedCount}
            color="bg-green-500"
          />
          <StatCard
            icon={FileText}
            label={t("admin.stats.drafts")}
            value={draftCount}
            color="bg-orange-500"
          />
          <StatCard
            icon={TrendingUp}
            label={t("admin.stats.views")}
            value="12.5K"
            trend="+8%"
            color="bg-blue-500"
          />
        </div>

        {/* Recent Posts */}
        <div className="rounded-2xl bg-card border border-border overflow-hidden">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h2 className="font-display text-xl font-bold text-foreground">
              {t("admin.dashboard.recentPosts")}
            </h2>
            <Link
              to="/admin/blogs"
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              {t("admin.dashboard.viewAll")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="divide-y divide-border">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="p-4 animate-pulse flex items-center gap-4">
                  <div className="w-16 h-12 bg-muted rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                  </div>
                </div>
              ))
            ) : recentPosts.length > 0 ? (
              recentPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/admin/blogs/edit/${post.id}`}
                  className="p-4 flex items-center gap-4 hover:bg-accent/50 transition-colors"
                >
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-16 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground truncate">
                      {language === "en" && post.titleEn ? post.titleEn : post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(post.publishedAt).toLocaleDateString(language === "fr" ? "fr-FR" : "en-US")}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    post.isPublished 
                      ? "bg-green-500/10 text-green-500" 
                      : "bg-orange-500/10 text-orange-500"
                  }`}>
                    {post.isPublished ? t("admin.status.published") : t("admin.status.draft")}
                  </span>
                </Link>
              ))
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                {t("admin.dashboard.noPosts")}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
