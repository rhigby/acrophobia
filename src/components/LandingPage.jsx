import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LandingPage() {
  const [stats, setStats] = useState({
    totalPlayers: 0,
    gamesToday: 0,
    roomsLive: 0,
    top10Daily: [],
    top10Weekly: [],
  });

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // replace with real check later

  useEffect(() => {
    const fetchStats = () => {
      fetch("https://acrophobia-backend-2.onrender.com/api/stats")
        .then((res) => res.json())
        .then(setStats)
        .catch(console.error);
    };
    fetchStats();
    const interval = setInterval(fetchStats, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-blue-900 text-white font-sans">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-blue-950 border-b border-blue-800 shadow-md py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-extrabold text-red-600 drop-shadow-[0_0_8px_orange]">ACROPHOBIA</h1>
        <div className="relative group">
          <button className="text-white font-semibold px-4 py-2 rounded-md bg-blue-800 hover:bg-blue-700">User</button>
          <div className="absolute right-0 hidden group-hover:block mt-2 bg-blue-800 border border-blue-700 rounded shadow-md w-48">
            {isLoggedIn ? (
              <>
                <a href="#" className="block px-4 py-2 hover:bg-blue-700 text-sm">My Stats</a>
                <a href="#" className="block px-4 py-2 hover:bg-blue-700 text-sm">User Settings</a>
                <a href="#" className="block px-4 py-2 hover:bg-blue-700 text-sm">Logout</a>
              </>
            ) : (
              <a
                href="#"
                className="block px-4 py-2 hover:bg-blue-700 text-sm"
                onClick={() => setShowAuthModal(true)}
              >
                Login / Register
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-blue-950 border border-blue-700 rounded-lg p-6 w-96 relative">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-2 right-2 text-blue-300 hover:text-orange-400"
            >
              ✖
            </button>
            <h2 className="text-xl font-bold text-orange-300 mb-4">Login / Register</h2>
            <form className="space-y-4">
              <input type="text" placeholder="Username" className="w-full px-3 py-2 rounded bg-blue-900 text-white border border-blue-700 focus:outline-none" />
              <input type="email" placeholder="Email" className="w-full px-3 py-2 rounded bg-blue-900 text-white border border-blue-700 focus:outline-none" />
              <input type="password" placeholder="Password" className="w-full px-3 py-2 rounded bg-blue-900 text-white border border-blue-700 focus:outline-none" />
              <button className="w-full bg-red-600 hover:bg-red-500 py-2 rounded text-white font-semibold transition">Submit</button>
            </form>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="text-center py-16 px-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-6xl font-extrabold text-red-600 mb-4 tracking-widest drop-shadow-[0_0_10px_orange]"
        >
          ACROPHOBIA
        </motion.h1>
        <p className="text-lg text-blue-100 max-w-xl mx-auto">
          The acronym battle game where wit wins. Submit hilarious expansions, vote for the best, and climb the leaderboard!
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <a
            href="https://acrophobia-play.onrender.com"
            className="bg-red-600 text-white font-semibold px-6 py-3 rounded-md shadow hover:bg-red-500 transition"
          >
            Play Now
          </a>
          <a
            href="https://acrophobia-play.onrender.com"
            className="border border-orange-500 text-orange-300 px-6 py-3 rounded-md hover:bg-orange-800 transition"
          >
            Join Game
          </a>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-950 py-12 px-4 border-y border-blue-800">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <h2 className="text-3xl font-bold text-orange-400 drop-shadow">{stats.totalPlayers}</h2>
            <p className="text-sm text-blue-200">Players Joined</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-orange-400 drop-shadow">{stats.gamesToday}</h2>
            <p className="text-sm text-blue-200">Games Today</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-orange-400 drop-shadow">{stats.roomsLive}</h2>
            <p className="text-sm text-blue-200">Active Rooms</p>
          </div>
        </div>
      </section>

      {/* Leaderboard Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-center text-orange-300 mb-10">Leaderboard</h2>
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-xl text-yellow-300 mb-4">🔥 Top 10 Today</h3>
            <ul className="space-y-2">
              {stats.top10Daily.map((p, i) => (
                <li key={i} className="bg-blue-900 px-4 py-2 rounded border border-blue-700 text-white flex justify-between">
                  <span>{i + 1}. {p.username}</span>
                  <span>{p.total_points} pts</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl text-yellow-300 mb-4">🏆 Top 10 This Week</h3>
            <ul className="space-y-2">
              {stats.top10Weekly.map((p, i) => (
                <li key={i} className="bg-blue-900 px-4 py-2 rounded border border-blue-700 text-white flex justify-between">
                  <span>{i + 1}. {p.username}</span>
                  <span>{p.total_points} pts</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-2xl font-semibold mb-6 text-orange-300">How It Works</h2>
        <div className="grid gap-6 md:grid-cols-4 max-w-6xl mx-auto">
          {["Get an Acronym", "Write Something Clever", "Vote for the Funniest", "Climb the Leaderboard"].map((text, i) => (
            <div
              key={i}
              className="bg-blue-900 rounded-lg py-6 px-4 shadow-md border border-blue-700 hover:border-orange-400 transition"
            >
              <p className="text-lg font-medium text-white">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-blue-400 py-8 border-t border-blue-800">
        © {new Date().getFullYear()} Acrophobia Game. All rights reserved.
      </footer>
    </div>
  );
}

