import { setShowTaskDetailModal } from "@/app/store/reducer/modalSlice";
import useComponentVisible from "@/app/utils/useComponentVisible";
import { useDispatch, useSelector } from "react-redux";
import { HiMiniXMark } from "react-icons/hi2";

const TaskDetails = () => {
  const dispatch = useDispatch();
  const { showTaskDetailModal, taskDetails } = useSelector(
    (state) => state.modal
  );

  const { ref } = useComponentVisible(
    showTaskDetailModal,
    setShowTaskDetailModal
  );

  return (
    <div>
      {showTaskDetailModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div ref={ref} className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none min-w-96">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {taskDetails?.title}
                  </h3>
                  <button
                    className="p-1 rounded-full border border-red-500 ml-8 text-red-500 float-right font-semibold outline-none focus:outline-none"
                    onClick={() => dispatch(setShowTaskDetailModal(false))}
                  >
                    <span className=" text-red-500  text-2xl block outline-none focus:outline-none">
                      <HiMiniXMark />
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  {taskDetails?.description}
                </div>
                {/*footer*/}
                <div className="flex gap-2 items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="btn btn-sm btn-secondary"
                    type="button"
                    onClick={() => dispatch(setShowTaskDetailModal(false))}
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

export default TaskDetails;
