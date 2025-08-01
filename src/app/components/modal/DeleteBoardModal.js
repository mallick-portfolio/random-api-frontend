import { setShowDeleteBoardModal } from "@/app/store/reducer/modalSlice";
import useComponentVisible from "@/app/utils/useComponentVisible";
import { useDispatch, useSelector } from "react-redux";
import { HiMiniXMark } from "react-icons/hi2";
import { useDeleteBoardMutation } from "@/app/store/api/taskApi";
import Loading from "../shared/Loading";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { redirect, useParams } from "next/navigation";

const DeleteBoardModal = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { showDeleteBoardModal } = useSelector((state) => state.modal);

  const { ref } = useComponentVisible(
    showDeleteBoardModal,
    setShowDeleteBoardModal
  );

  // api call
  const [handleDelete, { data, isLoading }] = useDeleteBoardMutation();

  useEffect(() => {
    if (data && data.success) {
      toast.success(data.message);
      dispatch(setShowDeleteBoardModal(false));
      redirect("/dashboard/board/");
    } else if (data && data.error) {
      toast.error(data.message);
    }
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      {showDeleteBoardModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div ref={ref} className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl text-center font-semibold">Delete</h3>
                  <button
                    className="p-1 rounded-full border border-red-500 ml-auto   text-red-500 float-right font-semibold outline-none focus:outline-none"
                    onClick={() => dispatch(setShowDeleteBoardModal(false))}
                  >
                    <span className=" text-red-500  text-2xl block outline-none focus:outline-none">
                      <HiMiniXMark />
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="mb-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900 ">
                      Are you want to sure delete this board
                    </label>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex gap-2 items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="btn btn-sm btn-primary"
                    type="button"
                    onClick={() => dispatch(setShowDeleteBoardModal(false))}
                  >
                    Close
                  </button>
                  <button
                    onClick={() => handleDelete(id)}
                    className="btn btn-sm btn-secondary"
                  >
                    Delete
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

export default DeleteBoardModal;
