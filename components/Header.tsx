import Link from "next/link";

const Header = () => {
  return (
    <header>
      <nav className="flex items-center justify-between p-4">
        {/* Left Section: Navigation Links */}
        <ul className="flex space-x-6">
          <li>
            <Link href="/" className="hover:underline text-xl">
              Personal
            </Link>
          </li>
          <li>
            <Link href="/" className="hover:underline text-xl">
              Business
            </Link>
          </li>
          <li>
            <Link href="/" className="hover:underline text-xl">
              About
            </Link>
          </li>
        </ul>

        {/* Center Section: Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link href="/" className="text-2xl font-bold text-lapiz">
            CGM
          </Link>
        </div>

        {/* Right Section: Support */}
        <div>
          <Link
            href="/"
            className="text-gray-500 text-xl absolute top-5 right-12"
          >
            Support
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
