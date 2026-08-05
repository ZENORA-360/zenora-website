import { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Lightbox } from "@/components/ui/lightbox";
import {
  BlogPostArticle,
  BlogPostGallerySection,
  BlogPostCTASection,
} from "@/components/sections/BlogPostArticle";
import { useBlog } from "@/hooks/useBlog";
import { useLanguage } from "@/contexts/LanguageContext";

export const BlogPostView = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, language } = useLanguage();
  const { currentPost, isLoading, error, fetchPostBySlug } = useBlog();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (slug) fetchPostBySlug(slug);
  }, [slug, fetchPostBySlug]);

  const gallery = useMemo(() => currentPost?.gallery ?? [], [currentPost]);

  if (isLoading) {
    return (
      <main className="pt-32 pb-20">
        <div className="container-zenora flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">{t("blog.loadingArticle")}</p>
          </div>
        </div>
      </main>
    );
  }

  if (error || !currentPost) {
    return (
      <main className="pt-32 pb-20">
        <div className="container-zenora text-center min-h-[50vh] flex flex-col items-center justify-center">
          <h1 className="font-display text-4xl font-bold mb-4">{t("blog.notFound")}</h1>
          <p className="text-muted-foreground mb-8">{t("blog.notFoundDesc")}</p>
          <Button variant="gold" asChild>
            <Link to="/blog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("blog.backToList")}
            </Link>
          </Button>
        </div>
      </main>
    );
  }

  const title = language === "en" && currentPost.titleEn ? currentPost.titleEn : currentPost.title;
  const content = language === "en" && currentPost.contentEn ? currentPost.contentEn : currentPost.content;
  const category = language === "en" && currentPost.categoryEn ? currentPost.categoryEn : currentPost.category;
  const tags = language === "en" && currentPost.tagsEn ? currentPost.tagsEn : currentPost.tags;
  const excerpt = language === "en" && currentPost.excerptEn ? currentPost.excerptEn : currentPost.excerpt;

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = encodeURIComponent(title);

  return (
    <>
      <SEO title={title} description={excerpt} image={currentPost.coverImage} type="article" />

      <main className="pt-24 md:pt-28">
        <BlogPostArticle
          post={currentPost}
          language={language}
          title={title}
          content={content}
          category={category}
          tags={tags}
          excerpt={excerpt}
          shareUrl={shareUrl}
          shareText={shareText}
          t={t}
        />

        {gallery.length > 0 && (
          <BlogPostGallerySection
            gallery={gallery}
            title={title}
            language={language}
            onOpen={setLightboxIndex}
          />
        )}

        <BlogPostCTASection t={t} />
      </main>

      <Lightbox
        images={gallery}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onChange={setLightboxIndex}
      />
    </>
  );
};
