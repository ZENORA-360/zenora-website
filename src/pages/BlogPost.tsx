import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BlogPostView } from "@/components/sections/BlogPostView";

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BlogPostView />
      <Footer />
    </div>
  );
}
