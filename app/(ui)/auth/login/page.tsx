import AuthLayout from "../AuthLayout";
import LoginForm from "./LoginForm";

// interface SigninPageProps {
//   onNavigateToSignup: () => void;
//   onNavigateToLanding: () => void;
// }

function Page() {
  return (
    <AuthLayout title="Sign in to your account">
      <LoginForm />
    </AuthLayout>
  );
}

export default Page;
