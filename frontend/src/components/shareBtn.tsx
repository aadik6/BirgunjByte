import { useState } from "react";
import { Share2, Copy, Facebook, Twitter, Instagram } from "lucide-react";

const ShareButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="relative">
      {/* Share Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center hover:text-blue-600 transition"
      >
        <Share2 size={20} />
        <span className="ml-2">Share</span>
      </button>

      {/* Popup with Sharing Options */}
      {isOpen && (
        <div className="absolute top-10 right-0 bg-white border border-gray-200 rounded shadow-lg p-4 w-48 z-50">
          <ul className="space-y-2">
            <li>
              <button
                onClick={handleCopyLink}
                className="flex items-center w-full text-left hover:text-blue-600 transition"
              >
                <Copy size={16} className="mr-2" />
                Copy Link
              </button>
            </li>
            <li>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  window.location.href
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:text-blue-600 transition"
              >
                <Facebook size={16} className="mr-2" />
                Facebook
              </a>
            </li>
            <li>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  window.location.href
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:text-blue-600 transition"
              >
                <Twitter size={16} className="mr-2" />
                Twitter
              </a>
            </li>
            <li>
              <a
                href={`https://www.instagram.com/`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:text-blue-600 transition"
              >
                <Instagram size={16} className="mr-2" />
                Instagram
              </a>
            </li>
            {/* <li>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  window.location.href
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:text-blue-600 transition"
              >
                <Whatsapp size={16} className="mr-2" />
                WhatsApp
              </a>
            </li> */}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ShareButton;