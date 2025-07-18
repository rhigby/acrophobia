import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LandingPage() {
  const [stats, setStats] = useState({
    totalPlayers: 0,
    gamesToday: 0,
    topPlayer: { name: "Loading...", score: 0 },
    roomsLive: 0,
  });

  useEffect(() => {
    fetch("https://acrophobia-backend-2.onrender.com/api/stats")
      .then((res) => res.json())
      .then(setStats)
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-300 font-mono">
      {/* Title Bar */}
      <div className="text-center bg-red-600 text-black font-extrabold text-5xl py-6 shadow-md">
        GMBD
      </div>

      {/* Round Info */}
      <div className="text-center text-sm bg-gray-900 py-1 uppercase tracking-wider">
        Face-Off Round 2
      </div>

      {/* Voting Prompt */}
      <div className="text-center py-4">
        <h2 className="text-lg">Great Miami's beaches, delightful</h2>
        <p className="text-xl text-yellow-400 font-bold mt-2">Choose Your Favorite</p>
        <div className="text-2xl text-white bg-gray-800 mt-3 py-2 px-4 inline-block rounded">
          {stats.roomsLive > 0 ? "GREAT MEN BORN DEAD" : "Waiting for players..."}
        </div>
      </div>

      {/* Scores */}
      <div className="flex justify-center gap-16 py-4 text-xl font-bold">
        <div className="text-pink-500">playa_oicu/1 <span className="ml-2">5</span></div>
        <div className="text-blue-400">Jackie <span className="ml-2">1</span></div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-950 py-6 px-4 text-sm grid grid-cols-2 md:grid-cols-4 gap-4 text-center border-t border-b border-gray-800">
        <div>
          <div className="text-lg font-bold">{stats.totalPlayers}</div>
          <div>Players Joined</div>
        </div>
        <div>
          <div className="text-lg font-bold">{stats.gamesToday}</div>
          <div>Games Today</div>
        </div>
        <div>
          <div className="text-lg font-bold">{stats.topPlayer.name}</div>
          <div>Top Player</div>
        </div>
        <div>
          <div className="text-lg font-bold">{stats.roomsLive}</div>
          <div>Rooms Active</div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-center gap-6 py-10">
        <a
          href="https://acrophobia-play.onrender.com"
          className="bg-green-500 text-black font-bold px-6 py-2 rounded hover:bg-green-400 transition"
        >
          Play Now
        </a>
        <a
          href="https://acrophobia-play.onrender.com"
          className="border border-green-500 text-green-300 px-6 py-2 rounded hover:bg-green-800"
        >
          Join Game
        </a>
      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-500 pb-6">
        © {new Date().getFullYear()} Acrophobia Game — All rights reserved
      </footer>
    </div>
  );
}

