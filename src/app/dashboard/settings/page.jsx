"use client";
import { useUpdatePasswordMutation } from "@/app/store/api/accountApi";
import { useFormik } from "formik";
import Link from "next/link";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

const Settings = () => {
  // state

  // api call
  const [handleUpdate, { data, isLoading, error }] =
    useUpdatePasswordMutation();

  // api response
  useEffect(() => {
    if (data && data?.success) {
      toast.success(data?.message);
    } else if (error && "data" in error) {
      toast.error(error.data.message);
    }
  }, [data, error]);

  // initial register value
  const initialValues = {
    old_password: "",
    confirm_password: "",
    new_password: "",
  };

  // validation schema
  const validationSchema = Yup.object().shape({
    new_password: Yup.string()
      .required("New password is required")
      .min(8, "Must be 8 characters or more")
      .matches(/[a-z]+/, "One lowercase character")
      .matches(/[A-Z]+/, "One uppercase character"),
    old_password: Yup.string().required("Old password is required"),
    confirm_password: Yup.string()
      .required("Confirm password is required")
      .oneOf(
        [Yup.ref("new_password")],
        "Confirm password not match with password"
      )
      .min(6, "Confirm password is too short - should be 6 chars minimum"),
  });

  // onsubmit function
  const onSubmit = async (values, { resetForm }) => {
    await handleUpdate(values);
    resetForm();
  };
  // formik defination
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: true,
  });
  const { errors, values, handleChange, touched, handleSubmit } = formik;
  return (
    <div className="bg-white shadow-lg shadow-gray-200 rounded-2xl p-4 mb-6">
      <h3 className="mb-4 text-xl font-bold">Update Password</h3>
      <form onSubmit={handleSubmit} className=" p-8">
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

        <button type="submit" className="btn  bg-second">
          Login
        </button>
      </form>
    </div>
  );
};

export default Settings;
