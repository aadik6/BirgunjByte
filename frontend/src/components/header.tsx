import { ThemeToggle } from "./theme-toggle";
import HeaderMenu from "./headerMenu";
import SearchNews from "./searchNews";
import Breaking from "./breaking";
import NepaliDate from "nepali-date";
import { useEffect, useState } from "react";

const Header = () => {
  const np = new NepaliDate(new Date()).format("mmmm D, YYYY");
  const [time, setTime] = useState(
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="flex flex-col bg-background/95 w-full  backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2">
        <div className="flex items-center container mx-auto justify-between px-4 py-2">
          <div className="headerDate text-xs md:text-[16px]">
            <p>{np}</p>
            <p>{time}</p>
          </div>
          <div className="headerLogo">logo</div>
          <div className="headerWeather">weather</div>
        </div>
        {/* <Separator/> */}
      </div>
      {/* menu item */}
      <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2">
        <div className="flex justify-between items-center container mx-auto gap-4 py-4 px-4">
          <HeaderMenu />
          <div className="flex items-center gap-4">
            <SearchNews />
            <ThemeToggle />
          </div>
        </div>
      </div>
      {/* breaking news */}
      <div className="container mx-auto px-4">
        <Breaking />
      </div>
    </>
  );
};

export default Header;
