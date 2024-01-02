"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";

const isAuth = (Component) => {
  return function AuthComponent(props) {
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
        }
      };

      fetchData();
    }, []);

    return <Component {...props} />;
  };
};

export default isAuth;
