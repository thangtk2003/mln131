import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Calendar,
  ArrowLeft,
  User,
} from "lucide-react";
import ApiService from "@/services/api";
import type { Post, Comment } from "@/types";
import LoadingSpinner from "@/components/LoadingSpinner";

/**
 * Post Detail Page - View post and comments
 */
export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newComment, setNewComment] = useState("");
  const [commentAuthorName, setCommentAuthorName] = useState("");

  useEffect(() => {
    if (id) {
      loadPostDetail(parseInt(id));
    }
  }, [id]);

  const loadPostDetail = async (postId: number) => {
    try {
      setLoading(true);
      const [postData, commentsData] = await Promise.all([
        ApiService.getPostById(postId),
        ApiService.getComments(postId),
      ]);
      setPost(postData);
      setComments(commentsData.results);
    } catch (err) {
      setError("Không thể tải bài viết");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (voteType: 1 | -1) => {
    if (!post) return;
    try {
      const result = await ApiService.votePost(post.id, voteType);
      setPost({
        ...post,
        upvotes: result.upvotes,
        downvotes: result.downvotes,
      });
    } catch (err) {
      console.error("Error voting:", err);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) return <LoadingSpinner />;
  if (error || !post)
    return (
      <div className="text-center text-red-500 py-8">
        {error || "Không tìm thấy bài viết"}
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate("/forum")}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Quay lại Forum</span>
      </button>

      {/* Post Content */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {post.title}
              {post.is_solution && (
                <span className="ml-3 px-3 py-1 text-sm bg-green-100 text-green-700 rounded">
                  Giải pháp
                </span>
              )}
            </h1>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>{post.author_name}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.created_at)}</span>
              </span>
              {post.case_study_title && (
                <span className="px-2 py-1 bg-primary-50 text-primary-700 rounded text-xs">
                  {post.case_study_title}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="prose max-w-none mb-6">
          <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
            {post.content}
          </p>
        </div>

        {post.image_url && (
          <div className="mb-6">
            <img
              src={post.image_url}
              alt={post.title}
              className="rounded-lg max-w-full"
            />
          </div>
        )}

        {post.video_url && (
          <div className="mb-6">
            <a
              href={post.video_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-500 hover:underline"
            >
              Xem video đính kèm →
            </a>
          </div>
        )}

        {/* Voting */}
        <div className="flex items-center space-x-4 pt-6 border-t">
          <button
            onClick={() => handleVote(1)}
            className="flex items-center space-x-2 px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition"
          >
            <ThumbsUp className="w-5 h-5" />
            <span className="font-semibold">{post.upvotes}</span>
          </button>
          <button
            onClick={() => handleVote(-1)}
            className="flex items-center space-x-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition"
          >
            <ThumbsDown className="w-5 h-5" />
            <span className="font-semibold">{post.downvotes}</span>
          </button>
          <div className="flex items-center space-x-2 text-gray-600">
            <MessageCircle className="w-5 h-5" />
            <span>{post.comment_count} bình luận</span>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Bình luận ({comments.length})
        </h2>

        {/* Comment Form */}
        <div className="mb-8">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Họ và tên của bạn
            </label>
            <input
              type="text"
              value={commentAuthorName}
              onChange={(e) => setCommentAuthorName(e.target.value)}
              placeholder="Nhập họ và tên..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Viết bình luận của bạn..."
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            rows={4}
          />
          <button
            onClick={async () => {
              if (!commentAuthorName.trim() || !newComment.trim()) {
                alert("Vui lòng nhập họ tên và nội dung bình luận");
                return;
              }
              try {
                await ApiService.createComment({
                  post: post.id,
                  author_name: commentAuthorName.trim(),
                  content: newComment.trim(),
                  parent: null,
                  is_active: true,
                });
                setNewComment("");
                setCommentAuthorName("");
                // Reload comments
                if (id) {
                  const commentsData = await ApiService.getComments(
                    parseInt(id)
                  );
                  setComments(commentsData.results);
                }
              } catch (err) {
                console.error("Error submitting comment:", err);
                alert("Có lỗi xảy ra khi gửi bình luận");
              }
            }}
            className="mt-2 px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition disabled:bg-gray-300"
            disabled={!commentAuthorName.trim() || !newComment.trim()}
          >
            Gửi bình luận
          </button>
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="border-l-2 border-gray-200 pl-4 py-2"
            >
              <div className="flex items-center space-x-2 mb-2">
                <User className="w-4 h-4 text-gray-500" />
                <span className="font-semibold text-gray-900">
                  {comment.author_name}
                </span>
                <span className="text-sm text-gray-500">·</span>
                <span className="text-sm text-gray-500">
                  {formatDate(comment.created_at)}
                </span>
              </div>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          ))}
        </div>

        {comments.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            Chưa có bình luận nào. Hãy là người đầu tiên!
          </div>
        )}
      </div>
    </div>
  );
}
