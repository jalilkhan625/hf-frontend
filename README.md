# 🧠 OCR Summarizer App

A modern full-stack web app that extracts text from images using **Tesseract.js OCR** and summarizes it using the **Hugging Face BART model** via a secure backend API.

Built with **Next.js**, **Material UI**, and deployed using **Render.com**.

---

## 👤 Author

**Jalil Khan**  
[GitHub Profile → jalilkhan625](https://github.com/jalilkhan625)

---

## 📸 Features

✅ Upload any image with text  
✅ Drag-and-drop file support  
✅ Extract text using Tesseract.js OCR  
✅ Summarize extracted text using Hugging Face's BART model  
✅ Responsive UI with Material UI  
✅ Secure API key management via a backend  
✅ Deployed backend on Render  
✅ Built with modern frontend practices in Next.js 14+

---

## 🧠 Tech Stack

| Area        | Technologies                                 |
|-------------|----------------------------------------------|
| **Frontend**| Next.js (App Router), TypeScript, Material UI|
| **Backend** | Node.js, Express, dotenv, cors, node-fetch   |
| **OCR & AI**| Tesseract.js, Hugging Face BART-large-cnn API|

---

## 📁 Project Structure

```
ocr-summarizer/
├── public/
│   ├── logo.jpg              # App logo
│   └── favicon.ico           # App icon
│
├── src/
│   ├── app/
│   │   └── layout.tsx        # Base layout with Navbar
│   │
│   ├── components/
│   │   ├── UploadForm.tsx    # Main form UI
│   │   ├── Navbar.tsx        # Navigation bar with logo
│   │   └── summarize.tsx     # Calls backend summarizer API
│
├── .env.local                # (Optional) Not used directly due to backend security
├── tailwind.config.js        # Tailwind if used (optional)
├── package.json
└── README.md
```

---

## 🚀 Deployment

This app is hosted on [Render](https://render.com) with the frontend and backend securely separated.

- Backend handles OCR and summarization with API key security
- Frontend built with responsive, accessible UI using Material UI
- Easily scalable and maintainable codebase

---

## 🌟 Support

If you found this project helpful:

**⭐️ Please leave a star** on the repo to show your support!  
**🔁 Fork** it, use it, or contribute to improve it further.

---

Made with ❤️ by [Jalil Khan](https://github.com/jalilkhan625)
