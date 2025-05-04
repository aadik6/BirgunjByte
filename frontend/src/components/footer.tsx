const Footer = () => {
  return (
    <footer className="border-t backdrop-blur py-10 supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto text-center text-gray-400">
        &copy; {new Date().getFullYear()} Birgunj Byte. All rights reserved |
        Developed and Maintained by{" "}
        <span>
          <a href="https://aadarshkushwaha.com.np/">NOOBS</a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
