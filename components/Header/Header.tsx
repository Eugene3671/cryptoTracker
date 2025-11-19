import Link from "next/link";

export function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          CryptoTracker
        </Link>
        <ul className="flex gap-6 text-gray-700 font-medium">
          <li>
            <Link href="/" className="hover:text-blue-600 transition">
              Home
            </Link>
          </li>
          <li>
            <Link href="/coins" className="hover:text-blue-600 transition">
              Popular Coins
            </Link>
          </li>
          <li>
            <Link href="/favorites" className="hover:text-blue-600 transition">
              Favorites
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
