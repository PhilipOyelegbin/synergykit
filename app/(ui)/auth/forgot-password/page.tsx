import AuthLayout from "../AuthLayout";
import ForgotPasswordForm from "./ForgotPasswordForm";

// interface ForgotPasswordPageProps {
//   onNavigateToSignin: () => void;
//   onNavigateToLanding: () => void;
//   onRequestReset: (email: string) => void;
// }

function Page() {
  return (
    <AuthLayout title="Forgot Your Password?">
      <p className="text-center text-sm text-[#6b7280] mb-6">
        No worries! Enter your email address below and we will send you a
        (simulated) link to reset your password.
      </p>
      <ForgotPasswordForm />
    </AuthLayout>
  );
}

export default Page;
