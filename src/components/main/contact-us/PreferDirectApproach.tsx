import { FiClock } from "react-icons/fi";
import { MdEmail, MdPhone } from "react-icons/md";

const PreferDirectApproach = () => {
  return (
    <div className=" flex-1 space-y-12">
      <div>
        <h4 className="font-bold text-pBlue text-2xl md:text-3xl lg:text-4xl">
          Prefer a Direct Approach
        </h4>
        <p className="text-pGray text-justify mt-6">
          At Momin Textile Mills Ltd, we value every connection and believe
          strong communication builds lasting partnerships. Whether you&apos;re
          a business client, vendor, or potential collaborator, our team is
          ready to assist you with any inquiry, quotation.
        </p>
      </div>
      <div className="space-y-4">
        <div className="flex gap-3 items-center">
          <MdPhone className="shrink-0" size={24} />
          <span className="font-medium text-pBlue">
            +8801798 3216 547, +8801798 3216 547, +8801798 3216 547
          </span>
        </div>
        <div className="flex gap-3 items-center">
          <MdEmail className="shrink-0" size={24} />
          <span className="font-medium text-pBlue">tracexpert@gmail.com</span>
        </div>
        <div className="flex gap-3 items-center">
          <FiClock className="shrink-0" size={24} />
          <span className="font-medium text-pBlue">
            Saturday to Thursday 09.00AM - 10.00PM (GMT)
          </span>
        </div>
      </div>
      <div className="mt-5 max-h-64 rounded-md overflow-hidden ">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.790834501461!2d90.39674897589956!3d23.861560084498702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c5004a074869%3A0x6e3a87459114e59!2sMomin%20Textile%20Mills%20Ltd.%20(Head%20Office)!5e0!3m2!1sen!2sbd!4v1777371955377!5m2!1sen!2sbd"
          width="100%"
          height="280"
          style={{ border: "0" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
};

export default PreferDirectApproach;
