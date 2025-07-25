import { setShowAddBoardModal } from "@/app/store/reducer/modalSlice";
import useComponentVisible from "@/app/utils/useComponentVisible";
import { useDispatch, useSelector } from "react-redux";
import { HiMiniXMark } from "react-icons/hi2";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useAddBoardMutation,
  useAddTaskMutation,
} from "@/app/store/api/taskApi";
import Loading from "../shared/Loading";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const AddBoard = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { showAddBoardModal } = useSelector((state) => state.modal);

  const { ref } = useComponentVisible(showAddBoardModal, setShowAddBoardModal);

  // api call
  const [handlAddBoard, { data, isLoading }] = useAddBoardMutation();

  useEffect(() => {
    if (data && data.success) {
      toast.success(data.message);
      dispatch(setShowAddBoardModal(false));
      router.push(`/dashboard/board/${data?.data?.unique_id}`);
    } else if (data && data.error) {
      toast.error(data.message);
    }
  }, [data]);

  const initialValues = {
    title: "",
    status: false,
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Board title is required"),
    status: Yup.boolean().default(false),
  });
  const onSubmit = async (data, { resetForm }) => {
    await handlAddBoard(data);
    resetForm();
  };

  const formik = useFormik({ initialValues, onSubmit, validationSchema });
  const { errors, values, touched, handleSubmit, handleChange } = formik;

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      {showAddBoardModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <form
              onSubmit={handleSubmit}
              ref={ref}
              className="relative w-auto my-6 mx-auto max-w-3xl"
            >
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Add Board</h3>
                  <button
                    className="p-1 rounded-full border border-red-500 ml-auto   text-red-500 float-right font-semibold outline-none focus:outline-none"
                    onClick={() => dispatch(setShowAddBoardModal(false))}
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
                      Enter the board title
                    </label>
                    <input
                      name="title"
                      onChange={handleChange}
                      value={values.title}
                      type="text"
                      className={`${
                        errors.title && touched.title
                          ? "input-error"
                          : "input-accent"
                      } input input-bordered w-full `}
                    />
                    {errors.title && touched.title && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        <span className="font-medium">{errors.title}</span>
                      </p>
                    )}
                  </div>
                  <div className="form-control flex items-start flex-row gap-2 ">
                    <input
                      name="status"
                      onChange={handleChange}
                      type="checkbox"
                      checked={values.status}
                      className="checkbox checkbox-primary"
                    />
                    {values.status ? "Make public" : "Make private"}
                  </div>
                </div>
                {/*footer*/}
                <div className="flex gap-2 items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="btn btn-secondary btn-sm"
                    type="button"
                    onClick={() => dispatch(setShowAddBoardModal(false))}
                  >
                    Close
                  </button>
                  <button className="btn btn-sm btn-primary">Save</button>
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

export default AddBoard;
