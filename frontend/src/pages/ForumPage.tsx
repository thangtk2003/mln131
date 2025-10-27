import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  TrendingUp,
  Lightbulb,
  MessageCircle,
  ThumbsUp,
  Calendar,
  Plus,
} from "lucide-react";
import ApiService from "@/services/api";
import type { PostListItem, Insights } from "@/types";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

/**
 * Forum Page - Dashboard, Forum, Solutions
 */
export default function ForumPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [posts, setPosts] = useState<PostListItem[]>([]);
  const [solutions, setSolutions] = useState<PostListItem[]>([]);
  const [insights, setInsights] = useState<Insights | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tab = searchParams.get("tab") || "dashboard";
    setActiveTab(tab);
    loadForumData();
  }, [searchParams]);

  const loadForumData = async () => {
    try {
      setLoading(true);
      const [postsData, solutionsData, insightsData] = await Promise.all([
        ApiService.getPosts({ ordering: "-created_at" }),
        ApiService.getSolutions(),
        ApiService.getInsights(),
      ]);
      setPosts(postsData.results);
      setSolutions(solutionsData);
      setInsights(insightsData);
    } catch (err) {
      console.error("Error loading forum data:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const COLORS = ["#2D9CDB", "#27AE60", "#F2994A", "#EB5757", "#9B51E0"];

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Cổng Đối thoại & Phân tích
          </h1>
          <p className="text-gray-600">
            Tiếng nói cộng đồng - Giải pháp từ nhân dân
          </p>
        </div>
        <button
          onClick={() => navigate("/forum/create")}
          className="flex items-center space-x-2 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition shadow-md"
        >
          <Plus className="w-5 h-5" />
          <span>Tạo bài đăng</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-6 border-b border-gray-200">
        {[
          { id: "dashboard", label: "Dashboard Phân tích", icon: TrendingUp },
          { id: "forum", label: "Forum Đối thoại", icon: MessageCircle },
          { id: "solutions", label: "Kho Giải pháp", icon: Lightbulb },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => {
              setActiveTab(id);
              navigate(`?tab=${id}`);
            }}
            className={`flex items-center space-x-2 px-4 py-3 font-medium transition-all ${
              activeTab === id
                ? "text-primary-600 border-b-2 border-primary-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "dashboard" && insights && (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Tổng bài viết</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {insights.total_posts}
                  </p>
                </div>
                <MessageCircle className="w-12 h-12 text-primary-500" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Giải pháp đề xuất</p>
                  <p className="text-3xl font-bold text-green-600">
                    {insights.total_solutions}
                  </p>
                </div>
                <Lightbulb className="w-12 h-12 text-green-500" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Bình luận</p>
                  <p className="text-3xl font-bold text-orange-600">
                    {insights.total_comments}
                  </p>
                </div>
                <MessageCircle className="w-12 h-12 text-orange-500" />
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Posts */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Top 5 bài viết</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={insights.top_posts.slice(0, 5)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="title"
                    angle={-45}
                    textAnchor="end"
                    height={100}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="score" fill="#2D9CDB" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Posts by Case */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">
                Bài viết theo Case Study
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={insights.posts_by_case.slice(0, 5)}
                    dataKey="count"
                    nameKey="case_study__title"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {insights.posts_by_case.slice(0, 5).map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {activeTab === "forum" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Tất cả bài viết</h2>
            <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition">
              Tạo bài viết mới
            </button>
          </div>

          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition cursor-pointer"
              onClick={() => navigate(`/forum/post/${post.id}`)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {post.title}
                    {post.is_solution && (
                      <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
                        Giải pháp
                      </span>
                    )}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(post.created_at)}</span>
                    </span>
                    <span>bởi {post.author_name}</span>
                    <span className="flex items-center space-x-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.comment_count} bình luận</span>
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <div className="flex items-center space-x-1 px-3 py-1 bg-green-50 rounded">
                    <ThumbsUp className="w-4 h-4 text-green-600" />
                    <span className="font-semibold text-green-600">
                      {post.score}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "solutions" && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Kho Giải pháp</h2>
          {solutions.map((solution) => (
            <div
              key={solution.id}
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition cursor-pointer border-l-4 border-green-500"
              onClick={() => navigate(`/forum/post/${solution.id}`)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Lightbulb className="w-5 h-5 text-green-600" />
                    <h3 className="text-xl font-semibold text-gray-900">
                      {solution.title}
                    </h3>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(solution.created_at)}</span>
                    </span>
                    <span>bởi {solution.author_name}</span>
                    <span className="flex items-center space-x-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{solution.comment_count} bình luận</span>
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <div className="flex items-center space-x-1 px-3 py-1 bg-green-50 rounded">
                    <ThumbsUp className="w-4 h-4 text-green-600" />
                    <span className="font-semibold text-green-600">
                      {solution.score}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
