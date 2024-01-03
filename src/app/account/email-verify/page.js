"use client";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { redirect, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useVerifyEmailOTPMutation } from "@/app/store/api/accountApi";
import Loading from "@/app/components/shared/Loading";
import { useSelector } from "react-redux";

const EmailVerify = () => {
  const [handleVerifyEmailOTP, { data, isLoading }] =
    useVerifyEmailOTPMutation();
  const { user } = useSelector((state) => state.global);

  useEffect(() => {
    if (data && data?.success) {
      toast.success(data?.message, {
        autoClose: 2000,
        position: "bottom-right",
      });
      redirect("/account/login/");
    }
    if (data && !data?.success) {
      toast.error(data?.message);
    }
  }, [data]);

  const initialValues = {
    otp: "",
  };
  const validationSchema = Yup.object().shape({
    otp: Yup.string().required("Otp is required"),
  });
  const onSubmit = async (values) => {
    values.email = "tamal.mallick8@gmail.com";
    await handleVerifyEmailOTP(values);
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
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="card w-[500px] bg-base-100 shadow-xl p-8"
      >
        <h1 className="text-2xl my-5 text-primary">Verify Email OTP</h1>
        <div className="">
          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              OTP code
            </label>
            <input
              name="otp"
              onChange={handleChange}
              value={values.otp}
              type="text"
              className={`${
                errors.otp && touched.otp ? "input-error" : "input-accent"
              } input input-bordered w-full `}
            />
            {errors.otp && touched.otp && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                <span className="font-medium">{errors.otp}</span>
              </p>
            )}
          </div>
        </div>

        <button type="submit" className="btn  btn-secondary">
          Verify
        </button>
      </form>
    </div>
  );
};

export default EmailVerify;
