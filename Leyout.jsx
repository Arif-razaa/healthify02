import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Activity, MessageCircle, Camera, MapPin, LayoutDashboard, LogOut, User as UserIcon, Sparkles, Pill } from "lucide-react";
import { User } from "@/entities/User";
import { motion } from "framer-motion";
import ProfileModal from "@/components/ProfileModal";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Dashboard",
    url: createPageUrl("Dashboard"),
    icon: LayoutDashboard,
    color: "text-sky-600"
  },
  {
    title: "Symptom Checker",
    url: createPageUrl("SymptomChecker"),
    icon: Activity,
    color: "text-blue-600"
  },
  {
    title: "AI Health Chat",
    url: createPageUrl("HealthChat"),
    icon: MessageCircle,
    color: "text-cyan-600"
  },
  {
    title: "Skin Analysis",
    url: createPageUrl("SkinAnalysis"),
    icon: Camera,
    color: "text-sky-700"
  },
  {
    title: "Medicine Info",
    url: createPageUrl("MedicineInfo"),
    icon: Pill,
    color: "text-purple-600"
  },
  {
    title: "Find Healthcare",
    url: createPageUrl("FindHealthcare"),
    icon: MapPin,
    color: "text-blue-700"
  },
];

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  useEffect(() => {
    loadUser();
  }, [location.pathname]);

  const loadUser = async () => {
    try {
      const currentUser = await User.me();
      setUser(currentUser);
      
      // If no user and not on login page, redirect to login
      if (!currentUser && location.pathname !== '/login') {
        navigate('/login');
      }
    } catch (error) {
      console.error("Error loading user:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await User.logout();
      setUser(null);
      // Redirect to login page after logout
      navigate('/login');
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <SidebarProvider>
      <style>{`
        :root {
          --primary-sky: #0EA5E9;
          --primary-blue: #3B82F6;
          --primary-cyan: #06B6D4;
        }
        
        body {
          background: linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 50%, #CFFAFE 100%);
        }

        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      
      <div className="min-h-screen flex w-full">
        <Sidebar className="border-r-2 border-sky-200 bg-white/90 backdrop-blur-md">
          <SidebarHeader className="border-b-2 border-sky-200 p-6 bg-gradient-to-br from-sky-50 to-blue-50">
            <motion.div 
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="w-12 h-12 bg-gradient-to-br from-sky-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <Activity className="w-7 h-7 text-white" />
              </motion.div>
              <div>
                <h2 className="font-bold bg-gradient-to-r from-sky-600 to-blue-500 bg-clip-text text-transparent text-xl">Healthify</h2>
                <p className="text-xs text-gray-600 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  AI Health Assistant
                </p>
              </div>
            </motion.div>
          </SidebarHeader>
          
          <SidebarContent className="p-3">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-bold text-sky-600 uppercase tracking-wider px-3 py-2">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <SidebarMenuItem>
                        <SidebarMenuButton 
                          asChild 
                          className={`hover:bg-gradient-to-r hover:from-sky-100 hover:to-blue-100 transition-all duration-300 rounded-xl mb-1 ${
                            location.pathname === item.url 
                              ? 'bg-gradient-to-r from-sky-500 to-blue-500 text-white hover:text-white shadow-lg' 
                              : ''
                          }`}
                        >
                          <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                            <item.icon className={`w-5 h-5 ${location.pathname === item.url ? 'text-white' : item.color}`} />
                            <span className="font-semibold">{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </motion.div>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup className="mt-4">
              <SidebarGroupLabel className="text-xs font-bold text-sky-600 uppercase tracking-wider px-3 py-2">
                Health Tip of the Day
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <motion.div 
                  className="mx-3 p-4 bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-50 rounded-xl border-2 border-sky-200 shadow-md"
                  animate={{ 
                    boxShadow: [
                      "0 4px 6px rgba(0,0,0,0.1)",
                      "0 8px 12px rgba(14,165,233,0.2)",
                      "0 4px 6px rgba(0,0,0,0.1)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <p className="text-sm text-gray-700 font-medium">
                    💧 Stay hydrated! Drink at least 8 glasses of water daily for optimal health and better skin.
                  </p>
                </motion.div>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t-2 border-sky-200 p-4 bg-gradient-to-br from-sky-50 to-blue-50">
            {user && (
              <motion.div 
                className="space-y-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <button
                  onClick={() => setIsProfileModalOpen(true)}
                  className="w-full flex items-center gap-3 p-3 bg-white rounded-xl shadow-md border-2 border-sky-200 hover:border-sky-400 hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <motion.div 
                    className="w-12 h-12 bg-gradient-to-br from-sky-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <UserIcon className="w-6 h-6 text-white" />
                  </motion.div>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="font-bold text-gray-900 text-sm truncate">{user.full_name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                </button>
                <motion.button
                  onClick={handleLogout}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-red-50 to-pink-50 hover:from-red-100 hover:to-pink-100 text-red-600 rounded-xl transition-all duration-300 text-sm font-bold border-2 border-red-200"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </motion.button>
              </motion.div>
            )}
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="bg-white/90 backdrop-blur-md border-b-2 border-sky-200 px-6 py-4 md:hidden sticky top-0 z-10 shadow-md">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-sky-100 p-2 rounded-lg transition-colors duration-200" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-sky-600 to-blue-500 bg-clip-text text-transparent">HealthAI</h1>
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Profile Modal */}
      <ProfileModal 
        isOpen={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)}
        user={user}
      />
    </SidebarProvider>
  );
}