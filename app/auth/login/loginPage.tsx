"use client";
import LoginForm from "@/components/user/loginForm"

const LoginPage = () => {
    return (
        <div className="flex justify-center items-center min-h-[55svh]">
            <div className="max-w-[480px] w-full">
                <p className="barlow text-3xl font-bold text-center">Kiap</p>
                <LoginForm />
            </div>
        </div>
    )
}
export default LoginPage