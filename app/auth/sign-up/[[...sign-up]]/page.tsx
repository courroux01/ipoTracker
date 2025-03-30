import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="rounded-xl border-2 border-white">
      <SignUp />
    </div>
  );
}
