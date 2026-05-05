# 🚀 CodeX — Real-Time Collaborative Editor

A real-time collaborative text editor built with **React, WebSockets, and Yjs (CRDT)**.
Multiple users can edit and chat simultaneously in shared rooms.

---

## ✨ Features

* Real-time collaborative editing (Yjs)
* Live chat system
* Room-based collaboration
* Participant join/leave updates
* Export document as PDF
* Clean Notion-style UI

---

## 🛠️ Tech Stack

* **Frontend:** React (Vite), TipTap, Yjs
* **Backend:** Node.js (WebSocket)

---

## ⚙️ Run Locally

```bash
# frontend
npm install
npm run dev

# yjs server
cd yjs-server
node yjs-server.cjs

# chat server
cd ../LiveServer
node LiveServer.js
```

---

## 🧪 Usage

* Enter your name
* Create or join a room
* Share room ID
* Open multiple tabs to test collaboration

---

## 📌 Notes

* Runs on localhost
* No authentication
* No data persistence

---
