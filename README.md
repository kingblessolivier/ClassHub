<div align="center">

# 📚 ClassHub

### A modern, real-time assignment & class-management portal for universities

[![Made with Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](#)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-8B5CF6?style=for-the-badge)](LICENSE)

[![Stars](https://img.shields.io/github/stars/kingblessolivier/ClassHub?style=flat-square&color=EC4899)](https://github.com/kingblessolivier/ClassHub/stargazers)
[![Issues](https://img.shields.io/github/issues/kingblessolivier/ClassHub?style=flat-square&color=8B5CF6)](https://github.com/kingblessolivier/ClassHub/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-22C55E?style=flat-square)](CONTRIBUTING.md)

<p><i>Submit work, post assignments, track deadlines, and chat with an AI study assistant — all in one place.</i></p>

</div>

---

## ✨ Features

| | Feature | Description |
|---|---|---|
| 📊 | **Dashboard** | At-a-glance stats — open assignments, items due this week, announcements, and submissions, plus a mini calendar. |
| 📝 | **Assignments** | Post, browse, and filter assignments (All / Active / Submitted) with urgency badges and live submission counts. |
| 📤 | **Submit Work** | Students submit via shareable Drive links; lecturers & class reps review every submission in one view. |
| 📢 | **Announcements** | A typed announcement feed (info / urgent / event) with author and timestamp metadata. |
| 🗓️ | **Calendar** | Full month view with deadlines marked, an upcoming strip, and one-click **iCalendar (.ics) export**. |
| 🤖 | **AI Assistant** | A context-aware chat helper that knows your current assignments and deadlines. |
| 🔐 | **Role-based access** | Distinct permissions for **Students**, **Lecturers**, and **Class Representatives**, enforced by Firestore rules. |

---

## 🧱 Tech Stack

- **Frontend:** HTML5, vanilla JavaScript, custom CSS (CSS variables, grid/flexbox, responsive)
- **Backend:** Firebase — Authentication, Cloud Firestore (real-time), Cloud Functions (AI endpoint)
- **No build step** — runs as a static single-page app

## 🗂️ Data Model

```
classes/{classId}/
├── members/{uid}        → { role, displayName, email, createdAt }
├── assignments/{id}     → { title, subject, desc, due, marks, postedBy, postedAt }
├── announcements/{id}   → { title, body, type, postedBy, postedAt }
└── submissions/{id}     → { assignmentId, studentUid, studentName, driveLink, submittedAt }
```

---

## 🚀 Getting Started

### Prerequisites
- A [Firebase](https://console.firebase.google.com/) project with **Authentication** (Email/Password) and **Cloud Firestore** enabled
- [Node.js](https://nodejs.org/) 18+ and the Firebase CLI (`npm i -g firebase-tools`)

### 1. Clone & install
```bash
git clone https://github.com/kingblessolivier/ClassHub.git
cd ClassHub
npm install
```

### 2. Add your Firebase config
Open `classhub.html` and replace the `firebaseConfig` object with your project's keys
(Firebase Console → Project settings → Your apps → Web app).

### 3. Deploy the security rules
```bash
firebase deploy --only firestore:rules
```

### 4. Run locally
Serve the folder with any static server:
```bash
npx serve .
# then open http://localhost:3000/classhub.html
```

### 5. (Optional) Deploy
```bash
firebase deploy --only hosting
```

---

## 👥 Roles at a glance

| Role | Can submit work | Can post assignments | Can view all submissions |
|------|:--:|:--:|:--:|
| **Student** | ✅ | ❌ | ❌ |
| **Class Rep** | ✅ | ✅ | ✅ |
| **Lecturer** | ❌ | ✅ | ✅ |

---

## 🗺️ Roadmap

- [ ] Toast notifications to replace `alert()` dialogs
- [ ] Native file uploads (Firebase Storage) alongside Drive links
- [ ] Email/push reminders before deadlines
- [ ] Grade & feedback flow for submitted work
- [ ] Dark mode
- [ ] Offline support (PWA)
- [ ] Unit tests for core logic

See the [open issues](https://github.com/kingblessolivier/ClassHub/issues) for the full list.

---

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) and open an issue or PR.

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.

---

<div align="center">
<sub>Built by <a href="https://github.com/kingblessolivier">Olivier NSENGIMANA</a> · <a href="https://nsolivier.netlify.app">Portfolio</a></sub>
</div>
