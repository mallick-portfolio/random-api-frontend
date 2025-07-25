"use client";
import { useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setUser } from "@/app/store/reducer/globalSlice";
import { useSelector } from "react-redux";
import config from "./config";

const isAuth = (Component) => {
  return function AuthComponent(props) {
    const router = useRouter();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.global);
    useEffect(() => {
      if (
        Cookies.get("auth_token") == null ||
        Cookies.get("auth_token") == undefined
      ) {
        router.push("/");
      }

      const handleRequest = async () => {
        try {
          const response = await axios.get(
            `${config.BASE_URL}/api/v1/account/me/`,
            {
              headers: {
                Authorization: `Bearer ${Cookies.get("auth_token")}`,
              },
            }
          );
          return response.data;
        } catch (error) {
          return null;
        }
      };

      const fetchData = async () => {
        const data = await handleRequest();

        if (
          (data && !data?.success) ||
          Cookies.get("auth_token") == undefined
        ) {
          router.push("/");
        } else if (data && data?.success) {
          dispatch(setUser(data?.data));
        } else {
          dispatch(setUser({}));
          router.push("/account/login");
        }
      };

      fetchData();
    }, []);

    return <Component {...props} />;
  };
};

export default isAuth;
