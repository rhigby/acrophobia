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

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState({ title: "", content: "" });

  useEffect(() => {
    const fetchStats = () => {
      fetch("https://acrophobia-backend-2.onrender.com/api/stats")
        .then((res) => res.json())
        .then((data) => {
          setStats({
            totalPlayers: data.totalPlayers || 0,
            gamesToday: data.gamesToday || 0,
            roomsLive: data.roomsLive || 0,
            top10Daily: Array.isArray(data.top10Daily) ? data.top10Daily : [],
            top10Weekly: Array.isArray(data.top10Weekly) ? data.top10Weekly : [],
          });
        })
        .catch(console.error);
    };
    fetchStats();
    const interval = setInterval(fetchStats, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetch("https://acrophobia-backend-2.onrender.com/api/messages", {
      credentials: "include"
    })
      .then((res) => res.json())
      .then(setMessages)
      .catch(console.error);
  }, []);


  useEffect(() => {
  const username = localStorage.getItem("username");
  if (!username) return;

  fetch("https://acrophobia-backend-2.onrender.com/api/login-cookie", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ username })
  }).catch(console.error);
}, []);


  const handlePostMessage = () => {
    if (!newMessage.title || !newMessage.content) return;
    fetch("https://acrophobia-backend-2.onrender.com/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(newMessage),
    })
      .then((res) => res.json())
      .then(() => {
        setNewMessage({ title: "", content: "" });
        
        return fetch("https://acrophobia-backend-2.onrender.com/api/messages", {
          credentials: "include"
        });
      })
      .then((res) => res.json())
      .then(setMessages)
      .catch(console.error);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-blue-900 text-white font-sans">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-black border-b border-blue-800 shadow-md py-4 px-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-red-600 drop-shadow-[0_0_6px_orange]">Acrophobia</h1>
      </header>

      {/* Hero Section */}
      <section className="text-center py-16 px-6">
         <h1 className="text-4xl font-bold text-red-600 drop-shadow-[0_0_3px_orange]">The Fear Of Acronyms</h1>
        <p className="text-lg text-blue-100 max-w-xl mx-auto">
          The acronym battle game where wit wins. Submit hilarious expansions, vote for the best, and climb the leaderboard!
        </p>
        <div className="mt-8 flex justify-center gap-4 text-3xl">
          <a
            href="https://acrophobia-play.onrender.com"
            className="bg-red-600 text-white font-semibold px-8 py-4 rounded-md shadow hover:bg-red-500 transition"
          >
            Play Now
          </a>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-950 py-12 px-4 border-y border-blue-800">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-blue-900 border border-blue-700 rounded-lg p-6">
            <h2 className="text-3xl font-bold text-orange-400 drop-shadow">{stats.totalPlayers}</h2>
            <p className="text-sm text-blue-200">Players Joined</p>
          </div>
          <div className="bg-blue-900 border border-blue-700 rounded-lg p-6">
            <h2 className="text-3xl font-bold text-orange-400 drop-shadow">{stats.gamesToday}</h2>
            <p className="text-sm text-blue-200">Games Today</p>
          </div>
          <div className="bg-blue-900 border border-blue-700 rounded-lg p-6">
            <h2 className="text-3xl font-bold text-orange-400 drop-shadow">{stats.roomsLive}</h2>
            <p className="text-sm text-blue-200">Active Rooms</p>
          </div>
        </div>
      </section>

      {/* Leaderboard Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-center text-orange-300 mb-10">Leaderboard</h2>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-blue-900 border border-blue-700 rounded-lg p-6">
            <h3 className="text-xl text-yellow-300 mb-4">🔥 Top 10 Today</h3>
            <ul className="space-y-2">
              {stats.top10Daily?.map((p, i) => (
                <li key={i} className="bg-blue-800 px-4 py-2 rounded text-white flex justify-between">
                  <span>{i + 1}. {p.username}</span>
                  <span>{p.total_points} pts</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-blue-900 border border-blue-700 rounded-lg p-6">
            <h3 className="text-xl text-yellow-300 mb-4">🏆 Top 10 This Week</h3>
            <ul className="space-y-2">
              {stats.top10Weekly?.map((p, i) => (
                <li key={i} className="bg-blue-800 px-4 py-2 rounded text-white flex justify-between">
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
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          {["Get an Acronym", "➜", "Write Something Clever", "➜", "Vote for the Funniest", "➜", "Climb the Leaderboard"].map((text, i) => (
            <div key={i} className="text-white font-medium text-center">
              <span className={text === "➜" ? "text-6xl text-orange-400 leading-tight" : "text-lg"}>{text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Message Board */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-orange-300 text-center">📬 Message Board</h2>
        <div className="mb-6">
          <input
            className="w-full mb-2 p-2 rounded bg-blue-800 text-white"
            placeholder="Title"
            value={newMessage.title}
            onChange={(e) => setNewMessage({ ...newMessage, title: e.target.value })}
          />
          <textarea
            className="w-full p-2 rounded bg-blue-800 text-white"
            placeholder="What's on your mind?"
            value={newMessage.content}
            onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
          />
          <button
            onClick={handlePostMessage}
            className="mt-2 px-4 py-2 bg-red-600 rounded hover:bg-red-500"
          >
            Post
          </button>
        </div>
        <ul className="space-y-4">
          {messages.map((msg, i) => (
            <li key={i} className="bg-blue-900 p-4 rounded border border-blue-700">
              <h3 className="font-semibold text-orange-300">{msg.title}</h3>
              <p className="text-blue-100">{msg.content}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Footer */}
      <footer className="bg-black text-center text-sm text-blue-400 py-8 border-t border-blue-800">
        © {new Date().getFullYear()} Acrophobia Game. All rights reserved.
      </footer>
    </div>
  );
}







