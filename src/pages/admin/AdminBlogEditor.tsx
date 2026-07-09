import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Eye, Loader2, Image as ImageIcon } from "lucide-react";
import AdminLayout from "./AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBlog } from "@/hooks/useBlog";
import { useLanguage } from "@/contexts/LanguageContext";
import { SEO } from "@/components/SEO";
import { BlogFormData } from "@/types/blog";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const defaultFormData: BlogFormData = {
  title: "",
  titleEn: "",
  excerpt: "",
  excerptEn: "",
  content: "",
  contentEn: "",
  coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200",
  category: "",
  categoryEn: "",
  tags: [],
  tagsEn: [],
  isPublished: false,
};

export default function AdminBlogEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { currentPost, isLoading, fetchPostBySlug, createPost, updatePost, posts } = useBlog();
  
  const [formData, setFormData] = useState<BlogFormData>(defaultFormData);
  const [tagsInput, setTagsInput] = useState("");
  const [tagsInputEn, setTagsInputEn] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("fr");

  const isEditing = Boolean(id);

  useEffect(() => {
    if (id) {
      // Find post by ID in store
      const post = posts.find(p => p.id === id);
      if (post) {
        setFormData({
          title: post.title,
          titleEn: post.titleEn || "",
          excerpt: post.excerpt,
          excerptEn: post.excerptEn || "",
          content: post.content,
          contentEn: post.contentEn || "",
          coverImage: post.coverImage,
          category: post.category,
          categoryEn: post.categoryEn || "",
          tags: post.tags,
          tagsEn: post.tagsEn || [],
          isPublished: post.isPublished,
        });
        setTagsInput(post.tags.join(", "));
        setTagsInputEn((post.tagsEn || []).join(", "));
      }
    }
  }, [id, posts]);

  const handleChange = (field: keyof BlogFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTagsChange = (value: string, isEn: boolean) => {
    if (isEn) {
      setTagsInputEn(value);
      const tags = value.split(",").map(t => t.trim()).filter(Boolean);
      handleChange("tagsEn", tags);
    } else {
      setTagsInput(value);
      const tags = value.split(",").map(t => t.trim()).filter(Boolean);
      handleChange("tags", tags);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content || !formData.category) {
      toast.error(t("admin.editor.requiredFields"));
      return;
    }

    setIsSaving(true);

    try {
      if (isEditing && id) {
        await updatePost(id, formData);
        toast.success(t("admin.toast.updated"));
      } else {
        await createPost(formData);
        toast.success(t("admin.toast.created"));
      }
      navigate("/admin/blogs");
    } catch (error) {
      toast.error(t("admin.toast.error"));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AdminLayout>
      <SEO title={isEditing ? t("admin.editor.editTitle") : t("admin.editor.newTitle")} />
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button type="button" variant="ghost" size="icon" asChild>
              <Link to="/admin/blogs">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">
                {isEditing ? t("admin.editor.editTitle") : t("admin.editor.newTitle")}
              </h1>
              <p className="text-sm text-muted-foreground">
                {t("admin.editor.subtitle")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Switch
                id="published"
                checked={formData.isPublished}
                onCheckedChange={(checked) => handleChange("isPublished", checked)}
              />
              <Label htmlFor="published" className="text-sm">
                {formData.isPublished ? t("admin.status.published") : t("admin.status.draft")}
              </Label>
            </div>
            <Button type="submit" variant="gold" disabled={isSaving}>
              {isSaving ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              {t("admin.editor.save")}
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 max-w-[200px]">
                <TabsTrigger value="fr">🇫🇷 Français</TabsTrigger>
                <TabsTrigger value="en">🇬🇧 English</TabsTrigger>
              </TabsList>
              
              <TabsContent value="fr" className="space-y-6 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="title">{t("admin.editor.title")} *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    placeholder={t("admin.editor.titlePlaceholder")}
                    className="text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">{t("admin.editor.excerpt")} *</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => handleChange("excerpt", e.target.value)}
                    placeholder={t("admin.editor.excerptPlaceholder")}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">{t("admin.editor.content")} *</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => handleChange("content", e.target.value)}
                    placeholder={t("admin.editor.contentPlaceholder")}
                    rows={15}
                    className="font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground">
                    {t("admin.editor.htmlSupported")}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">{t("admin.editor.tags")}</Label>
                  <Input
                    id="tags"
                    value={tagsInput}
                    onChange={(e) => handleTagsChange(e.target.value, false)}
                    placeholder={t("admin.editor.tagsPlaceholder")}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="en" className="space-y-6 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="titleEn">{t("admin.editor.title")} (EN)</Label>
                  <Input
                    id="titleEn"
                    value={formData.titleEn}
                    onChange={(e) => handleChange("titleEn", e.target.value)}
                    placeholder="English title..."
                    className="text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerptEn">{t("admin.editor.excerpt")} (EN)</Label>
                  <Textarea
                    id="excerptEn"
                    value={formData.excerptEn}
                    onChange={(e) => handleChange("excerptEn", e.target.value)}
                    placeholder="English excerpt..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contentEn">{t("admin.editor.content")} (EN)</Label>
                  <Textarea
                    id="contentEn"
                    value={formData.contentEn}
                    onChange={(e) => handleChange("contentEn", e.target.value)}
                    placeholder="English content..."
                    rows={15}
                    className="font-mono text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tagsEn">{t("admin.editor.tags")} (EN)</Label>
                  <Input
                    id="tagsEn"
                    value={tagsInputEn}
                    onChange={(e) => handleTagsChange(e.target.value, true)}
                    placeholder="tag1, tag2, tag3"
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Cover Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl bg-card border border-border p-6 space-y-4"
            >
              <Label>{t("admin.editor.coverImage")}</Label>
              <div className="aspect-video rounded-lg bg-muted overflow-hidden relative group">
                {formData.coverImage ? (
                  <img
                    src={formData.coverImage}
                    alt="Cover"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-muted-foreground" />
                  </div>
                )}
              </div>
              <Input
                value={formData.coverImage}
                onChange={(e) => handleChange("coverImage", e.target.value)}
                placeholder="https://..."
              />
            </motion.div>

            {/* Category */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl bg-card border border-border p-6 space-y-4"
            >
              <Label htmlFor="category">{t("admin.editor.category")} *</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => handleChange("category", e.target.value)}
                placeholder="Technologie, Marketing..."
              />
              <Input
                value={formData.categoryEn}
                onChange={(e) => handleChange("categoryEn", e.target.value)}
                placeholder="Category in English..."
                className="mt-2"
              />
            </motion.div>

            {/* Preview */}
            {formData.title && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-2xl bg-card border border-border p-6"
              >
                <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  {t("admin.editor.preview")}
                </h3>
                <div className="space-y-2">
                  <div className="aspect-video rounded-lg bg-muted overflow-hidden">
                    {formData.coverImage && (
                      <img
                        src={formData.coverImage}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <span className="inline-block px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                    {formData.category || "Catégorie"}
                  </span>
                  <h4 className="font-semibold text-foreground line-clamp-2">
                    {formData.title}
                  </h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {formData.excerpt}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}
