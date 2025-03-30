import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

interface Props {
  children: React.ReactNode;
}

const AuthLayout = async ({ children }: Props) => {
  const { userId } = await auth();
  console.log(userId, 'here');
  if (userId) {
    redirect('/');
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#121212]">
      {children}
    </div>
  );
};

export default AuthLayout;
