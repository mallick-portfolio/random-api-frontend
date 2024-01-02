"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setUser } from "@/app/store/reducer/globalSlice";

const isAuth = (Component) => {
  return function AuthComponent(props) {
    const dispatch = useDispatch();
    useEffect(() => {
      if (
        Cookies.get("auth_token") == null ||
        Cookies.get("auth_token") == undefined
      ) {
        redirect("/");
      }

      const handleRequest = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/account/me/`,
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

        if (!data?.success || Cookies.get("auth_token") == undefined) {
          redirect("/");
        } else {
          dispatch(setUser(data?.data));
        }
      };

      fetchData();
    }, []);

    return <Component {...props} />;
  };
};

export default isAuth;
