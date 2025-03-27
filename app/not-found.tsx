import Redirect from '@/components/ErrorScreen';
export default function NotFound() {
  return (
    <Redirect
      title="404"
      subtitle="Page Not Found"
      description="The page you're looking for doesn't exist or has been moved."
      redirectPath="/"
      redirectDelay={3000}
      primaryButtonText="Go Home Now"
      cancelButtonText="Stay Here"
    />
  );
}
