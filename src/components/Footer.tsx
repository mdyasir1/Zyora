import { Github, Linkedin, Briefcase } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-500">
              &copy; {year} YasirNest. All Rights Reserved.
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Designed & Developed with ❤️ by{" "}
              <a
                href="https://github.com/mdyasir1"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-600 hover:underline"
              >
                Yasir
              </a>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://yasirarafath.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Portfolio"
            >
              <Briefcase className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/mdyasirarafath"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/mdyasir1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
