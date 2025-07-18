import { useEffect, useState } from "react";

export default function LandingPage() {
  const [stats, setStats] = useState({
    totalPlayers: 0,
    gamesToday: 0,
    roomsLive: 0,
    top10Daily: [],
    top10Weekly: [],
  });

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState({ title: "", content: "", replyTo: null });
  const [currentPage, setCurrentPage] = useState(1);
  const messagesPerPage = 5;

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
        setNewMessage({ title: "", content: "", replyTo: null });
        return fetch("https://acrophobia-backend-2.onrender.com/api/messages", {
          credentials: "include"
        });
      })
      .then((res) => res.json())
      .then(setMessages)
      .catch(console.error);
  };

  const startIdx = (currentPage - 1) * messagesPerPage;
  const currentMessages = messages.slice(startIdx, startIdx + messagesPerPage);
  const totalPages = Math.ceil(messages.length / messagesPerPage);

  const renderReplies = (msg) => {
    if (!msg.replies || !msg.replies.length) return null;
    return (
      <div className="mt-2 space-y-2 ml-4 border-l-2 border-blue-600 pl-4">
        {msg.replies.map((reply, i) => (
          <div key={i} className="text-sm bg-blue-800 p-2 rounded">
            <p className="text-blue-100 mb-1">{reply.content}</p>
            <p className="text-blue-300 text-xs">↳ by {reply.username || "Guest"} · {new Date(reply.timestamp).toLocaleString()}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen text-white font-sans" style={{ backgroundImage: "url('/acrophobia-2_background.gif')", backgroundRepeat: "repeat" }}>
      <header className="sticky top-0 z-50 bg-black border-b border-blue-800 shadow-md py-4 px-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-red-600 drop-shadow-[0_0_6px_orange]">Acrophobia</h1>
      </header>

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

      <section className="px-6 py-12 max-w-4xl mx-auto">
        <h2 className="text-xl text-orange-300 mb-6">Message Board</h2>
        <div className="mb-6">
          <input
            type="text"
            className="w-full mb-2 p-2 rounded text-black"
            placeholder="Title"
            value={newMessage.title}
            onChange={(e) => setNewMessage({ ...newMessage, title: e.target.value })}
          />
          <textarea
            className="w-full mb-2 p-2 rounded text-black"
            placeholder="Your message..."
            value={newMessage.content}
            onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
          ></textarea>
          <button onClick={handlePostMessage} className="bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded">
            Post
          </button>
        </div>
        <div className="space-y-4">
          {currentMessages.map((msg, i) => (
            <div key={i} className="bg-blue-900 border border-blue-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-orange-300">{msg.title}</h3>
              <p className="text-blue-100">{msg.content}</p>
              <p className="text-blue-300 text-sm mt-1">by {msg.username || "Guest"} · {new Date(msg.timestamp).toLocaleString()}</p>
              <button
                onClick={() => setNewMessage({ title: `Re: ${msg.title}`, content: `@${msg.username} `, replyTo: msg })}
                className="text-sm text-orange-300 hover:underline mt-1"
              >
                Reply
              </button>
              {renderReplies(msg)}
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-orange-400 text-black" : "bg-blue-800 text-white"}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </section>

      <footer className="bg-black text-center text-sm text-blue-400 py-8 border-t border-blue-800">
        © {new Date().getFullYear()} Acrophobia Game. All rights reserved.
      </footer>
    </div>
  );
}














