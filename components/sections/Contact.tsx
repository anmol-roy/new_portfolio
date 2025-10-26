import { MapPin, CalendarDays, Star } from "lucide-react";
export default function Contact() {
  return (
   
    <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 bg-[#0d1117] border border-gray-800 rounded-2xl shadow-lg">
  {/* Left: Avatar & Name */}
  <div className="flex items-center gap-4">
    <img src="/anmol-avatar.png" alt="Anmol" className="h-20 w-20 rounded-full border border-gray-700" />
    <div>
      <h1 className="text-2xl font-semibold text-white">Anmol Roy</h1>
      <p className="text-gray-400">AI/ML Developer · Open Source Enthusiast</p>
      <div className="flex gap-3 mt-2 text-sm text-gray-400">
        <span>📍 India</span>
        <span>🕓 Joined: 2023</span>
      </div>
    </div>
  </div>

  {/* Right: Quick Stats */}
  <div className="flex gap-6 mt-4 sm:mt-0 text-center">
    <div>
      <h3 className="text-xl text-white font-semibold">25+</h3>
      <p className="text-gray-400 text-xs">Projects</p>
    </div>
    <div>
      <h3 className="text-xl text-white font-semibold">8</h3>
      <p className="text-gray-400 text-xs">Case Studies</p>
    </div>
    <div>
      <h3 className="text-xl text-white font-semibold">⭐ 150+</h3>
      <p className="text-gray-400 text-xs">Achievements</p>
    </div>
  </div>
</div>

  );
}