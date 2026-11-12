import Header from "@/components/Header";
import Footer from "@/components/landing/Footer";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <div className="min-h-screen page-urbanist overflow-x-hidden">
      <Header />
      <main className="max-w-3xl mx-auto px-6 pt-40 pb-24 text-center">
        <h1 className="text-4xl font-bold text-[#191E49]">Page not found</h1>
        <p className="mt-4 text-gray-600">The page you’re looking for doesn’t exist or has moved.</p>
        <a href="/" className="inline-block mt-8 rounded-full bg-blue-600 text-white px-6 py-3 font-semibold">Back to home</a>
      </main>
      <Footer />
    </div>
  );
}
