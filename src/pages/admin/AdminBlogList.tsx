import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  MoreVertical,
  Loader2,
} from "lucide-react";
import AdminLayout from "./AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useBlog } from "@/hooks/useBlog";
import { useLanguage } from "@/contexts/LanguageContext";
import { SEO } from "@/components/SEO";
import { toast } from "sonner";

export default function AdminBlogList() {
  const { t, language } = useLanguage();
  const { posts, isLoading, fetchAllPostsAdmin, deletePost, togglePublish } = useBlog();
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchAllPostsAdmin();
  }, [fetchAllPostsAdmin]);

  const filteredPosts = posts.filter((post) => {
    const title = language === "en" && post.titleEn ? post.titleEn : post.title;
    return title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleDelete = async () => {
    if (!postToDelete) return;
    
    setActionLoading(postToDelete);
    const success = await deletePost(postToDelete);
    
    if (success) {
      toast.success(t("admin.toast.deleted"));
    } else {
      toast.error(t("admin.toast.error"));
    }
    
    setDeleteDialogOpen(false);
    setPostToDelete(null);
    setActionLoading(null);
  };

  const handleTogglePublish = async (id: string, isPublished: boolean) => {
    setActionLoading(id);
    const success = await togglePublish(id, !isPublished);
    
    if (success) {
      toast.success(isPublished ? t("admin.toast.unpublished") : t("admin.toast.published"));
    } else {
      toast.error(t("admin.toast.error"));
    }
    
    setActionLoading(null);
  };

  return (
    <AdminLayout>
      <SEO title={t("admin.blogs.title")} />
      
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              {t("admin.blogs.title")}
            </h1>
            <p className="text-muted-foreground">
              {t("admin.blogs.subtitle")} ({posts.length})
            </p>
          </div>
          <Button variant="gold" asChild>
            <Link to="/admin/blogs/new">
              <Plus className="w-4 h-4 mr-2" />
              {t("admin.blogs.newPost")}
            </Link>
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder={t("admin.blogs.searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Table */}
        <div className="rounded-2xl bg-card border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-medium text-muted-foreground">
                    {t("admin.blogs.table.title")}
                  </th>
                  <th className="text-left p-4 font-medium text-muted-foreground hidden md:table-cell">
                    {t("admin.blogs.table.category")}
                  </th>
                  <th className="text-left p-4 font-medium text-muted-foreground hidden lg:table-cell">
                    {t("admin.blogs.table.date")}
                  </th>
                  <th className="text-left p-4 font-medium text-muted-foreground">
                    {t("admin.blogs.table.status")}
                  </th>
                  <th className="text-right p-4 font-medium text-muted-foreground">
                    {t("admin.blogs.table.actions")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center">
                      <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto" />
                    </td>
                  </tr>
                ) : filteredPosts.length > 0 ? (
                  <AnimatePresence>
                    {filteredPosts.map((post, index) => (
                      <motion.tr
                        key={post.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-accent/30 transition-colors"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={post.coverImage}
                              alt={post.title}
                              className="w-12 h-9 object-cover rounded-lg"
                            />
                            <span className="font-medium text-foreground line-clamp-1">
                              {language === "en" && post.titleEn ? post.titleEn : post.title}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 hidden md:table-cell">
                          <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                            {language === "en" && post.categoryEn ? post.categoryEn : post.category}
                          </span>
                        </td>
                        <td className="p-4 text-muted-foreground text-sm hidden lg:table-cell">
                          {new Date(post.publishedAt).toLocaleDateString(language === "fr" ? "fr-FR" : "en-US")}
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            post.isPublished
                              ? "bg-green-500/10 text-green-500"
                              : "bg-orange-500/10 text-orange-500"
                          }`}>
                            {post.isPublished ? t("admin.status.published") : t("admin.status.draft")}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" disabled={actionLoading === post.id}>
                                {actionLoading === post.id ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  <MoreVertical className="w-4 h-4" />
                                )}
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link to={`/blog/${post.slug}`} target="_blank">
                                  <Eye className="w-4 h-4 mr-2" />
                                  {t("admin.actions.view")}
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link to={`/admin/blogs/edit/${post.id}`}>
                                  <Edit className="w-4 h-4 mr-2" />
                                  {t("admin.actions.edit")}
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleTogglePublish(post.id, post.isPublished)}>
                                {post.isPublished ? (
                                  <>
                                    <EyeOff className="w-4 h-4 mr-2" />
                                    {t("admin.actions.unpublish")}
                                  </>
                                ) : (
                                  <>
                                    <Eye className="w-4 h-4 mr-2" />
                                    {t("admin.actions.publish")}
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-destructive focus:text-destructive"
                                onClick={() => {
                                  setPostToDelete(post.id);
                                  setDeleteDialogOpen(true);
                                }}
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                {t("admin.actions.delete")}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                ) : (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-muted-foreground">
                      {searchQuery ? t("admin.blogs.noResults") : t("admin.blogs.noPosts")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Delete Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("admin.dialog.deleteTitle")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("admin.dialog.deleteDescription")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("admin.dialog.cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {t("admin.dialog.delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
