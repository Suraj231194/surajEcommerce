"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../hooks/useAuth.js";
import { useToast } from "../../hooks/use-toast.js";
import { Button } from "../../components/ui/button.jsx";
import { Input } from "../../components/ui/input.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card.jsx";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { BRAND_NAME } from "../../lib/brand.js";
export default function Signup() {
    const router = useRouter();
    const { signup } = useAuth();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            toast({
                title: "Error",
                description: "Email and password are required",
                variant: "destructive",
            });
            return;
        }
        setLoading(true);
        try {
            await signup(formData.email, formData.password, formData.firstName, formData.lastName);
            toast({
                title: "Success",
                description: "Account created! Signing you in...",
            });
            router.push("/");
        }
        catch (error) {
            toast({
                title: "Error",
                description: error.message || "Signup failed",
                variant: "destructive",
            });
        }
        finally {
            setLoading(false);
        }
    };
    return (<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-900 to-slate-950 px-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"/>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-600/20 rounded-full blur-3xl"/>

            <Card className="w-full max-w-md relative z-10 border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl" data-testid="card-signup">
                <CardHeader className="text-center bg-gradient-to-r from-accent/20 to-primary/20">
                    <CardTitle className="text-3xl font-black bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent" data-testid="text-signup-title">
                        Join {BRAND_NAME}
                    </CardTitle>
                    <p className="text-sm text-white/70 mt-2 font-medium">
                        Create your account and start shopping today
                    </p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="firstName" className="text-sm font-medium" data-testid="label-firstName">
                                    First Name
                                </label>
                                <Input id="firstName" type="text" placeholder="John" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} data-testid="input-firstName"/>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="lastName" className="text-sm font-medium" data-testid="label-lastName">
                                    Last Name
                                </label>
                                <Input id="lastName" type="text" placeholder="Doe" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} data-testid="input-lastName"/>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium" data-testid="label-email">
                                Email Address
                            </label>
                            <Input id="email" type="email" placeholder="you@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required data-testid="input-email"/>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium" data-testid="label-password">
                                Password
                            </label>
                            <div className="relative">
                                <Input id="password" type={showPassword ? "text" : "password"} placeholder="Enter your password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required data-testid="input-password"/>
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" data-testid="button-toggle-password">
                                    {showPassword ? (<EyeOff className="h-4 w-4"/>) : (<Eye className="h-4 w-4"/>)}
                                </button>
                            </div>
                        </div>

                        <Button type="submit" className="w-full bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 shadow-lg font-bold text-white" disabled={loading} data-testid="button-signup">
                            {loading ? "Creating Account..." : "Create Account"}
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm">
                        <span className="text-muted-foreground">Already have an account? </span>
                        <Link href="/login">
                            <span className="text-primary hover:underline cursor-pointer font-medium" data-testid="link-login">
                                Sign In
                            </span>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>);
}
