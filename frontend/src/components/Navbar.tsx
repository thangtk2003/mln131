import { NavLink } from "react-router-dom";
import { BookOpen, Map, MessageSquare } from "lucide-react";
import clsx from "clsx";

/**
 * Navigation Bar Component
 */
export default function Navbar() {
  const navItems = [
    { path: "/theory", label: "Lý thuyết Nền tảng", icon: BookOpen },
    { path: "/map", label: "Bản đồ Thực tiễn", icon: Map },
    { path: "/forum", label: "Cổng Đối thoại", icon: MessageSquare },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink
            to="/"
            className="flex items-center space-x-2 text-xl font-bold text-primary-500 hover:text-primary-600 transition"
          >
            <Map className="w-7 h-7" />
            <span className="hidden sm:inline">Đối thoại Dân chủ Cơ sở</span>
            <span className="sm:hidden">ĐTDCCS</span>
          </NavLink>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  clsx(
                    "flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                    isActive
                      ? "bg-primary-500 text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100"
                  )
                }
              >
                <Icon className="w-4 h-4" />
                <span className="hidden md:inline">{label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
