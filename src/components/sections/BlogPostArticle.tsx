import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Tag,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Images,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlogPost as BlogPostType } from "@/types/blog";

const ShareButton = ({ icon: Icon, href, label }: { icon: LucideIcon; href: string; label: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-muted hover:bg-primary/20 flex items-center justify-center transition-colors"
    aria-label={label}
  >
    <Icon className="w-4 h-4 text-muted-foreground hover:text-primary" />
  </a>
);

type BlogPostArticleProps = {
  post: BlogPostType;
  language: string;
  title: string;
  content: string;
  category: string;
  tags: string[] | undefined;
  excerpt: string;
  shareUrl: string;
  shareText: string;
  t: (key: string) => string;
};

export const BlogPostArticle = ({
  post,
  language,
  title,
  content,
  category,
  tags,
  excerpt,
  shareUrl,
  shareText,
  t,
}: BlogPostArticleProps) => (
  <>
    <div className="container-zenora">
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        {t("blog.backToList")}
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative aspect-[16/8] w-full rounded-lg overflow-hidden border border-border bg-muted"
      >
        <img src={post.coverImage} alt={title} className="w-full h-full object-cover" />
      </motion.div>

      <div className="max-w-4xl mx-auto pt-10 pb-4">
        <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full mb-4">
          {category}
        </span>
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-5">
          {title}
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">{excerpt}</p>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-t border-border pt-5">
          <span className="flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            {post.author.name}
          </span>
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            {new Date(post.publishedAt).toLocaleDateString(language === "fr" ? "fr-FR" : "en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            {post.readingTime} min {language === "fr" ? "de lecture" : "read"}
          </span>
        </div>
      </div>
    </div>

    <section className="py-10 md:py-14">
      <div className="container-zenora">
        <div className="grid lg:grid-cols-4 gap-10 lg:gap-12">
          <aside className="lg:col-span-1 order-2 lg:order-1">
            <div className="sticky top-28 space-y-6">
              <div className="p-5 rounded-lg bg-card border border-border">
                <h4 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2 text-sm">
                  <Share2 className="w-4 h-4 text-primary" />
                  {t("blog.share")}
                </h4>
                <div className="flex gap-2">
                  <ShareButton
                    icon={Facebook}
                    href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                    label="Facebook"
                  />
                  <ShareButton
                    icon={Twitter}
                    href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`}
                    label="Twitter"
                  />
                  <ShareButton
                    icon={Linkedin}
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareText}`}
                    label="LinkedIn"
                  />
                </div>
              </div>

              {tags && tags.length > 0 && (
                <div className="p-5 rounded-lg bg-card border border-border">
                  <h4 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2 text-sm">
                    <Tag className="w-4 h-4 text-primary" />
                    Tags
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-3 order-1 lg:order-2"
          >
            <div
              className="prose prose-lg dark:prose-invert max-w-none
                    prose-headings:font-display prose-headings:text-foreground
                    prose-p:text-muted-foreground prose-p:leading-relaxed
                    prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-foreground
                    prose-ul:text-muted-foreground prose-ol:text-muted-foreground
                    prose-blockquote:border-l-primary prose-blockquote:bg-accent/30 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </motion.article>
        </div>
      </div>
    </section>
  </>
);

type BlogPostGallerySectionProps = {
  gallery: string[];
  title: string;
  language: string;
  onOpen: (index: number) => void;
};

export const BlogPostGallerySection = ({ gallery, title, language, onOpen }: BlogPostGallerySectionProps) => (
  <section className="py-12 md:py-16 border-t border-border/60 bg-gradient-to-b from-background via-muted/20 to-background">
    <div className="container-zenora">
      <div className="flex items-center gap-3 mb-8">
        <span className="h-px w-8 bg-primary" />
        <Images className="w-4 h-4 text-primary" />
        <span className="text-xs font-semibold text-primary tracking-[0.3em] uppercase font-display">
          {language === "fr" ? "Galerie du projet" : "Project gallery"}
        </span>
      </div>
      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 max-w-2xl">
        {language === "fr"
          ? "Diagrammes, écrans, rendus et coulisses."
          : "Diagrams, screens, renders and behind-the-scenes."}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[140px] md:auto-rows-[180px] gap-3 md:gap-4">
        {gallery.map((src, i) => {
          const isHero = i === 0;
          const isTall = i === 3;
          const isWide = i === 5;
          return (
            <button
              key={src + i}
              onClick={() => onOpen(i)}
              className={`group relative overflow-hidden rounded-lg border border-border bg-muted transition-all duration-500 hover:border-primary/50 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.35)] hover:-translate-y-0.5 ${
                isHero ? "col-span-2 row-span-2" : ""
              } ${isTall ? "row-span-2" : ""} ${isWide ? "col-span-2" : ""}`}
              aria-label={`Ouvrir le visuel ${i + 1}`}
            >
              <img
                src={src}
                alt={`${title} — visuel ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-background/85 backdrop-blur text-[10px] font-mono text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                {String(i + 1).padStart(2, "0")}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  </section>
);

type BlogPostCTASectionProps = {
  t: (key: string) => string;
};

export const BlogPostCTASection = ({ t }: BlogPostCTASectionProps) => (
  <section className="py-12 md:py-16">
    <div className="container-zenora">
      <div className="max-w-4xl mx-auto p-8 md:p-10 rounded-lg bg-gradient-gold text-center shadow-gold">
        <h3 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-3">
          {t("blog.cta.title")}
        </h3>
        <p className="text-primary-foreground/85 mb-6 max-w-xl mx-auto">{t("blog.cta.description")}</p>
        <Button variant="dark" size="lg" asChild>
          <Link to="/contact">{t("blog.cta.button")}</Link>
        </Button>
      </div>
    </div>
  </section>
);
