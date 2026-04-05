"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const SignInPage = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [serverMessage, setServerMessage] = useState("");
  const [fieldError, setFieldError] = useState({});
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
                        <h2 className="font-bold text-zinc-700 text-center">
                            Sign In
                        </h2>
                    </div>
                    <div className="">

                    </div>
                </form>
            </div>

        </div>
    </div>
  );
};

export default SignInPage;
