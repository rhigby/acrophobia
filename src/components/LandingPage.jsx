import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

const socket = io("https://acrophobia-backend-2.onrender.com", {
  withCredentials: true,
  transports: ["websocket"],
});

export default function LandingPage() {
  const [stats, setStats] = useState({
    totalPlayers: 0,
    gamesToday: 0,
    roomsLive: 0,
    top10Daily: [],
    top10Weekly: [],
  });
  const [authChecked, setAuthChecked] = useState(false);
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState({ title: "", content: "", replyTo: null });
  const [editingId, setEditingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const messagesPerPage = 5;
  const inputRef = useRef(null);

  useEffect(() => {
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
      });
  }, []);

  useEffect(() => {
    fetch("https://acrophobia-backend-2.onrender.com/api/messages", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then(setMessages)
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetch("https://acrophobia-backend-2.onrender.com/api/me", {
      credentials: "include",
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((user) => {
        setUser(user);
        setAuthChecked(true);
      })
      .catch(() => {
        setUser(null);
        setAuthChecked(true);
      });
  }, []);

  useEffect(() => {
    const handleNewMessage = (msg) => {
      setMessages((prev) => [msg, ...prev]);
    };
    socket.on("new_message", handleNewMessage);
    return () => socket.off("new_message", handleNewMessage);
  }, []);

  const handlePostMessage = () => {
    if (!user) return alert("Login required to post.");
    if (!newMessage.title || !newMessage.content) return;

    const endpoint = editingId ? `/api/messages/${editingId}` : "/api/messages";
    const method = editingId ? "PUT" : "POST";

    fetch(`https://acrophobia-backend-2.onrender.com${endpoint}`, {
      method,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        title: newMessage.title,
        content: newMessage.content,
        replyTo: newMessage.replyTo,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setNewMessage({ title: "", content: "", replyTo: null });
        setEditingId(null);
      })
      .catch(console.error);
  };

  const currentMessages = messages.slice(
    (currentPage - 1) * messagesPerPage,
    currentPage * messagesPerPage
  );
  const totalPages = Math.ceil(messages.length / messagesPerPage);

  return (
    <div>
      {!authChecked ? (
        <div className="text-white text-center py-12 text-xl">Checking session...</div>
      ) : (
        <div className="min-h-screen text-white font-sans bg-gradient-to-br from-black via-blue-900 to-black">
          <header className="sticky top-0 z-50 bg-black border-b border-blue-800 shadow-md py-4 px-6 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-red-600 drop-shadow-[0_0_6px_orange]">Acrophobia</h1>
            {user?.username ? (
              <span className="text-blue-300 text-sm">Logged in as {user.username}</span>
            ) : (
              <span className="text-red-400 text-sm">Not logged in</span>
            )}
          </header>

          {/* Other sections like Hero, Stats, Leaderboard, and Message Board go here */}

          <footer className="bg-black text-center text-sm text-blue-400 py-8 border-t border-blue-800">
            © {new Date().getFullYear()} Acrophobia Game. All rights reserved.
          </footer>
        </div>
      )}
    </div>
  );
}



















