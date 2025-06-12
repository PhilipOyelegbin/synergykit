import AuthLayout from "../AuthLayout";
import SignupForm from "./SignupForm";

// interface SignupPageProps {
//   onNavigateToSignin: () => void;
//   onNavigateToLanding: () => void;
// }

function SignupPage() {
  return (
    <AuthLayout title="Create your SynergyKit account">
      <SignupForm />
    </AuthLayout>
  );
}

export default SignupPage;
