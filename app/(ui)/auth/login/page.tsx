import AuthLayout from "../AuthLayout";
import LoginForm from "./LoginForm";

interface SigninPageProps {
  onNavigateToSignup: () => void;
  onNavigateToLanding: () => void;
}

function Page({ onNavigateToSignup, onNavigateToLanding }: SigninPageProps) {
  return (
    <AuthLayout
      title="Sign in to your account"
      onNavigateToLanding={onNavigateToLanding}
    >
      <LoginForm onNavigateToSignup={onNavigateToSignup} />
    </AuthLayout>
  );
}

export default Page;
