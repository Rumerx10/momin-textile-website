// components/company-profile/CompanyProfileViewMode.jsx
"use client";
import { MdPictureAsPdf, MdDownload, MdBusinessCenter, MdOutlineDescription } from "react-icons/md";
import { HiOutlineDocumentText } from "react-icons/hi";

interface CompanyProfileViewModeProps {
  profileData: {
    heading: string;
    description: string;
    caption: string;
    pdf: string;
  };
}

const CompanyProfileViewMode = ({ profileData }: CompanyProfileViewModeProps) => {
  return (
    <div className="space-y-8">
      {/* Hero Section - Heading with accent */}
      <div className="relative overflow-hidden bg-linear-to-r from-pBlue/5 to-transparent rounded-2xl p-6">
        <div className="absolute top-0 right-0 w-32 h-32 bg-pBlue/10 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-3 mb-2">
            <MdBusinessCenter className="text-pBlue text-2xl" />
            <span className="text-xs font-semibold text-pBlue uppercase tracking-wider">Company Identity</span>
          </div>
          <h5 className="text-center text-2xl italic font-bold text-pBlue">
            {profileData.heading || "Momin Textile Mills Limited"}
          </h5>
          {profileData.caption && (
            <p className="text-pGray text-center mt-2 italic">
              {profileData.caption}
            </p>
          )}
        </div>
      </div>

      {/* Description Card */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
        <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-3">
          <div className="flex items-center gap-2">
            <MdOutlineDescription className="text-pBlue text-xl" />
            <h6 className="text-lg font-semibold text-pBlue">About Us</h6>
          </div>
        </div>
        <div className="p-6">
          <div 
            className="text-pGray leading-relaxed prose prose-sm max-w-none
              prose-headings:text-pBlue prose-headings:font-semibold
              prose-p:text-pGray prose-p:leading-relaxed
              prose-strong:text-pBlue
              prose-a:text-pBlue prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: profileData.description || "No description provided." }}
          />
        </div>
      </div>

      {/* PDF Document Card */}
      {profileData.pdf && (
        <div className="bg-linear-to-r from-pBlue/5 to-transparent rounded-xl p-6 border border-pBlue/20">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                <MdPictureAsPdf className="text-red-500 text-2xl" />
              </div>
              <div>
                <h6 className="text-xl font-semibold text-pBlue">Company Brochure</h6>
                <p className="text-xs text-pGray mt-0.5">Download our official company brochure</p>
              </div>
            </div>
            <a
              href={profileData.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-pBlue text-white rounded-lg hover:bg-pBlue/90 transition-all duration-300 shadow-sm hover:shadow-md group"
            >
              <span>Download PDF</span>
              <MdDownload size={18} className="group-hover:translate-y-0.5 transition-transform" />
            </a>
          </div>
          <p className="text-xs text-pGray mt-3 ml-16">
            File: {profileData.pdf.split("/").pop()}
          </p>
        </div>
      )}

      {/* Stats / Quick Info (Optional) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
        <div className="text-center p-4 bg-gray-50 rounded-xl">
          <p className="text-2xl font-bold text-pBlue">✓</p>
          <p className="text-xs text-pGray uppercase mt-1">ISO Certified</p>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-xl">
          <p className="text-2xl font-bold text-pBlue">24/7</p>
          <p className="text-xs text-pGray uppercase mt-1">Support Available</p>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-xl">
          <p className="text-2xl font-bold text-pBlue">🌍</p>
          <p className="text-xs text-pGray uppercase mt-1">Global Reach</p>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfileViewMode;