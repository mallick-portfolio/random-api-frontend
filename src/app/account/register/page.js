"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
import { useUserRegisterMutation } from "@/app/store/api/accountApi";
import Loading from "@/app/components/shared/Loading";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

const Register = () => {
  const router = useRouter();
  const [handleRegister, { data, isLoading }] = useUserRegisterMutation();
  const [email, setEmail] = useState("");
  const { user } = useSelector((state) => state.global);
  useEffect(() => {
    if (data && data?.success) {
      toast.success(data?.message, {
        autoClose: 2000,
        position: "bottom-right",
      });
      router.push(`/account/email-verify?email=${email}`);
      setEmail("");
    } else if (data && data?.error && !data?.success) {
      toast.error(data?.message);
    }
  }, [data]);

  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    password2: "",
    phone: "",
    gender: "male",
  };
  const validationSchema = Yup.object().shape({
    first_name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Firstname is required"),
    last_name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Lastname is required"),
    email: Yup.string().email().required("Email is required"),
    username: Yup.string().required("Username is required"),
    phone: Yup.string().required("Phone number is required"),
    gender: Yup.string().required("Gender is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password is too short - should be 6 chars minimum"),
    password2: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        "Confirm password not match with password"
      )
      .min(6, "Confirm password is too short - should be 6 chars minimum"),
  });
  const onSubmit = async (values) => {
    setEmail(values.email);
    await handleRegister(values);
  };

  const formik = useFormik({ initialValues, onSubmit, validationSchema });
  const { errors, values, touched, handleSubmit, handleChange } = formik;

  if (isLoading) {
    return <Loading />;
  }
  if (user?.id && Cookies.get("auth_token")) {
    redirect("/dashboard");
  }
  return (
    <div className="flex justify-center items-center h-auto sm:h-screen">
      <form
        onSubmit={handleSubmit}
        className="card w-[500px] bg-base-100 shadow-xl p-8"
      >
        <h1 className="text-2xl my-5 text-primary">Registration form</h1>
        <div className="grid grid-cols-2 gap-x-4 col-md-6">
          <div className="mb-2 max-w-[280px]">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              First name
            </label>
            <input
              name="first_name"
              onChange={handleChange}
              value={values.first_name}
              type="text"
              className={`${
                errors.first_name && touched.first_name
                  ? "input-error"
                  : "input-accent"
              } input input-bordered w-full max-w-xs`}
            />
            {errors.first_name && touched.first_name && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                <span className="font-medium">{errors.first_name}</span>
              </p>
            )}
          </div>
          <div className="mb-2 max-w-[280px]">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Last name
            </label>
            <input
              name="last_name"
              onChange={handleChange}
              value={values.last_name}
              type="text"
              className={`${
                errors.last_name && touched.last_name
                  ? "input-error"
                  : "input-accent"
              } input input-bordered w-full max-w-xs`}
            />
            {errors.last_name && touched.last_name && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                <span className="font-medium">{errors.last_name}</span>
              </p>
            )}
          </div>
          <div className="mb-2 max-w-[280px]">
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
              } input input-bordered w-full max-w-xs`}
            />
            {errors.email && touched.email && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                <span className="font-medium">{errors.email}</span>
              </p>
            )}
          </div>
          <div className="mb-2 max-w-[280px]">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              User Name
            </label>
            <input
              name="username"
              onChange={handleChange}
              value={values.username}
              type="text"
              className={`${
                errors.username && touched.username
                  ? "input-error"
                  : "input-accent"
              } input input-bordered w-full max-w-xs`}
            />
            {errors.username && touched.username && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                <span className="font-medium">{errors.username}</span>
              </p>
            )}
          </div>
          <div className="mb-2 max-w-[280px]">
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
              } input input-bordered w-full max-w-xs`}
            />
            {errors.password && touched.password && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                <span className="font-medium">{errors.password}</span>
              </p>
            )}
          </div>
          <div className="mb-2 max-w-[280px]">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Confirm Password
            </label>
            <input
              name="password2"
              onChange={handleChange}
              value={values.password2}
              type="password"
              className={`${
                errors.password2 && touched.password2
                  ? "input-error"
                  : "input-accent"
              } input input-bordered w-full max-w-xs`}
            />
            {errors.password2 && touched.password2 && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                <span className="font-medium">{errors.password2}</span>
              </p>
            )}
          </div>
          <div className="mb-2 max-w-[280px]">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Phone
            </label>
            <input
              name="phone"
              onChange={handleChange}
              value={values.phone}
              type="text"
              className={`${
                errors.phone && touched.phone ? "input-error" : "input-accent"
              } input input-bordered w-full max-w-xs`}
            />
            {errors.phone && touched.phone && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                <span className="font-medium">{errors.phone}</span>
              </p>
            )}
          </div>
          <div className="mb-2 max-w-[280px]">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Select an option
            </label>
            <select
              name="gender"
              onChange={handleChange}
              value={values.gender}
              className={`${
                errors.first_name && touched.first_name
                  ? "input-error"
                  : "input-accent"
              } input input-bordered w-full max-w-xs`}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            {errors.gender && touched.gender && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                <span className="font-medium">{errors.gender}</span>
              </p>
            )}
          </div>
        </div>

        <button type="submit" className="btn btn-secondary">
          Register
        </button>
        <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
          <span className="text-sm text-gray-600 dark:text-gray-200">
            Already have an account{" "}
          </span>

          <Link
            href="/account/login"
            className="mx-2 text-sm font-bold text-primary hover:underline"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
