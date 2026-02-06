import { Link } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const ForgotPassword = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Password reset functionality coming soon!');
  };

  return (
    <AppLayout>
      <div className="container-main py-8 md:py-12 lg:py-24">
        <div className="max-w-md mx-auto">
          <Link to="/login" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4 md:mb-6">
            <ArrowLeft size={16} className="mr-2" />
            Back to Login
          </Link>

          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Reset Password</h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          <div className="bg-card rounded-xl border border-border p-4 md:p-6">
            <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
              <div className="space-y-1.5 md:space-y-2">
                <Label htmlFor="email" className="text-sm">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" />
              </div>

              <Button type="submit" size="lg" className="w-full btn-primary">
                Send Reset Link
              </Button>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ForgotPassword;
