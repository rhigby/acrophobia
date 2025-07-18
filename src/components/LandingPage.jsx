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
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-900 text-white font-sans">
      {/* Hero Section */}
      <section className="text-center py-20 px-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-extrabold mb-4"
        >
          Acrophobia
        </motion.h1>
        <p className="text-xl mb-6">The hilarious acronym battle game. Create. Laugh. Vote. Win.</p>
        <div className="space-x-4">
          <a
            href="https://acrophobia-play.onrender.com"
            className="bg-white text-indigo-900 font-bold px-6 py-2 rounded-full shadow-md"
          >
            Play Now
          </a>
          <a
            href="https://acrophobia-play.onrender.com"
            className="border border-white px-6 py-2 rounded-full"
          >
            Join Game
          </a>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white text-indigo-900 py-12 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div>
            <h2 className="text-4xl font-bold">{stats.totalPlayers}</h2>
            <p className="text-lg">Players Joined</p>
          </div>
          <div>
            <h2 className="text-4xl font-bold">{stats.gamesToday}</h2>
            <p className="text-lg">Games Today</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">{stats.topPlayer.name}</h2>
            <p className="text-sm">Top Player ({stats.topPlayer.score} pts)</p>
          </div>
          <div>
            <h2 className="text-4xl font-bold">{stats.roomsLive}</h2>
            <p className="text-lg">Rooms Live</p>
          </div>
        </div>
      </section>

      {/* How to Play */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-8">How to Play</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            "Get an Acronym",
            "Write Something Clever",
            "Vote for the Funniest",
            "Climb the Leaderboard",
          ].map((step, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-indigo-800 rounded-xl shadow-lg"
            >
              <h3 className="text-xl font-semibold">{step}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm py-6 bg-indigo-950">
        © {new Date().getFullYear()} Acrophobia Game. All rights reserved.
      </footer>
    </div>
  );
}
