import { setShowAddColumnModal } from "@/app/store/reducer/modalSlice";
import useComponentVisible from "@/app/utils/useComponentVisible";
import { useDispatch, useSelector } from "react-redux";
import { HiMiniXMark } from "react-icons/hi2";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAddColumnMutation } from "@/app/store/api/taskApi";
import Loading from "../shared/Loading";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

const AddColumnModal = () => {
  const params = useParams();
  console.log(params.id);
  const dispatch = useDispatch();
  const { showAddColumnModal } = useSelector((state) => state.modal);

  const { ref } = useComponentVisible(
    showAddColumnModal,
    setShowAddColumnModal
  );

  // api call
  const [handleAddColumn, { data, isLoading }] = useAddColumnMutation();

  useEffect(() => {
    if (data && data.success) {
      toast.success(data.message);
      dispatch(setShowAddColumnModal(false));
    } else if (data && data.error) {
      toast.error(data.message);
    }
  }, [data]);

  const initialValues = {
    title: "",
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
  });
  const onSubmit = async (data, { resetForm }) => {
    data.board = params.id;
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
      {showAddColumnModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <form
              onSubmit={handleSubmit}
              ref={ref}
              className="relative w-auto my-6 mx-auto max-w-3xl"
            >
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Add Column</h3>
                  <button
                    className="p-1 rounded-full border border-red-500 ml-auto   text-red-500 float-right font-semibold outline-none focus:outline-none"
                    onClick={() => dispatch(setShowAddColumnModal(false))}
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
                      Enter the column title
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
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => dispatch(setShowAddColumnModal(false))}
                  >
                    Close
                  </button>
                  <button className="btn btn-secondary">Save</button>
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

export default AddColumnModal;
