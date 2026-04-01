"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

const SignUpPage = () => {

    const router = useRouter();

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: ""
    });
    const [fieldErrors, setFieldErrors] = useState({});
    const [serverMessage, setServerMessage] = useState("");

    const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
        
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setFieldErrors({});
        setServerMessage("");


        const res = await fetch('/api/auth/sign-up', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        });

        const data = await res.json();

        if (!res.ok) {
            setServerMessage(data.message || "Something went wrong");
            setFieldErrors(data.fields || {});
            return;
        }

       setServerMessage("Success!")
       router.push("/dashboard")

    }

    return (
    <div className="min-h-screen bg-zinc-200 p-4">
      <div className="py-10 md:py-14">
        <form className="bg-white rounded-xl shadow-md p-5" onSubmit={handleSubmit}>
          <div>
            <h2 className="text-center font-bold text-2xl py-6">Sign Up</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700">
                First Name
              </label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={onChange}
                className="w-full border border-zinc-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700">
                Last Name
              </label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={onChange}
                className="w-full border border-zinc-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700">Email</label>
              <input
                name="email"
                value={form.email}
                onChange={onChange}
                className="w-full border border-zinc-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700">
                Phone Number
              </label>
              <input
                name="phone"
                value={form.phone}
                onChange={onChange}
                className="w-full border border-zinc-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="space-y-2 pt-3">
            <label className="text-sm font-medium text-zinc-700">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={onChange}
              className="w-full border border-zinc-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="py-4 mx-auto w-fit">
            <button className="bg-blue-500 text-white rounded-xl p-2">
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
