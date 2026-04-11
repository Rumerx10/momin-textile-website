import { FooterLinks } from "@/docs/data";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

import { RiYoutubeLine } from "react-icons/ri";
import { PiPhone } from "react-icons/pi";
import { TbLetterR } from "react-icons/tb";

const Footer = () => {
  return (
    <div className="bg-white">
      <div className="container px-4 mx-auto py-10">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-40!">
          {/* Left Section - Company Info */}
          <div className="flex-1">
            <Image
              src="/logoLg.png"
              alt="logo"
              height={50}
              width={220}
              className="mb-4"
            />
            <div className="text-sm text-primaryGray flex flex-col gap-3">
              <p>
                MOMIN GROUP have been established in the year 1986, our products
                are being exported to buyers worldwide since 1995, while doing
                so, we give special emphasis to high standard.
              </p>
              <div className="flex items-center gap-2">
                <PiPhone className="text-primaryBlue" size={20} />
                <span>+88-01619 777333</span>
              </div>
              <div className="flex items-center gap-2">
                <HiOutlineMail className="text-primaryBlue" size={20} />
                <span>masud@momingroupbd.com</span>
              </div>
              <div className="flex space-x-6 mt-6">
                <Link
                  href="#"
                  className="text-primaryBlue hover:text-blue-600 transition-colors"
                >
                  <FaFacebookF size={24} />
                </Link>
                <Link
                  href="#"
                  className="text-primaryBlue hover:text-blue-600 transition-colors"
                >
                  <FaInstagram size={24} />
                </Link>
                <Link
                  href="#"
                  className="text-primaryBlue hover:text-blue-600 transition-colors"
                >
                  <FaLinkedinIn size={24} />
                </Link>
                <Link
                  href="#"
                  className="text-primaryBlue hover:text-blue-600 transition-colors"
                >
                  <RiYoutubeLine size={24} />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Section - Links Horizontal */}
          <div className="flex-3">
            <div className="flex flex-wrap justify-between gap-8">
              {FooterLinks.map((item, index) => (
                <div key={index} className="flex flex-col gap-3 min-w-38">
                  <h3 className="text-lg font-semibold text-textBlack">
                    {item.title}
                  </h3>
                  <ul className="flex flex-col gap-2">
                    {item.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link
                          href={link.link}
                          className="text-sm text-primaryGray hover:text-blue-600 hover:underline transition-all duration-300"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-y-2 border-[#8E8E8E] py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="flex flex-col">
              <h3 className="flex items-center justify-center lg:justify-start font-semibold text-textBlack">
                Momin Textile Mills LTD
              </h3>
              <p className="text-sm text-primaryGray text-center lg:text-left">
                @ Copyright 2022 All Rights Reserved{" "}
                <span className="text-textBlack font-semibold">
                  Momin Textile Mills LTD
                </span>
              </p>
            </div>
            <div className="text-xs text-gray-500">
              <div className="mt-10 lg:mt-0 flex flex-col lg:flex-row items-center justify-center gap-3 text-textBlack font-medium">
                <p className="pr-6">Designed and Developed By </p>
                <div className="flex items-center justify-center">
                  <Image
                    src="/creative-matter-logo.png"
                    alt="logo"
                    height={46}
                    width={90}
                    className="object-cover"
                  />
                  <Image
                    src="/ati-logo.png"
                    alt="logo"
                    height={46}
                    width={145}
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
