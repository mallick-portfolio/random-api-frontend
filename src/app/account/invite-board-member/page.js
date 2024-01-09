"use client";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { redirect, useParams, useSearchParams } from "next/navigation";
import { useVerifyEmailOTPMutation } from "@/app/store/api/accountApi";
import Loading from "@/app/components/shared/Loading";
import { useInviteBoardMemberMutation } from "@/app/store/api/taskApi";

const InvitedBoard = () => {
  console.log("i am calling");
  const searchParams = useSearchParams();
  const user = searchParams.get("user");
  const board = searchParams.get("board");
  const invitation_id = searchParams.get("invitation_id");
  const unique_id = searchParams.get("unique_id");

  const [handleInvitation, { data, isLoading }] =
    useInviteBoardMemberMutation();

  useEffect(() => {
    if (data && data?.success) {
      if (data?.reject) {
        toast.success(data?.message, {
          autoClose: 2000,
          position: "bottom-right",
        });
        redirect(`/account/login/`);
      } else {
        toast.success(data?.message, {
          autoClose: 2000,
          position: "bottom-right",
        });
        redirect(`/dashboard/board/${unique_id}`);
      }
    }
    if (data && !data?.success) {
      toast.error(data?.message);
    }
  }, [data]);

  const handelAccept = async () => {
    const data = {
      unique_id,
      invitation_id,
    };
    await handleInvitation({ action: "accept-invitation", data });
  };
  const handelReject = async () => {
    const data = {
      unique_id,
      invitation_id,
    };
    await handleInvitation({ action: "reject-invitation", data });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card w-[500px] bg-base-100 shadow-xl p-8">
        <h1 className="text-2xl my-5">
          <span className="text-secondary">{user}</span> is invited to join{" "}
          <span className="text-secondary">{board}</span> Board{" "}
        </h1>
        <div className="">
          <div className="mb-2 flex items-center w-full justify-center gap-4">
            <button onClick={() => handelAccept()} className="btn bg-first">
              Accept
            </button>
            <button onClick={() => handelReject()} className="btn bg-second">
              Reject
            </button>
          </div>
          <p className="text-sm mt-5">
            <strong>Note:</strong> Before accept invitation. Please login first
            then accept. Otherwise you are not able to access the board
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvitedBoard;
