// app/page.tsx
import UploadForm from "@/components/UploadForm";

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-white dark:bg-black text-black dark:text-white">

      <UploadForm />
    </main>
  );
}
