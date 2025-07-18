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
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-800 text-white font-sans">
      {/* Hero Section */}
      <section className="text-center py-16 px-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-6xl font-bold text-green-400 mb-4 tracking-tight"
        >
          Acrophobia
        </motion.h1>
        <p className="text-lg text-gray-300 max-w-xl mx-auto">
          The acronym battle game where wit wins. Submit hilarious expansions, vote for the best, and climb the leaderboard!
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <a
            href="https://acrophobia-play.onrender.com"
            className="bg-green-500 text-black font-semibold px-6 py-3 rounded-md hover:bg-green-400 transition"
          >
            Play Now
          </a>
          <a
            href="https://acrophobia-play.onrender.com"
            className="border border-green-400 text-green-300 px-6 py-3 rounded-md hover:bg-green-900"
          >
            Join Game
          </a>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-zinc-950 py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <h2 className="text-3xl font-bold text-green-400">{stats.totalPlayers}</h2>
            <p className="text-sm text-gray-400">Players Joined</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-green-400">{stats.gamesToday}</h2>
            <p className="text-sm text-gray-400">Games Today</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-yellow-300">{stats.topPlayer.name}</h2>
            <p className="text-sm text-gray-400">Top Player</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-green-400">{stats.roomsLive}</h2>
            <p className="text-sm text-gray-400">Active Rooms</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-2xl font-semibold mb-6 text-green-300">How It Works</h2>
        <div className="grid gap-6 md:grid-cols-4 max-w-6xl mx-auto">
          {["Get an Acronym", "Write Something Clever", "Vote for the Funniest", "Climb the Leaderboard"].map((text, i) => (
            <div
              key={i}
              className="bg-zinc-800 rounded-lg py-6 px-4 shadow-md border border-zinc-700 hover:border-green-400 transition"
            >
              <p className="text-lg font-medium text-white">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-8 border-t border-zinc-700">
        © {new Date().getFullYear()} Acrophobia Game. All rights reserved.
      </footer>
    </div>
  );
}

