"use client";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { redirect, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";
import { useUserLoginMutation } from "@/app/store/api/accountApi";
import Loading from "@/app/components/shared/Loading";

const Login = () => {
  const [handleLogin, { data, isLoading }] = useUserLoginMutation();

  useEffect(() => {
    if (data && data?.success) {
      console.log(data);
      Cookies.set("auth_token", data?.token?.access);
      toast.success(data?.message, {
        autoClose: 2000,
        position: "bottom-right",
      });
      redirect("/dashboard");
    }
  }, [data]);
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),

    password: Yup.string().required("Password is required"),
  });
  const onSubmit = async (values) => {
    await handleLogin(values);
  };

  const formik = useFormik({ initialValues, onSubmit, validationSchema });
  const { errors, values, touched, handleSubmit, handleChange } = formik;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="card w-[500px] bg-base-100 shadow-xl p-8"
      >
        <h1 className="text-2xl my-5 text-primary">Login form</h1>
        <div className="">
          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Email
            </label>
            <input
              name="email"
              onChange={handleChange}
              value={values.email}
              type="email"
              className={`${
                errors.email && touched.email ? "input-error" : "input-accent"
              } input input-bordered w-full `}
            />
            {errors.email && touched.email && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                <span className="font-medium">{errors.email}</span>
              </p>
            )}
          </div>

          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Password
            </label>
            <input
              name="password"
              onChange={handleChange}
              value={values.password}
              type="password"
              className={`${
                errors.password && touched.password
                  ? "input-error"
                  : "input-accent"
              } input input-bordered w-full `}
            />
            {errors.password && touched.password && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                <span className="font-medium">{errors.password}</span>
              </p>
            )}
          </div>
        </div>

        <button type="submit" className="btn  btn-secondary">
          Login
        </button>
        <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
          <span className="text-sm text-gray-600 dark:text-gray-200">
            Don't have an account{" "}
          </span>

          <Link
            href="/account/register"
            className="mx-2 text-sm font-bold text-primary hover:underline"
          >
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
