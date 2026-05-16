import Image from "next/image";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="relative flex-1">
        <Image
          src="/login.png"
          alt="image"
          height={1024}
          width={940}
          className="h-screen object-cover"
        />
        <div className="absolute hidden lg:flex  bottom-40 left-0 right-0 h-28 ">
          <div className="px-37">
            <div className="flex justify-center gap-4">
              <Image src="/logo.png" height={48} width={40} alt="logo" />
              <p className="text-white font-times font-bold text-4xl italic whitespace-nowrap">
                Momin Textile Mills Ltd
              </p>
            </div>
            <p className="text-bdrGray text-center mt-4.5">
              At Momin Textile Mills Ltd, we operate with a robust lineup of
              modern, high-performance textile machinery designed to ensure
              precision, efficiency.
            </p>
          </div>
        </div>
        <div className="lg:hidden absolute inset-0 p-4">
          <LoginForm />
        </div>
      </div>
      <div className="hidden flex-1 lg:flex items-center justify-center">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
