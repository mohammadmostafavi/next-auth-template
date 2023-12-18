'use client';
import React from "react";
import { $axios } from "@/services/core";
import { signIn, signOut, useSession } from 'next-auth/react';







const LoginForm = () => {
  const usernameRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await signIn("credentials", {
        username: usernameRef.current?.value,
        password: passwordRef.current?.value,
        callbackUrl: `/`,
      });
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow-xl md:mt-0 sm:max-w-md xl:p-0">
        <form action="/login" onSubmit={login}>
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl"> Welcome back</h1>

            <div className="flex items-center">
              <div className="bg-gray-500 h-[.125rem] w-full"></div>
              <p className="mx-8 text-medium text-gray-500">or</p>
              <div className="bg-gray-500 h-[.125rem] w-full"></div>
            </div>

            <div>
              <input
		ref={usernameRef}
                className="input border w-full p-2 rounded-full"
                type="text"
                placeholder="Username"
                v-model="username"
              />
            </div>
            <div>
              <input
		ref={passwordRef}
                className="input border w-full p-2 rounded-full"
                type="password"
                placeholder="Password"
                v-model="password"
              />
            </div>
            <div className="flex justify-center">
              <button
                className="bg-gray-900 text-white py-4 px-16 rounded-full shadow-xl active:shadow-md hover:shadow-lg"
                type="submit"
              >Login</button>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}
export default LoginForm;
