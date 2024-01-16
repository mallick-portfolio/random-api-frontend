import { setShowAddTaskModal } from "@/app/store/reducer/modalSlice";
import useComponentVisible from "@/app/utils/useComponentVisible";
import { useDispatch, useSelector } from "react-redux";
import { HiMiniXMark } from "react-icons/hi2";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAddTaskMutation } from "@/app/store/api/taskApi";
import Loading from "../shared/Loading";
import { useEffect } from "react";
import { toast } from "react-toastify";

const AddTask = () => {
  const dispatch = useDispatch();
  const { showAddTaskModal, selectedTaskItem } = useSelector(
    (state) => state.modal
  );

  const { ref } = useComponentVisible(showAddTaskModal, setShowAddTaskModal);

  // api call
  const [handleAddColumn, { data, isLoading }] = useAddTaskMutation();

  useEffect(() => {
    if (data && data.success) {
      toast.success(data.message);
      dispatch(setShowAddTaskModal(false));
    } else if (data && data.error) {
      toast.error(data.message);
    }
  }, [data]);

  const initialValues = {
    title: "",
    description: "",
    status: false,
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    status: Yup.boolean().default(false),
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
      {showAddTaskModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <form
              onSubmit={handleSubmit}
              ref={ref}
              className="relative w-auto my-6 mx-auto max-w-3xl"
            >
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Add Task</h3>
                  <button
                    className="p-1 rounded-full border border-red-500 ml-auto   text-red-500 float-right font-semibold outline-none focus:outline-none"
                    onClick={() => dispatch(setShowAddTaskModal(false))}
                  >
                    <span className=" text-red-500  text-2xl block outline-none focus:outline-none">
                      <HiMiniXMark />
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="mb-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Enter the task title
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
                  <div className="mt-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Enter the task description
                    </label>
                    <textarea
                      name="description"
                      onChange={handleChange}
                      value={values.description}
                      placeholder="Task description"
                      className={`textarea textarea-bordered textarea-xs min-h-24 w-full max-w-xs`}
                    ></textarea>
                    {errors.description && touched.description && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        <span className="font-medium">
                          {errors.description}
                        </span>
                      </p>
                    )}
                  </div>
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <input
                        name="status"
                        onChange={handleChange}
                        type="checkbox"
                        checked={values.status}
                        className="checkbox checkbox-primary"
                      />
                      <span className="label-text">Private / Public</span>
                    </label>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex gap-2 items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="btn btn-sm btn-secondary"
                    type="button"
                    onClick={() => dispatch(setShowAddTaskModal(false))}
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

export default AddTask;
