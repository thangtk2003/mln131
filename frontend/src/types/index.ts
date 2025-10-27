/**
 * API Response Types
 */

export interface TheorySection {
  id: number;
  title: string;
  description: string;
  media_type: "text" | "video" | "infographic" | "story";
  media_url: string | null;
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CaseStudy {
  id: number;
  title: string;
  province: string;
  description: string;
  mechanism: string;
  pros: string;
  cons: string;
  latitude: number;
  longitude: number;
  image_url: string | null;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CaseStudyMarker {
  id: number;
  title: string;
  province: string;
  latitude: number;
  longitude: number;
  is_featured: boolean;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  author_name: string;
  case_study: number | null;
  case_study_title?: string;
  upvotes: number;
  downvotes: number;
  score: number;
  comment_count: number;
  image_url: string | null;
  video_url: string | null;
  is_solution: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PostListItem {
  id: number;
  title: string;
  author_name: string;
  score: number;
  comment_count: number;
  is_solution: boolean;
  created_at: string;
}

export interface Comment {
  id: number;
  post: number;
  author_name: string;
  content: string;
  parent: number | null;
  replies_count: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Insights {
  total_posts: number;
  total_solutions: number;
  total_comments: number;
  top_posts: PostListItem[];
  posts_by_case: Array<{
    case_study__title: string;
    count: number;
  }>;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
