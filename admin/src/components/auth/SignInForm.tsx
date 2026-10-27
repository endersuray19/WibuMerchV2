"use client";

import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { Link } from "@/i18n/navigation";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import { useRouter } from "next/navigation";
import { api } from "@/lib/axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
interface signProps {
  name: string;
  password: string;
}
export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)

    const formElement = e.currentTarget
    const formData = new FormData(formElement)

    const payload = {
      adminEmail: formData.get("adminEmail"),
      adminPassword: formData.get("adminPassword")
    }
    Swal.fire({
      title: "Submiting...",
      text: "Please wait while your data is being submitted",
      icon: "info",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    let response;
    try {
      response = await api.post("/user/admin", payload)
      const token = response.data?.token || response.data?.admin_token
      localStorage.setItem("admin_token", token)
      document.cookie = `admin_token=${token}; path=/; max-age=86400;`;
      if (response.data.success) {
        await Swal.fire({
          icon: "success",
          title: "Success",
        });
        toast.success("Sign in Sucessfully!")
        router.push("/")
      }
    }
    catch (error: any) {
        Swal.fire({
          title: "Error",
          text: error.response?.data?.message || error.message || "There is something wrong!",
          icon: "error",
        });
      }
      finally {
        setLoading(false)
      }
    }

  return (
      <div className="flex w-full flex-1 flex-col lg:w-1/2">
        <div className="mx-auto w-full max-w-md sm:pt-10">
          <h1 className=" text-title-sm font-semibold text-center text-gray-800 sm:text-title-md dark:text-white/90">
            Admin Wibumerch
          </h1>

        </div>
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col mt-20">
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 text-medium font-semibold text-gray-800 sm:text-title-md dark:text-white/90">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign in!
            </p>
          </div>
          <form onSubmit={handleSignin}>
            <div className="space-y-2">

              <div>
                <Label>
                  Email <span className="text-error-500">*</span>{" "}
                </Label>
                <Input type="text"
                  placeholder="Enter Email here" name="adminEmail" />
              </div>
              <div>
                <Label>
                  Password <span className="text-error-500">*</span>{" "}
                </Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password here" name="adminPassword"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="inset-e-4 absolute top-1/2 z-30 -translate-y-1/2 cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                    ) : (
                      <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                    )}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">

              </div>
              <div>
                <button type="submit"
                  disabled={loading}
                  className="flex mt-5 w-full justify-center rounded bg-primary p-3 bg-blue-600  font-medium text-white hover:bg-opacity-90 disabled:opacity-50 cursor-pointer">
                  Sign in
                </button>
              </div>
            </div>
          </form>


        </div>
      </div>

    );
  }
