import React from "react";
import Avater from "../shared/Avater";
import { useGetIndividualNotificationQuery } from "@/app/store/api/notificationApi";
import Loading from "../shared/Loading";

const Notification = () => {
  const { data, isLoading } = useGetIndividualNotificationQuery();

  console.log(data?.data);

  if (isLoading) {
    return <Loading />;
  }

  let notificationLog = "";
  if (data && data?.data?.length) {
    notificationLog = data?.data?.map((notification) => (
      <li className="my-2 w-full">
        {console.log(notification)}
        <div
          // key={user?.id}
          className="card flex-row justify-start gap-2 py-2 items-center bg-base-300 shadow-xl"
        >
          <div className="avatar">
            <Avater
              name={`${notification?.sender?.first_name} ${notification?.sender?.last_name}`}
            />
          </div>
          <p>
            {notification?.message?.length > 35
              ? notification?.message?.slice(0, 35)
              : notification?.message}
          </p>
        </div>
      </li>
    ));
  }
  return (
    <ul
      tabIndex={0}
      className="menu max-h-[400px] overflow-y-auto flex flex-row menu-sm dropdown-content mt-3 z-[1] shadow bg-base-100 rounded-box w-80"
    >
      {notificationLog}
    </ul>
  );
};

export default Notification;
