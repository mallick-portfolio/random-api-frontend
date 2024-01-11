import { setShowInviteBoardModal } from "@/app/store/reducer/modalSlice";
import useComponentVisible from "@/app/utils/useComponentVisible";
import { useDispatch, useSelector } from "react-redux";
import { HiMiniXMark } from "react-icons/hi2";
import Loading from "../shared/Loading";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useGetUsersQuery } from "@/app/store/api/accountApi";
import { useInviteBoardMemberMutation } from "@/app/store/api/taskApi";
import { useParams } from "next/navigation";

const InviteIntoBoard = () => {
  const dispatch = useDispatch();
  const { showInviteBoardModal } = useSelector((state) => state.modal);
  const { currentBoard } = useSelector((state) => state.apiStateData);
  const { id } = useParams();

  const { ref } = useComponentVisible(
    showInviteBoardModal,
    setShowInviteBoardModal
  );

  // api call

  const { data, isLoading } = useGetUsersQuery();
  // api call
  const [handleInvite, { data: iData, isLoading: iIsLoading }] =
    useInviteBoardMemberMutation();

  // invite board member handler
  const handleInviteMember = (user_id) => {
    const data = {
      user_id,
      unique_id: id,
    };
    handleInvite({ action: "invite-board", data });
  };

  useEffect(() => {
    if (iData && iData?.success) {
      toast.success(iData?.message);
    }
  }, [iData]);

  if (isLoading || iIsLoading) {
    return <Loading />;
  }

  const invited_members = currentBoard?.invited_members?.map(
    (mem) => mem?.user
  );
  const authorize_users = currentBoard?.board?.authorize_users?.map(
    (mem) => mem?.id
  );

  let userLog = "";
  if (data && data?.data?.length) {
    userLog = data?.data?.map((user) => {
      if (
        !invited_members?.includes(user?.id) &&
        !authorize_users?.includes(user?.id)
      ) {
        return (
          <div
            key={user?.id}
            className="card flex-row justify-between gap-4 px-4 py-2 items-center bg-base-100 shadow-xl"
          >
            <div className="avatar">
              <div className="w-16 rounded-full">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <div className="">
              <h2 className="text-lg">
                {user?.first_name} {user?.last_name}
              </h2>
              <p>{user?.email}</p>
            </div>
            <div className="badge bg-second w-12 h-12 rounded-full">
              <button
                onClick={() => handleInviteMember(user?.id)}
                className="flex items-center justify-center text-white"
              >
                <span className="">
                  <svg
                    className="w-5 h-5 transform rotate-45 -mt-px"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke-width="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    ></path>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        );
      }
    });
  }
  return (
    <div>
      {showInviteBoardModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div ref={ref} className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Invite Member</h3>
                  <button
                    className="p-1 rounded-full border border-red-500 ml-auto   text-red-500 float-right font-semibold outline-none focus:outline-none"
                    onClick={() => dispatch(setShowInviteBoardModal(false))}
                  >
                    <span className=" text-red-500  text-2xl block outline-none focus:outline-none">
                      <HiMiniXMark />
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="max-h-[350px] overflow-y-auto p-6 flex flex-col gap-y-2">
                  {userLog}
                </div>
                {/*footer*/}
                <div className="flex gap-2 items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="btn btn-sm bg-second"
                    type="button"
                    onClick={() => dispatch(setShowInviteBoardModal(false))}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
};

export default InviteIntoBoard;
