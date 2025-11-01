import { Link } from 'react-router-dom';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import { ROUTES } from '@/shared/constants/routes';

import SignupForm from '../components/SignupForm';

const SignupPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
          <CardDescription>
            Create your account to start tracking your money
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm />
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link
              to={ROUTES.AUTH.LOGIN}
              className="font-medium text-primary underline underline-offset-4"
            >
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupPage;
