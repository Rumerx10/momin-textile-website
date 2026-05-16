import Image from "next/image";

const ProfileInfo = () => {
  return (
    <div className="relative flex items-center py-1 px-2 rounded-sm hover:bg-gray-100 gap-3">
      <div className="w-10 h-10 overflow-hidden rounded-full flex items-center justify-center">
        <Image
          src="/logo.png"
          height={40}
          width={40}
          alt="profile image"
          className="object-contain"
        />
      </div>
      <div className="hidden sm:block">
        <p className="text-sm font-semibold text-pBlue">Shakil Ahmed</p>
        <p className="text-xs text-pGray">m.sayefd@hotmail.com</p>
      </div>
    </div>
  );
};

export default ProfileInfo;
