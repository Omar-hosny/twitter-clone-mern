import SignUpForm from "@/components/SignUpForm";

const SignUpPage = () => {
  return (
    <div className="w-full max-w-5xl mx-auto h-screen grid grid-cols-1 items-center place-items-center lg:grid-cols-2">
      <div className="hidden lg:flex items-center justify-center">
        <img
          src="/svgs/social.svg"
          alt="social_img"
          className="w-full h-full object-cover max-w-[450px]"
        />
      </div>
      <div className="w-full max-w-2xl p-4">
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUpPage;
