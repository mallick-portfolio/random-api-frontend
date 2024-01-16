import { setShowAssignmentTaskMemberModal } from "@/app/store/reducer/modalSlice";
import useComponentVisible from "@/app/utils/useComponentVisible";
import { useDispatch, useSelector } from "react-redux";
import { HiMiniXMark } from "react-icons/hi2";
import Loading from "../shared/Loading";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAssignTaskMemberMutation } from "@/app/store/api/taskApi";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

const AssignTaskMember = () => {
  const dispatch = useDispatch();
  const { showAssignmentTaskMemberModal, taskDetails } = useSelector(
    (state) => state.modal
  );
  const { currentBoard } = useSelector((state) => state.apiStateData);

  const { ref } = useComponentVisible(
    showAssignmentTaskMemberModal,
    setShowAssignmentTaskMemberModal
  );

  // api call

  // api call
  const [handleInvite, { data: iData, isLoading: iIsLoading }] =
    useAssignTaskMemberMutation();

  // invite board member handler
  const handleInviteMember = (user_id) => {
    const data = {
      user: user_id,
    };
    handleInvite({ data, id: taskDetails?.id });
  };

  useEffect(() => {
    if (iData && iData?.success) {
      toast.success(iData?.message);
    }
  }, [iData]);

  if (iIsLoading) {
    return <Loading />;
  }

  const currentTaskMember = taskDetails?.authorize_users?.map(
    (user) => user?.id
  );

  let userLog = "";
  if (currentBoard && currentBoard?.board?.authorize_users?.length) {
    userLog = currentBoard?.board?.authorize_users?.map((user) => {
      if (!currentTaskMember?.includes(user?.id)) {
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
                <IoCheckmarkDoneOutline />
              </button>
            </div>
          </div>
        );
      }
    });
  }
  return (
    <div>
      {showAssignmentTaskMemberModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div ref={ref} className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Assign member</h3>
                  <button
                    className="p-1 rounded-full border border-red-500 ml-auto   text-red-500 float-right font-semibold outline-none focus:outline-none"
                    onClick={() =>
                      dispatch(setShowAssignmentTaskMemberModal(false))
                    }
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
                    onClick={() =>
                      dispatch(setShowAssignmentTaskMemberModal(false))
                    }
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

export default AssignTaskMember;
