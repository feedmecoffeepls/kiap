"use client";
import SignupForm from "@/components/user/signupForm"

const SignupPage = () => {
    return (
        <div className="flex justify-center items-center min-h-[55svh]">
            <div className="max-w-[480px] w-full">
                <p className="barlow text-3xl font-bold text-center">Kiap</p>
                <SignupForm />
            </div>
        </div>
    )
}
export default SignupPage