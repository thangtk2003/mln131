import axios from "axios";
import { API_ENDPOINTS } from "@/config/api";
import type {
  TheorySection,
  CaseStudy,
  CaseStudyMarker,
  Post,
  PostListItem,
  Comment,
  Insights,
  PaginatedResponse,
} from "@/types";

/**
 * API Service for making HTTP requests
 */
class ApiService {
  // Theory API
  async getTheorySections(): Promise<TheorySection[]> {
    const response = await axios.get<PaginatedResponse<TheorySection>>(
      API_ENDPOINTS.theory
    );
    return response.data.results || [];
  }

  // Cases API
  async getCases(): Promise<PaginatedResponse<CaseStudy>> {
    const response = await axios.get<PaginatedResponse<CaseStudy>>(
      API_ENDPOINTS.cases
    );
    return response.data;
  }

  async getCaseById(id: number): Promise<CaseStudy> {
    const response = await axios.get<CaseStudy>(`${API_ENDPOINTS.cases}${id}/`);
    return response.data;
  }

  async getCasesMapData(): Promise<CaseStudyMarker[]> {
    const response = await axios.get<PaginatedResponse<CaseStudyMarker>>(
      API_ENDPOINTS.casesMap
    );
    return response.data.results || [];
  }

  async getFeaturedCases(): Promise<CaseStudy[]> {
    const response = await axios.get<PaginatedResponse<CaseStudy>>(
      API_ENDPOINTS.casesFeatured
    );
    return response.data.results || [];
  }

  // Posts API
  async getPosts(
    params?: Record<string, any>
  ): Promise<PaginatedResponse<PostListItem>> {
    const response = await axios.get<PaginatedResponse<PostListItem>>(
      API_ENDPOINTS.posts,
      { params }
    );
    return response.data;
  }

  async getPostById(id: number): Promise<Post> {
    const response = await axios.get<Post>(`${API_ENDPOINTS.posts}${id}/`);
    return response.data;
  }

  async createPost(data: Partial<Post>): Promise<Post> {
    const response = await axios.post<Post>(API_ENDPOINTS.posts, data);
    return response.data;
  }

  async getSolutions(): Promise<PostListItem[]> {
    const response = await axios.get<PaginatedResponse<PostListItem>>(
      API_ENDPOINTS.postsSolutions
    );
    return response.data.results || [];
  }

  async getTrendingPosts(): Promise<PostListItem[]> {
    const response = await axios.get<PaginatedResponse<PostListItem>>(
      API_ENDPOINTS.postsTrending
    );
    return response.data.results || [];
  }

  async getInsights(): Promise<Insights> {
    const response = await axios.get<Insights>(API_ENDPOINTS.postsInsights);
    return response.data;
  }

  async votePost(
    postId: number,
    voteType: 1 | -1
  ): Promise<{ upvotes: number; downvotes: number; score: number }> {
    const response = await axios.post(`${API_ENDPOINTS.posts}${postId}/vote/`, {
      vote_type: voteType,
    });
    return response.data;
  }

  // Comments API
  async getComments(postId?: number): Promise<PaginatedResponse<Comment>> {
    const params = postId ? { post_id: postId } : {};
    const response = await axios.get<PaginatedResponse<Comment>>(
      API_ENDPOINTS.comments,
      { params }
    );
    return response.data;
  }

  async createComment(data: Partial<Comment>): Promise<Comment> {
    const response = await axios.post<Comment>(API_ENDPOINTS.comments, data);
    return response.data;
  }
}

export default new ApiService();
