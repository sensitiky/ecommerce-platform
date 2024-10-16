export default function Footer() {
  return (
    <footer className="bg-background shadow-md mt-8">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <p>&copy; 2023 E-commerce Store. All rights reserved.</p>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="/about" className="hover:text-primary">About</a></li>
              <li><a href="/contact" className="hover:text-primary">Contact</a></li>
              <li><a href="/terms" className="hover:text-primary">Terms of Service</a></li>
              <li><a href="/privacy" className="hover:text-primary">Privacy Policy</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}