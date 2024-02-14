import { FaPlus } from "react-icons/fa";
import PublicTaskComments from "./PublicTaskComment";

const PublicTaskDetails = ({
  setShowTaskDetails,
  showTaskDetails,
  taskDetails,
}) => {
  // const { ref } = useComponentVisible(showTaskDetails, setShowTaskDetails);
  console.log("taskDetails", taskDetails);

  return (
    <div>
      {showTaskDetails ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none min-w-[500px]">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {taskDetails?.title}
                  </h3>
                  {/* <div className="flex items-center gap-1">
                    <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                      {taskDetails?.authorize_users
                        ?.slice(0, 4)
                        ?.map((mem, index) => (
                          <div key={index} className="">
                            <Avater
                              css={"bg-second w-10"}
                              name={`${mem?.first_name} ${mem?.last_name}`}
                            />
                          </div>
                        ))}

                      {taskDetails?.authorize_users?.length > 4 ? (
                        <div className="avatar placeholder">
                          <div className="w-10 bg-first text-neutral-content">
                            <span>
                              {taskDetails?.authorize_users?.length - 4}
                            </span>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <button className="p-1 rounded-full border border-red-500 ml-8 text-red-500 float-right font-semibold outline-none focus:outline-none">
                      <span className=" text-red-500  block outline-none focus:outline-none">
                        <FaPlus />
                      </span>
                    </button>
                  </div> */}
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto  max-h-[280px] overflow-y-auto">
                  <p className="">{taskDetails?.description}</p>

                  <h2 className="mt-5 text-lg font-semibold">Details</h2>
                  <PublicTaskComments comments={taskDetails?.task_comments} />
                </div>

                {/*footer*/}
                <div className="flex gap-2 items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    onClick={() => setShowTaskDetails(false)}
                    className="btn btn-sm bg-first"
                    type="button"
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

export default PublicTaskDetails;
