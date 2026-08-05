import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { BlogPost } from "@/types/blog";

type BlogCardProps = {
  post: BlogPost;
  index: number;
  language: string;
};

export const BlogCard = ({ post, index, language }: BlogCardProps) => {
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
        <div className="relative overflow-hidden rounded-lg bg-card border border-border hover:border-primary/40 transition-all duration-500 hover:shadow-gold">
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
            <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{excerpt}</p>

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
