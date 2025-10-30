import { Shield, CheckCircle, AlertTriangle, FileText } from "lucide-react";

export default function AIUsagePage() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Phụ lục AI (AI Usage)
        </h1>
        <p className="text-lg text-gray-600">
          Minh bạch về việc sử dụng công cụ AI trong quá trình phát triển sản
          phẩm
        </p>
      </div>

      {/* Cam kết */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl shadow-lg p-8 mb-8 text-white">
        <div className="flex items-start space-x-4">
          <Shield className="w-12 h-12 flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Cam kết Liêm chính Học thuật
            </h2>
            <div className="space-y-3 text-blue-50">
              <p className="flex items-start">
                <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>
                  Chúng tôi cam kết{" "}
                  <strong>không để AI làm thay hoàn toàn</strong> bất kỳ phần
                  nào của sản phẩm. AI chỉ đóng vai trò <strong>hỗ trợ</strong>{" "}
                  trong quá trình phát triển.
                </span>
              </p>
              <p className="flex items-start">
                <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>
                  Mọi nội dung do AI sinh ra đều được{" "}
                  <strong>kiểm chứng, chỉnh sửa và biên soạn lại</strong>
                  bởi nhóm sinh viên để đảm bảo tính chính xác và phù hợp.
                </span>
              </p>
              <p className="flex items-start">
                <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>
                  Tất cả thông tin lý thuyết được{" "}
                  <strong>đối chiếu với nguồn chính thống</strong>: giáo trình
                  Luật và Lịch sử Chính trị (LLCT), Nghị quyết, văn bản pháp
                  luật của Đảng và Nhà nước.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Nguyên tắc sử dụng AI */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-blue-500">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Minh bạch</h3>
          <p className="text-sm text-gray-600">
            Liệt kê đầy đủ công cụ AI, mục đích sử dụng, prompt và kết quả
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-green-500">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Có trách nhiệm</h3>
          <p className="text-sm text-gray-600">
            Kiểm chứng thông tin AI với nguồn chính thống, chịu trách nhiệm về
            nội dung
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-purple-500">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Sáng tạo</h3>
          <p className="text-sm text-gray-600">
            AI hỗ trợ công việc kỹ thuật, không thay thế tư duy và sáng tạo con
            người
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-orange-500">
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-orange-600" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Liêm chính</h3>
          <p className="text-sm text-gray-600">
            Cam kết bằng văn bản, phân định rõ AI output và phần chỉnh sửa
          </p>
        </div>
      </div>

      {/* Bảng chi tiết sử dụng AI */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6">
          <h2 className="text-2xl font-bold text-white">
            Chi tiết Sử dụng Công cụ AI
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-32">
                  Công cụ AI
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-48">
                  Mục đích sử dụng
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Prompt chính / Yêu cầu
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Kết quả AI tạo ra
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Phần sinh viên chỉnh sửa
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-40">
                  Nguồn kiểm chứng
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* GitHub Copilot - Backend */}
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-semibold text-gray-900">
                    GitHub Copilot
                  </div>
                  <div className="text-xs text-gray-500">Code Assistant</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  Hỗ trợ code Django backend API, models, serializers
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  - "Create Django REST API for forum with Post, Comment, Vote
                  models"
                  <br />
                  - "Implement anonymous posting without authentication"
                  <br />- "Add session-based voting system"
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  Đề xuất code structure, API endpoints, model relationships,
                  serializers boilerplate
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  - Điều chỉnh logic nghiệp vụ
                  <br />
                  - Thêm validation rules
                  <br />
                  - Tối ưu database queries
                  <br />- Custom permissions
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  Django docs, REST framework best practices
                </td>
              </tr>

              {/* GitHub Copilot - Frontend */}
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-semibold text-gray-900">
                    GitHub Copilot
                  </div>
                  <div className="text-xs text-gray-500">Code Assistant</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  Hỗ trợ code React components, TypeScript interfaces
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  - "Create React components for forum page with Tailwind CSS"
                  <br />
                  - "Implement Vietnam map with react-simple-maps"
                  <br />- "Add modal to display infographic images"
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  Component structure, TypeScript types, Tailwind CSS classes,
                  event handlers
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  - Tùy chỉnh UI/UX
                  <br />
                  - Điều chỉnh responsive design
                  <br />
                  - Tối ưu performance
                  <br />- Fix bugs và edge cases
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  React docs, Tailwind CSS docs
                </td>
              </tr>

              {/* ChatGPT - Nội dung lý thuyết */}
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-semibold text-gray-900">ChatGPT 4</div>
                  <div className="text-xs text-gray-500">Language Model</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  Hỗ trợ cấu trúc nội dung lý thuyết về dân chủ cơ sở
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  "Tóm tắt bản chất dân chủ XHCN Việt Nam theo nguyên tắc Đảng
                  lãnh đạo - Nhà nước quản lý - Nhân dân làm chủ"
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  Bản draft cấu trúc nội dung, các điểm chính về dân chủ gián
                  tiếp và trực tiếp
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  - Đối chiếu với giáo trình LLCT
                  <br />
                  - Thêm trích dẫn cụ thể
                  <br />
                  - Chỉnh sửa ngôn ngữ chính xác
                  <br />- Bổ sung ví dụ thực tế
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <strong>Giáo trình LLCT</strong>, Hiến pháp 2013, Nghị quyết
                  TW
                </td>
              </tr>

              {/* NotebookLM - Podcast */}
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-semibold text-gray-900">NotebookLM</div>
                  <div className="text-xs text-gray-500">Google AI</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  Tạo podcast giải thích lý thuyết dân chủ XHCN
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  Upload nội dung lý thuyết đã được kiểm chứng → "Generate Audio
                  Overview"
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  File audio podcast (m4a) giải thích ba trụ cột của dân chủ
                  XHCN
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  - Kiểm tra nội dung audio
                  <br />
                  - Đảm bảo không có thông tin sai lệch
                  <br />- Embed vào website
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  Nội dung input đã được kiểm chứng từ giáo trình
                </td>
              </tr>

              {/* Canva AI - Infographic */}
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-semibold text-gray-900">Canva AI</div>
                  <div className="text-xs text-gray-500">Design Tool</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  Hỗ trợ thiết kế infographic về case study dân chủ cơ sở
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  - "Generate layout for democracy infographic"
                  <br />
                  - "Create visual elements for government structure"
                  <br />- AI background removal, color suggestions
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  Template layout, màu sắc, icons, background patterns
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  - Thêm nội dung case study cụ thể
                  <br />
                  - Điều chỉnh layout phù hợp
                  <br />
                  - Thay đổi màu sắc, font chữ
                  <br />- Thêm số liệu thực tế địa phương
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  Báo cáo chính thức từ UBND các địa phương
                </td>
              </tr>

              {/* Claude AI - Documentation */}
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-semibold text-gray-900">Claude AI</div>
                  <div className="text-xs text-gray-500">Language Model</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  Hỗ trợ viết documentation và deployment guide
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  "Create comprehensive deployment guide for Django + React app
                  on Render and Vercel"
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  Cấu trúc deployment guide, các bước cấu hình, troubleshooting
                  tips
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  - Kiểm tra từng bước thực tế
                  <br />
                  - Thêm screenshots
                  <br />
                  - Bổ sung lỗi gặp phải
                  <br />- Viết tiếng Việt
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  Render docs, Vercel docs, Django docs
                </td>
              </tr>

              {/* TopoJSON Vietnam Map */}
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-semibold text-gray-900">Gemini 2.5 Flash and 2.5 Pro</div>
                  <div className="text-xs text-gray-500">
                    Research Assistant
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  Tìm kiếm TopoJSON data cho bản đồ Việt Nam
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  "Find TopoJSON files for Vietnam map including Paracel and
                  Spratly Islands"
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  Đề xuất GitHub gists và nguồn dữ liệu bản đồ
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  - Kiểm tra tính chính xác của bản đồ
                  <br />
                  - Verify có đầy đủ Hoàng Sa và Trường Sa
                  <br />- Test hiển thị trên map
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  GADM database (gadm.org), Natural Earth Data
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Tóm tắt tỷ lệ sử dụng */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Tỷ lệ Đóng góp
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="text-4xl font-bold text-blue-600 mb-2">~40%</div>
            <div className="text-gray-700 font-semibold mb-2">AI Hỗ trợ</div>
            <p className="text-sm text-gray-600">
              Code boilerplate, suggestions, template design, cấu trúc nội dung
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="text-4xl font-bold text-green-600 mb-2">~60%</div>
            <div className="text-gray-700 font-semibold mb-2">
              Sinh viên thực hiện
            </div>
            <p className="text-sm text-gray-600">
              Chỉnh sửa code, design, logic nghiệp vụ, kiểm chứng nội dung,
              debugging, testing
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="text-4xl font-bold text-purple-600 mb-2">100%</div>
            <div className="text-gray-700 font-semibold mb-2">
              Trách nhiệm nội dung
            </div>
            <p className="text-sm text-gray-600">
              Sinh viên chịu hoàn toàn trách nhiệm về độ chính xác và chất lượng
              sản phẩm cuối
            </p>
          </div>
        </div>
      </div>

      {/* Kết luận */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Kết luận</h2>
        <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
          <p>
            Sản phẩm này được phát triển với sự hỗ trợ của các công cụ AI hiện
            đại, nhưng
            <strong> không phụ thuộc hoàn toàn vào AI</strong>. Mọi nội dung lý
            thuyết về dân chủ cơ sở đều được đối chiếu với nguồn chính thống từ
            giáo trình LLCT, Hiến pháp, và các văn bản pháp luật.
          </p>
          <p>Nhóm sinh viên đã chủ động trong việc:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Nghiên cứu và thu thập dữ liệu case study từ các địa phương</li>
            <li>Thiết kế giao diện người dùng và trải nghiệm tương tác</li>
            <li>
              Kiểm chứng toàn bộ thông tin lý thuyết với nguồn chính thống
            </li>
            <li>Debug, test và tối ưu hóa code</li>
            <li>Deploy và vận hành hệ thống</li>
          </ul>
          <p className="text-lg font-semibold text-blue-700 border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 rounded">
            AI là công cụ hỗ trợ, con người là người quyết định và chịu trách
            nhiệm.
          </p>
        </div>
      </div>
    </div>
  );
}
