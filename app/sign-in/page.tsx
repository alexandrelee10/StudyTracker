"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const SignInPage = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [serverMessage, setServerMessage] = useState("");
  const [fieldError, setFieldError] = useState<{
    email?: string;
    password?: string;
  }>({});
  const router = useRouter();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerMessage("");
    setFieldError({});

    const res = await fetch("/api/auth/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setServerMessage(data.message || "Username or password is incorrect");
      setFieldError(data.fields || {});
      return;
    }

    setServerMessage("Success!");
    router.push("/");
  };

  return (
    // Outer Container
    <div className="min-h-screen bg-zinc-200">
      {/* Inner Container */}
      <div className="p-10 md:py-14">
        {/* Form width */}
        <div className="max-w-md mx-auto">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md p-5 rounded-lg"
          >
            {/* Header */}
            <div>
              <h2 className="font-bold text-zinc-700 text-center pb-5">
                Sign In
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-zinc-500 text-sm block">Email</label>
                <input
                  name="email"
                  type="email"
                  onChange={onChange}
                  value={form.email}
                  className="block outline outline-zinc-200 rounded-md focus:ring-2 focus:outline-none focus:ring-blue-500 w-full"
                />
                {fieldError.email && (
                  <p className="text-sm text-red-500">{fieldError.email}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-zinc-500 text-sm block">Password</label>
                <input
                  name="password"
                  type="password"
                  onChange={onChange}
                  value={form.password}
                  className="block outline outline-zinc-200 rounded-md focus:ring-2 focus:outline-none focus:ring-blue-500 w-full"
                />
                {fieldError.password && (
                  <p className="text-sm text-red-500">{fieldError.password}</p>
                )}
              </div>
            </div>
            <div className="py-4"></div>
            <button 
            type="submit"
            className="block mx-auto w-fit p-2 px-3 bg-blue-600 text-gray-200 rounded-lg"
            >
              Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
