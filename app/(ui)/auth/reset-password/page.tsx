import AuthLayout from "../AuthLayout";
import ResetPasswordForm from "./ResetPasswordForm";

interface ResetPasswordPageProps {
  onNavigateToSignin: () => void;
  onNavigateToLanding: () => void;
  token: string | null; // Conceptual token from URL/email link
}

function Page({ onNavigateToSignin, token }: ResetPasswordPageProps) {
  return (
    <AuthLayout title="Reset Your Password">
      {!token && (
        <p className="text-center text-sm text-red-600 bg-red-100 p-3 rounded-md mb-6">
          Invalid or missing password reset token. Please request a new password
          reset link.
        </p>
      )}
      {token && (
        <p className="text-center text-sm text-[#6b7280] mb-6">
          Please enter and confirm your new password below.
        </p>
      )}
      <ResetPasswordForm
        onNavigateToSignin={onNavigateToSignin}
        disabled={!token}
      />
    </AuthLayout>
  );
}

export default Page;
