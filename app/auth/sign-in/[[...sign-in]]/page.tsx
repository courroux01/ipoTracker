import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="rounded-xl border-2 border-white">
      <SignIn />
    </div>
  );
}
