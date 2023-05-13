import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineClose } from "react-icons/md";
import styles from "../styles/Navbar.module.css";
import { useRouter } from "next/router";
import Image from "next/image";

const Navbar = () => {
  let Anchors = [
    { name: "Home", address: "/" },
    { name: "Events", address: "/events" },
    { name: "About", address: "/about" },
    { name: "Docs", address: "https://dads-organization.gitbook.io/untitled/" },
    { name: "Developer", address: "/developer" },
  ];

  const router = useRouter();

  let [open, setOpen] = useState(false);

  return (
    <div className="w-screen bg-[#FFFFFF] fixed top-0 left-0 z-30 p-4">
      <div className="md:flex items-center justify-between text-[#666666] text-sm font-medium">
        <Image
          src="/meta.png"
          alt="metasquare"
          width={124}
          height={40}
          className="object-contain"
        />
        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          {open ? <MdOutlineClose /> : <HiMenuAlt3 />}
        </div>

        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static  md:z-auto z-[100] right-4  w-[70%] md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in-out ${
            open ? "top-20 bg-[#FFFFFF] rounded-2xl shadow-lg" : "top-[-490px]"
          }`}
        >
          {Anchors.map((anchor) => (
            <li
              key={anchor.name}
              className="md:ml-6 text-xl md:my-0 my-7 mb-[10px]"
            >
              <Link
                href={anchor.address}
                className={`${
                  router.pathname == anchor.address
                    ? "text-[#080E26] border-b-2 border-[#080E26]"
                    : ""
                }  hover:text-[#080E26] duration-500 ease-in-out ${
                  styles.trans
                }`}
              >
                {anchor.name}
              </Link>
            </li>
          ))}
          <div className="md:ml-6 md:my-0 my-7 mb-[10px]">
            <ConnectButton />
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
