import { useState } from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(isLogin ? 'Login functionality coming soon!' : 'Signup functionality coming soon!');
  };

  return (
    <AppLayout>
      <div className="container-main py-8 md:py-12 lg:py-24">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              {isLogin
                ? 'Sign in to access your account'
                : 'Join LUXE for exclusive offers and faster checkout'}
            </p>
          </div>

          <div className="bg-card rounded-xl border border-border p-4 md:p-6">
            <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
              {!isLogin && (
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <div className="space-y-1.5 md:space-y-2">
                    <Label htmlFor="firstName" className="text-sm">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-1.5 md:space-y-2">
                    <Label htmlFor="lastName" className="text-sm">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>
              )}

              <div className="space-y-1.5 md:space-y-2">
                <Label htmlFor="email" className="text-sm">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" />
              </div>

              <div className="space-y-1.5 md:space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm">Password</Label>
                  {isLogin && (
                    <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                      Forgot password?
                    </Link>
                  )}
                </div>
                <Input id="password" type="password" placeholder="••••••••" />
              </div>

              {!isLogin && (
                <div className="space-y-1.5 md:space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm">Confirm Password</Label>
                  <Input id="confirmPassword" type="password" placeholder="••••••••" />
                </div>
              )}

              <Button type="submit" size="lg" className="w-full btn-primary">
                {isLogin ? 'Sign In' : 'Create Account'}
              </Button>
            </form>

            <div className="mt-4 md:mt-6 text-center text-sm">
              {isLogin ? (
                <p>
                  Don't have an account?{' '}
                  <button onClick={() => setIsLogin(false)} className="text-primary font-medium hover:underline">
                    Sign up
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{' '}
                  <button onClick={() => setIsLogin(true)} className="text-primary font-medium hover:underline">
                    Sign in
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Login;
