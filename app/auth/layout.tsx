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

  return <>{children}</>;
};

export default AuthLayout;
