import { BookOpen, Volume2 } from "lucide-react";

/**
 * Theory Page - Display theoretical foundation content
 */
export default function TheoryPage() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Lý thuyết Nền tảng
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Đảng lãnh đạo - Nhà nước quản lý - Nhân dân làm chủ
        </p>

        {/* Podcast Player */}
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 shadow-md">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Volume2 className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Podcast: Giải Mã Bản Chất Dân Chủ Xã Hội Chủ Nghĩa Việt Nam
            </h3>
          </div>
          <audio controls className="w-full" preload="metadata">
            <source
              src="/Giải_Mã__Bản_Chất_Dân_Chủ_Xã_Hội_Chủ_Nghĩa_Việt_Nam__Ba_Trụ_Cột.m4a"
              type="audio/mp4"
            />
            Trình duyệt của bạn không hỗ trợ phát audio.
          </audio>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
        <div className="flex items-center space-x-3 mb-8">
          <BookOpen className="w-8 h-8 text-blue-600" />
          <h2 className="text-3xl font-bold text-gray-900">
            Bản chất của nền dân chủ xã hội chủ nghĩa ở Việt Nam
          </h2>
        </div>

        <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
          {/* Đoạn 1 */}
          <div className="pl-6 border-l-4 border-blue-500">
            <p className="leading-relaxed">
              Dân chủ xã hội chủ nghĩa (XHCN) ở Việt Nam là bản chất của Nhà
              nước, đồng thời là mục tiêu và động lực của sự phát triển. Đây là
              nền dân chủ{" "}
              <strong>của nhân dân, do nhân dân và vì nhân dân</strong>; mọi
              quyền lực thuộc về nhân dân và được thực hiện dưới sự lãnh đạo của
              Đảng Cộng sản Việt Nam.
            </p>
          </div>

          {/* Đoạn 2 */}
          <div className="pl-6 border-l-4 border-cyan-500">
            <p className="leading-relaxed">
              Khác với dân chủ tư sản chỉ dừng lại ở quyền bầu cử và ứng cử, dân
              chủ XHCN ở Việt Nam bao quát rộng hơn, thể hiện ở việc nhân dân
              được tham gia quản lý nhà nước, xã hội, giám sát, phản biện và
              quyết định các vấn đề thiết thực liên quan đến đời sống của mình.
            </p>
          </div>

          {/* Nguyên tắc cơ bản */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 mt-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Nguyên tắc cơ bản: "Đảng lãnh đạo – Nhà nước quản lý – Nhân dân
              làm chủ"
            </h3>

            <div className="space-y-4">
              {/* Đảng lãnh đạo */}
              <div className="bg-white rounded-lg p-5 shadow-sm">
                <h4 className="text-lg font-semibold text-blue-700 mb-2 flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Đảng lãnh đạo
                </h4>
                <p className="text-gray-700 pl-5">
                  Đảng Cộng sản Việt Nam giữ vai trò định hướng, đề ra chủ
                  trương, đường lối đúng đắn, bảo đảm mọi hoạt động của bộ máy
                  nhà nước vì lợi ích của nhân dân.
                </p>
              </div>

              {/* Nhà nước quản lý */}
              <div className="bg-white rounded-lg p-5 shadow-sm">
                <h4 className="text-lg font-semibold text-cyan-700 mb-2 flex items-center">
                  <span className="w-2 h-2 bg-cyan-600 rounded-full mr-3"></span>
                  Nhà nước quản lý
                </h4>
                <p className="text-gray-700 pl-5">
                  Nhà nước thể chế hóa chủ trương của Đảng thành chính sách,
                  pháp luật, tổ chức thực hiện và quản lý xã hội bằng pháp luật.
                </p>
              </div>

              {/* Nhân dân làm chủ */}
              <div className="bg-white rounded-lg p-5 shadow-sm">
                <h4 className="text-lg font-semibold text-green-700 mb-2 flex items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                  Nhân dân làm chủ
                </h4>
                <p className="text-gray-700 pl-5">
                  Nhân dân trực tiếp hoặc gián tiếp thực hiện quyền lực của
                  mình, tham gia vào quá trình quản lý, giám sát, phản biện và
                  quyết định các vấn đề ở cơ sở.
                </p>
              </div>
            </div>
          </div>

          {/* Hình thức thực hiện */}
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Các hình thức thực hiện dân chủ
            </h3>

            {/* Dân chủ gián tiếp */}
            <div className="mb-6 bg-blue-50 rounded-xl p-6">
              <h4 className="text-xl font-semibold text-blue-800 mb-3">
                1. Dân chủ gián tiếp (Dân chủ đại diện)
              </h4>
              <p className="text-gray-700 leading-relaxed mb-3">
                Hình thức dân chủ gián tiếp là hình thức dân chủ đại diện, được
                thực hiện do nhân dân "ủy quyền", giao quyền lực của mình cho tổ
                chức mà nhân dân trực tiếp bầu ra. Những con người và tổ chức ấy
                đại diện cho nhân dân, thực hiện quyền làm chủ cho nhân dân.
              </p>
              <div className="bg-white rounded-lg p-4 border-l-4 border-blue-600">
                <p className="text-gray-700 leading-relaxed">
                  Nhân dân bầu ra <strong>Quốc hội</strong>. Quốc hội là cơ quan
                  quyền lực nhà nước cao nhất hoạt động theo nhiệm kỳ 5 năm.
                  Quyền lực nhà nước ta là thống nhất, có sự phân công, phối hợp
                  và kiểm soát giữa các cơ quan nhà nước trong việc thực hiện
                  các quyền <strong>lập pháp, hành pháp và tư pháp</strong>.
                </p>
              </div>
            </div>

            {/* Dân chủ trực tiếp */}
            <div className="bg-green-50 rounded-xl p-6">
              <h4 className="text-xl font-semibold text-green-800 mb-3">
                2. Dân chủ trực tiếp
              </h4>
              <p className="text-gray-700 leading-relaxed mb-4">
                Hình thức dân chủ trực tiếp là hình thức thông qua đó, nhân dân
                bằng hành động trực tiếp của mình thực hiện quyền làm chủ nhà
                nước và xã hội. Hình thức đó thể hiện ở các quyền:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-1">✓</span>
                  <span>Được thông tin về hoạt động của nhà nước</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-1">✓</span>
                  <span>
                    Được bàn bạc về công việc của nhà nước và cộng đồng dân cư
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-1">✓</span>
                  <span>Được bàn đến những quyết định về dân chủ cơ sở</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-1">✓</span>
                  <span>
                    Nhân dân kiểm tra, giám sát hoạt động của cơ quan nhà nước
                    từ Trung ương cho đến cơ sở
                  </span>
                </li>
              </ul>
              <div className="mt-4 bg-white rounded-lg p-4 border-l-4 border-green-600">
                <p className="text-gray-700 italic">
                  Dân chủ ngày càng được thể hiện trong tất cả các mối quan hệ
                  xã hội, trở thành quy chế, cách thức làm việc của mọi tổ chức
                  trong xã hội.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
