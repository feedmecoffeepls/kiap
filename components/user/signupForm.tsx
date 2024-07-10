"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { useSignIn } from '@clerk/nextjs';
import Link from 'next/link';

const signupSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }).nonempty({ message: "Email is required" }),
    password: z.string().min(1, { message: "Password is required" })
});

type SignupFormInputs = z.infer<typeof signupSchema>;

const SignupForm = () => {
    const router = useRouter();
    const { isLoaded, signIn, setActive } = useSignIn();
    const form = useForm<SignupFormInputs>({
        resolver: zodResolver(signupSchema)
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const onSubmit = async (data: SignupFormInputs) => {
        setLoading(true);
        try {
            if (!isLoaded) {
                return;
            }

            const signInAttempt = await signIn.create({
                identifier: data.email,
                password: data.password,
            });

            if (signInAttempt.status === 'complete') {
                await setActive({ session: signInAttempt.createdSessionId });
                router.push('/');
            } else {
                setError("Timeout error. Please try again.");
            }
        } catch (err) {
            setError(JSON.parse(JSON.stringify(err, null, 2)).errors[0].message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form {...form}>
            <div className="text-center py-8">
                <h1 className="text-3xl font-bold text-center mt-8 mb-4">Get ready to Kiap</h1>
                <p>Already have an account? <Link href="/auth/login" className="underline">Sign in here</Link></p>
            </div>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field, formState: { errors } }) => (
                        <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="Enter your email" {...field} />
                            </FormControl>
                            {errors.email && <FormMessage>{errors.email.message}</FormMessage>}
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field, formState: { errors } }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Enter your password" {...field} />
                            </FormControl>
                            {errors.password && <FormMessage>{errors.password.message}</FormMessage>}
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Signing up...' : 'Sign up'}
                </Button>
            </form>
        </Form>
    );
};

export default SignupForm;