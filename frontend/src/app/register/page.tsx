"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "The password and its confirm are not the same";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      setSuccessMessage(null);

      const response = await axios.post("http://127.0.0.1:3000/users/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });

      // await axios.post("http://127.0.0.1:3000/auth/login", {
      //   email: formData.email,
      //   password: formData.password
      // });

      const loginResponse = await axios.post("http://127.0.0.1:3000/auth/login", {
        email: formData.email,
        password: formData.password
      });

      // Сохраняем токен в куки или localStorage
      console.log(loginResponse);
      if (loginResponse.data?.token) {
        document.cookie = `token=${loginResponse.data.token}; path=/`; // Сохраняем токен
      }

      setSuccessMessage("You have been successfully registered.");
      setIsRegistered(true);

      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setErrors({});
    } catch (error: any) {
      if (error.response?.data) {
        setErrors({ form: error.response.data.message || "Registration failed" });
      } else {
        setErrors({ form: "An unexpected error occurred." });
      }
    } finally {
      setLoading(false);
    }
  };

  if (isRegistered) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <Card className="w-96">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">Registration Successful</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <p className="text-lg text-green-600">{successMessage}</p>
              <Button
                onClick={() => router.push("/")}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Go Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Register</CardTitle>
        </CardHeader>
        <CardContent>
          {successMessage && (
            <p className="text-green-500 text-center mb-4">{successMessage}</p>
          )}
          {errors.form && (
            <p className="text-red-500 text-center mb-4">{errors.form}</p>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Field */}
            <div>
              <Input
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className="w-full"
                required
              />
              {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
            </div>

            {/* Email Field */}
            <div>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full"
                required
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div>
              <Input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full"
                required
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            {/* Confirm Password Field */}
            <div>
              <Input
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full"
                required
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register Now"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
