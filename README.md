# 🧠 OCR Summarizer App

A modern full-stack web app that extracts text from images using **Tesseract.js OCR** and summarizes it using the **Hugging Face BART model** via a secure backend API.  
Built with **Next.js**, **Material UI**, and deployed using **Render.com**.

---

## 👤 Author

**Jalil Khan**

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

| Frontend        | Backend         | OCR & AI              |
|----------------|-----------------|------------------------|
| Next.js (App Router) | Node.js + Express | Tesseract.js OCR        |
| Material UI     | dotenv + cors   | Hugging Face Transformers API |
| TypeScript      | node-fetch      | BART-large-cnn model   |

---

## 📁 Project Structure

```bash
ocr-summarizer/
├── public/
│   ├── logo.jpg             # App logo
│   └── favicon.ico          # App icon
├── src/
│   ├── app/
│   │   └── layout.tsx       # Base layout with Navbar
│   ├── components/
│   │   ├── UploadForm.tsx   # Main form UI
│   │   ├── Navbar.tsx       # Navigation bar with logo
│   │   └── summarize.tsx    # Calls backend summarizer API
├── package.json
└── README.md
