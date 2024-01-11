import React, { useEffect, useState } from "react";
import Avater from "../shared/Avater";
import { useGetIndividualNotificationQuery } from "@/app/store/api/notificationApi";
import Loading from "../shared/Loading";
import useWebSocket, { ReadyState } from "react-use-websocket";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import DeleteNotification from "../modal/DeleteNotification";
import { useDispatch } from "react-redux";
import {
  setSelectedNotificationId,
  setShowDeleteNotificationModal,
} from "@/app/store/reducer/modalSlice";
import { setCurrentNotifications } from "@/app/store/reducer/dataSlice";

const Notification = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.global);
  const [notifications, setNotifications] = useState([]);
  const { data, isLoading } = useGetIndividualNotificationQuery();

  const [socketUrl, setSocketUrl] = useState(
    `${process.env.NEXT_PUBLIC_WS_URL}/notification/${
      user?.id
    }/?token=${Cookies.get("auth_token")}`
  );

  const { lastMessage, readyState } = useWebSocket(socketUrl);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  console.log("notification connection", connectionStatus);

  useEffect(() => {
    if (data && data?.success) {
      setNotifications(data?.data);
      dispatch(setCurrentNotifications(data?.data));
    }
  }, [data]);

  useEffect(() => {
    if (lastMessage !== null) {
      const newNotification = JSON.parse(lastMessage.data);
      console.log(newNotification);
      console.log(newNotification?.message);
      if (newNotification?.message?.receiver === user?.id) {
        const totalNotification = [newNotification?.message, ...notifications];
        setNotifications(totalNotification);
      }
    }
  }, [lastMessage]);

  if (isLoading) {
    return <Loading />;
  }

  let notificationLog = "";
  if (data && notifications?.length) {
    notificationLog = notifications?.map((notification) => (
      <li
        key={notification?.id}
        className="my-2 flex justify-between items-center w-full"
      >
        <div
          // key={user?.id}
          className="card flex-row justify-start gap-2 py-2 items-center bg-base-300 shadow-xl"
        >
          <div className="avatar">
            <Avater
              name={`${notification?.sender?.first_name} ${notification?.sender?.last_name}`}
            />
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: notification?.message }}
          ></div>
          <button
            onClick={() => {
              dispatch(setShowDeleteNotificationModal(true));
              dispatch(setSelectedNotificationId(notification?.id));
            }}
            className="p-1 rounded-full border border-red-500 ml-auto text-red-500 float-right font-semibold outline-none focus:outline-none"
          >
            <span className=" text-red-500  text-sm outline-none focus:outline-none">
              <MdDelete />
            </span>
          </button>
        </div>
      </li>
    ));
  }
  return (
    <>
      {notifications?.length ? (
        <ul
          tabIndex={0}
          className="menu max-h-[300px] overflow-y-auto flex flex-row menu-sm dropdown-content mt-3 z-[1] shadow bg-base-100 rounded-box w-80"
        >
          {notificationLog}
        </ul>
      ) : (
        ""
      )}
      <DeleteNotification />
    </>
  );
};

export default Notification;
