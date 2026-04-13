# HonorInk – Certificate Generator

HonorInk is a modern web application for generating beautiful, custom course completion certificates. Built with React, Vite, and TailwindCSS, it offers a fast, responsive, and accessible user experience.

> **Note:** This project is for educational purposes only.

---

## 🚀 Features

- 🎓 Generate professional certificates for Udemy, LinkedIn, and Coursera
- 📝 Customizable certificate fields (name, course, date, instructor, etc.)
- 📥 Download certificates as high-quality PDFs or PNG images
- 👀 Preview certificates before downloading
- ✅ Form validation with user-friendly error messages
- ⚡ Blazing-fast UI with Vite and React
- 🌈 Responsive, modern design with TailwindCSS
- 🧩 Modular component structure
- 🔍 Accessible and keyboard-friendly navigation
- 🛠️ Easy to extend for other certificate styles
- 🎨 Consistent styling across all certificate templates

---

## 🛠️ Tech Stack

- [React](https://react.dev/) - UI framework
- [Vite](https://vitejs.dev/) - Build tool and dev server
- [TailwindCSS](https://tailwindcss.com/) - CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Component library (Radix UI + Tailwind)
- [html2pdf.js](https://github.com/eKoopmans/html2pdf.js) - PDF generation
- [html2canvas](https://html2canvas.hertzen.com/) - Image export
- [React Router](https://reactrouter.com/) - Client-side routing
- [Lucide React](https://lucide.dev/) - Icon library

---

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/honorink.git
   cd honorink
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open the app**
   Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📂 Project Structure

```
src/
├── components/           # React components
│   ├── CertificateForm.jsx    # Reusable form component
│   ├── CourseraCertificate.jsx # Coursera certificate template
│   ├── Home.jsx               # Landing page
│   ├── LinkedInCertificate.jsx # LinkedIn certificate template
│   ├── Navbar.jsx             # Navigation component
│   ├── NotFound.jsx           # 404 page
│   └── UdemyCertificate.jsx   # Udemy certificate template
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and helpers
├── App.jsx               # Main app component
├── App.css               # Global styles
├── index.css             # CSS imports
└── main.jsx             # Entry point

public/                   # Static assets
├── favicon.ico
├── linkedin_background.png
├── linkedin_learning.png
├── linkedin_stamp.png
└── udemy_logo.png
```

---

## 💡 Usage

1. Select a certificate platform from the home page
2. Fill in the certificate details in the form
3. Preview the generated certificate
4. Edit details if needed or download as PDF/PNG

---

## ♿ Accessibility

- Semantic HTML and ARIA labels
- Keyboard navigation support
- High-contrast, readable color scheme
- Screen reader friendly

---

## 📱 PWA Support

- Installable on desktop and mobile
- Offline support (coming soon)

---

## 🧪 Testing

Run tests with:
```bash
npm run test
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'feat: add YourFeature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## 🛡️ Security & Privacy

- All data is processed client-side. No data is stored or transmitted to any servers.

---

## 🏎️ Performance

- Optimized PDF and image generation
- Minimal bundle size with code splitting
- Efficient rendering with React

---

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## 🐞 Troubleshooting

- **PDF generation fails:**
  - Ensure all form fields are filled correctly
  - Check browser console for errors
- **Certificate preview not showing:**
  - Clear browser cache
  - Refresh the page

---

## 📄 License

This project is licensed under the MIT License.

---

## ⚠️ Disclaimer

This project is intended for educational purposes only. Users are responsible for ensuring their use of this tool complies with relevant policies and regulations.
