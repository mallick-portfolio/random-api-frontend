import { setShowInviteBoardModal } from "@/app/store/reducer/modalSlice";
import useComponentVisible from "@/app/utils/useComponentVisible";
import { useDispatch, useSelector } from "react-redux";
import { HiMiniXMark } from "react-icons/hi2";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAddTaskMutation } from "@/app/store/api/taskApi";
import Loading from "../shared/Loading";
import { useEffect } from "react";
import { toast } from "react-toastify";

const InviteIntoBoard = () => {
  const dispatch = useDispatch();
  const { showInviteBoardModal, selectedTaskItem } = useSelector(
    (state) => state.modal
  );

  const { ref } = useComponentVisible(
    showInviteBoardModal,
    setShowInviteBoardModal
  );

  // api call
  const [handleAddColumn, { data, isLoading }] = useAddTaskMutation();

  useEffect(() => {
    if (data && data.success) {
      toast.success(data.message);
      dispatch(setShowInviteBoardModal(false));
    } else if (data && data.error) {
      toast.error(data.message);
    }
  }, [data]);

  const initialValues = {
    title: "",
    description: "",
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
  });
  const onSubmit = async (data, { resetForm }) => {
    data.task_item = selectedTaskItem;
    await handleAddColumn(data);
    resetForm();
  };

  const formik = useFormik({ initialValues, onSubmit, validationSchema });
  const { errors, values, touched, handleSubmit, handleChange } = formik;

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      {showInviteBoardModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <form
              onSubmit={handleSubmit}
              ref={ref}
              className="relative w-auto my-6 mx-auto max-w-3xl"
            >
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
                  <div className="card flex-row gap-4 px-4 py-2 justify-center items-center bg-base-100 shadow-xl">
                    <div className="avatar">
                      <div className="w-16 rounded-full">
                        <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                      </div>
                    </div>
                    <div className="">
                      <h2 className="text-lg">Shoes!</h2>
                      <p>tamal@gmail.com</p>
                    </div>
                    <div className="badge bg-second w-12 h-12 rounded-full">
                      <button className="flex items-center justify-center text-white">
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
                  <div className="card flex-row gap-4 px-4 py-2 justify-center items-center bg-base-100 shadow-xl">
                    <div className="avatar">
                      <div className="w-16 rounded-full">
                        <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                      </div>
                    </div>
                    <div className="">
                      <h2 className="text-lg">Shoes!</h2>
                      <p>tamal@gmail.com</p>
                    </div>
                    <div className="badge bg-second w-12 h-12 rounded-full">
                      <button className="flex items-center justify-center text-white">
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
                  <div className="card flex-row gap-4 px-4 py-2 justify-center items-center bg-base-100 shadow-xl">
                    <div className="avatar">
                      <div className="w-16 rounded-full">
                        <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                      </div>
                    </div>
                    <div className="">
                      <h2 className="text-lg">Shoes!</h2>
                      <p>tamal@gmail.com</p>
                    </div>
                    <div className="badge bg-second w-12 h-12 rounded-full">
                      <button className="flex items-center justify-center text-white">
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
                  <div className="card flex-row gap-4 px-4 py-2 justify-center items-center bg-base-100 shadow-xl">
                    <div className="avatar">
                      <div className="w-16 rounded-full">
                        <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                      </div>
                    </div>
                    <div className="">
                      <h2 className="text-lg">Shoes!</h2>
                      <p>tamal@gmail.com</p>
                    </div>
                    <div className="badge bg-second w-12 h-12 rounded-full">
                      <button className="flex items-center justify-center text-white">
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
                  <div className="card flex-row gap-4 px-4 py-2 justify-center items-center bg-base-100 shadow-xl">
                    <div className="avatar">
                      <div className="w-16 rounded-full">
                        <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                      </div>
                    </div>
                    <div className="">
                      <h2 className="text-lg">Shoes!</h2>
                      <p>tamal@gmail.com</p>
                    </div>
                    <div className="badge bg-second w-12 h-12 rounded-full">
                      <button className="flex items-center justify-center text-white">
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
                  <div className="card flex-row gap-4 px-4 py-2 justify-center items-center bg-base-100 shadow-xl">
                    <div className="avatar">
                      <div className="w-16 rounded-full">
                        <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                      </div>
                    </div>
                    <div className="">
                      <h2 className="text-lg">Shoes!</h2>
                      <p>tamal@gmail.com</p>
                    </div>
                    <div className="badge bg-second w-12 h-12 rounded-full">
                      <button className="flex items-center justify-center text-white">
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
                  <div className="card flex-row gap-4 px-4 py-2 justify-center items-center bg-base-100 shadow-xl">
                    <div className="avatar">
                      <div className="w-16 rounded-full">
                        <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                      </div>
                    </div>
                    <div className="">
                      <h2 className="text-lg">Shoes!</h2>
                      <p>tamal@gmail.com</p>
                    </div>
                    <div className="badge bg-second w-12 h-12 rounded-full">
                      <button className="flex items-center justify-center text-white">
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
            </form>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
};

export default InviteIntoBoard;
