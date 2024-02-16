"use client";
import Avater from "@/app/components/shared/Avater";
import { useUpdatePasswordMutation } from "@/app/store/api/accountApi";
import { useFormik } from "formik";
import Link from "next/link";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";

const Settings = () => {
  const { user } = useSelector((state) => state.global);
  // state

  // api call
  const [handleUpdate, { data, isLoading, error }] =
    useUpdatePasswordMutation();

  // api response
  useEffect(() => {
    if (data && data?.success) {
      toast.success(data?.message);
      resetForm();
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
  const onSubmit = async (values) => {
    await handleUpdate(values);
  };
  // formik defination
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: true,
  });
  const { errors, values, handleChange, touched, handleSubmit, resetForm } =
    formik;
  return (
    <div className="container mt-8 grid grid-cols-2 gap-4">
      <div className="mb-6 ">
        <div className="flex flex-col items-center mt-6 -mx-2">
          <Avater
            css={"w-24 h-24"}
            name={`${user?.first_name} ${user?.last_name}`}
          />
          {/* <img
            className="object-cover w-24 h-24 mx-2 rounded-full"
            src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
            alt="avatar"
          /> */}
          <h4 className="mx-2 mt-2 font-medium text-gray-800 dark:text-gray-200">
            {user?.first_name} {user?.last_name}
          </h4>
          <p className="mx-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">
            {user?.email}
          </p>
          <p className="mx-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">
            Gender: {user?.gender}
          </p>
        </div>
      </div>
      <div className="mb-6 ">
        <h3 className="mb-4 text-xl font-bold">Update Password</h3>
        <form onSubmit={handleSubmit} className="">
          <div className="">
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Old Password
              </label>
              <input
                name="old_password"
                onChange={handleChange}
                value={values.old_password}
                type="password"
                className={`${
                  errors.old_password && touched.old_password
                    ? "input-error"
                    : "input-accent"
                } input input-bordered w-full `}
              />
              {errors.old_password && touched.old_password && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">{errors.old_password}</span>
                </p>
              )}
            </div>
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                New Password
              </label>
              <input
                name="new_password"
                onChange={handleChange}
                value={values.new_password}
                type="password"
                className={`${
                  errors.new_password && touched.new_password
                    ? "input-error"
                    : "input-accent"
                } input input-bordered w-full `}
              />
              {errors.new_password && touched.new_password && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">{errors.new_password}</span>
                </p>
              )}
            </div>
            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Confirm Password
              </label>
              <input
                name="confirm_password"
                onChange={handleChange}
                value={values.confirm_password}
                type="password"
                className={`${
                  errors.confirm_password && touched.confirm_password
                    ? "input-error"
                    : "input-accent"
                } input input-bordered w-full `}
              />
              {errors.confirm_password && touched.confirm_password && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">{errors.confirm_password}</span>
                </p>
              )}
            </div>
          </div>

          <button type="submit" className="btn  bg-second">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
