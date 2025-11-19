export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center text-sm">
        <p>© {new Date().getFullYear()} CryptoTracker. All rights reserved.</p>
        <p className="mt-2 sm:mt-0">
          Built with ❤️ using <span className="text-blue-400">Next.js</span>
        </p>
      </div>
    </footer>
  );
}
