 import { useState } from 'react';
 import { Link } from 'react-router-dom';
 import Header from '@/components/layout/Header';
 import Footer from '@/components/layout/Footer';
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
     <div className="min-h-screen bg-background">
       <Header />
       <main className="container-main py-12 lg:py-24">
         <div className="max-w-md mx-auto">
           <div className="text-center mb-8">
             <h1 className="text-3xl font-bold mb-2">
               {isLogin ? 'Welcome Back' : 'Create Account'}
             </h1>
             <p className="text-muted-foreground">
               {isLogin
                 ? 'Sign in to access your account'
                 : 'Join LUXE for exclusive offers and faster checkout'}
             </p>
           </div>
 
           <div className="bg-card rounded-xl border border-border p-6">
             <form onSubmit={handleSubmit} className="space-y-4">
               {!isLogin && (
                 <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <Label htmlFor="firstName">First Name</Label>
                     <Input id="firstName" placeholder="John" />
                   </div>
                   <div className="space-y-2">
                     <Label htmlFor="lastName">Last Name</Label>
                     <Input id="lastName" placeholder="Doe" />
                   </div>
                 </div>
               )}
 
               <div className="space-y-2">
                 <Label htmlFor="email">Email</Label>
                 <Input id="email" type="email" placeholder="your@email.com" />
               </div>
 
               <div className="space-y-2">
                 <div className="flex items-center justify-between">
                   <Label htmlFor="password">Password</Label>
                   {isLogin && (
                     <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                       Forgot password?
                     </Link>
                   )}
                 </div>
                 <Input id="password" type="password" placeholder="••••••••" />
               </div>
 
               {!isLogin && (
                 <div className="space-y-2">
                   <Label htmlFor="confirmPassword">Confirm Password</Label>
                   <Input id="confirmPassword" type="password" placeholder="••••••••" />
                 </div>
               )}
 
               <Button type="submit" size="lg" className="w-full btn-primary">
                 {isLogin ? 'Sign In' : 'Create Account'}
               </Button>
             </form>
 
             <div className="mt-6 text-center text-sm">
               {isLogin ? (
                 <p>
                   Don't have an account?{' '}
                   <button
                     onClick={() => setIsLogin(false)}
                     className="text-primary font-medium hover:underline"
                   >
                     Sign up
                   </button>
                 </p>
               ) : (
                 <p>
                   Already have an account?{' '}
                   <button
                     onClick={() => setIsLogin(true)}
                     className="text-primary font-medium hover:underline"
                   >
                     Sign in
                   </button>
                 </p>
               )}
             </div>
           </div>
         </div>
       </main>
       <Footer />
     </div>
   );
 };
 
 export default Login;