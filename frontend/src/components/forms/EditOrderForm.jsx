// src/components/EditOrderForm.js

import React, { useState } from "react";
import {
  XIcon,
  PencilIcon,
  ArchiveIcon,
  XCircleFillIcon,
  TrashIcon,
  AlertIcon,
  BellIcon,
  StopIcon,
  CheckCircleFillIcon
} from "@primer/octicons-react";
import { formatTimestamp } from "../../utils";



const EditOrderForm = ({
  id,
  buyerName,
  buyerEmail,
  buyerPhone,
  courierName,
  trackingNumber,
  sellingPlatform,
  status,
  totalPaid,
  otherFees,
  timestamp,
  timeline,
  notes,
  onClose,
  onDelete,
}) => {
  const [editNotes, setEditNotes] = useState(false);
  const [noteText, setNoteText] = useState(notes);

  const saveNotes = () => {
    setEditNotes(false);
  };

  const cancelNotes = () => {
    setEditNotes(false);
    setNoteText(notes);
  };

  return (
    <div className={`fixed inset-4 flex items-center justify-end z-50`}>
      <div
        className="fixed inset-0 bg-black opacity-50 z-0"
        onClick={onClose}
      ></div>
      <div className="flex flex-col relative bg-base-100 bg-opacity-80 text-white rounded-l-lg shadow-lg z-10 w-full max-w-md h-full overflow-y-auto">
        <div className="bg-primary w-full p-6">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 font-bold text-white"
          >
            <XIcon size={20} />
          </button>
          <h2 className="text-xl font-bold mb-2"># {id} </h2>
          <div className="flex justify-between">
            <h3 className="text-sm">Order Details</h3>
            <h3 className="text-sm">{formatTimestamp(timestamp)}</h3>
          </div>
        </div>
        <div className="w-full p-6">
          <div>
            <h4 className="text-md font-semibold">Buyer</h4>
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm">{buyerName}</p>
                <p className="text-sm text-accent">{buyerEmail}</p>
                <p className="text-sm">{buyerPhone}</p>
              </div>
              <button className="text-white">
                <PencilIcon size={16} />
              </button>
            </div>
          </div>
          <hr className="bg-white w-full h-px my-3" />
          <div className="mb-4">
            <h1 className="font-bold text-md my-2">Alerts</h1>
            <Alerts orderid={id} />
          </div>
          <hr className="bg-white w-full h-px my-3" />
          <div>
            <h1 className="font-bold text-md my-2">Timeline</h1>
            <Timeline data={timeline} />
          </div>
          <hr className="bg-white w-full h-px my-3" />
          <div className="mb-4">
            <h4 className="text-md font-semibold">Tracking Information</h4>
            <div>
              <p className="text-sm">Courier: {courierName}</p>
              <p className="text-sm">Tracking Number: {trackingNumber}</p>
            </div>
          </div>
          <div className="mb-4">
            <h4 className="text-md font-semibold">Selling Platform</h4>
            <p className="text-sm">{sellingPlatform}</p>
          </div>
          <div className="mb-4">
            <h4 className="text-md font-semibold">
              Total Paid: ₱{totalPaid}
            </h4>
            <h3 className="text-xs font-semibold">Fees: ₱{otherFees}</h3>
          </div>
          <div>
            <hr className="bg-white w-full h-px my-3" />
            <div>
              <h1 className="text-md font-semibold mb-2">Notes</h1>
              <div className="relative">
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  disabled={!editNotes}
                  className="h-15 rounded-lg bg-primary bg-opacity-50 w-full p-2 resize-none"
                />
                <div className="absolute right-1 top-1 cursor-pointer">
                  {!editNotes && (
                    <div onClick={() => setEditNotes((prev) => !prev)}>
                      <PencilIcon size={15} />
                    </div>
                  )}
                  {editNotes && (
                    <>
                      <div
                        className={`${editNotes ? "opacity-100" : "opacity-0"}`}
                        onClick={cancelNotes}
                      >
                        <XCircleFillIcon size={15} />
                      </div>
                      <div
                        className={`${editNotes ? "opacity-100" : "opacity-0"}`}
                        onClick={saveNotes}
                      >
                        <ArchiveIcon size={15} />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-4 tooltip tooltip-right" data-tip="Delete Order Record">
              <button className="p-1" onClick={onDelete}>
                <TrashIcon className="text-error" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditOrderForm;

const Alerts = ({ orderid }) => {
    return (
      <div className="space-y-2">
        <div className="flex flex-row w-full bg-secondary rounded-lg h-11 items-center">
          <div className="flex items-center justify-center rounded-full ml-3 w-9 h-9 bg-base-100">
            <StopIcon size={16} className="text-warning" />
          </div>
          <div className="ml-3 flex flex-col text-xs">
            <div className="font-bold">Warning</div>
            <div>Message</div>
          </div>
        </div>
        <div className="flex flex-row w-full bg-secondary rounded-lg h-11 items-center">
          <div className="flex items-center justify-center rounded-full ml-3 w-9 h-9 bg-base-100">
            <BellIcon size={16} className="text-success" />
          </div>
          <div className="ml-3 flex flex-col text-xs">
            <div className="font-bold">Notification</div>
            <div>Warning Message</div>
          </div>
        </div>
        <div className="flex flex-row w-full bg-secondary rounded-lg h-11 items-center">
          <div className="flex items-center justify-center rounded-full ml-3 w-9 h-9 bg-base-100">
            <AlertIcon size={16} className="text-error" />
          </div>
          <div className="ml-3 flex flex-col text-xs">
            <div className="font-bold">Alert</div>
            <div>Message</div>
          </div>
        </div>
      </div>
    );
  };

  const Timeline = ({ data }) => {
    const nextData = data.slice(1);
  
    return (
      <ol className="relative mb-3">
        <li className="ms-4 flex items-center">
          <div className="flex items-center absolute w-4 h-4 rounded-full -start-[0.425rem]">
            <CheckCircleFillIcon size={16} className="text-success" />
          </div>
          <div className="flex flex-row justify-between w-full">
            <div className="flex flex-col">
              <div className="font-bold">{data[0].status}</div>
              <div className="text-xs">{data[0].details}</div>
            </div>
            <div>
              <div className="font-medium text-md">
                {formatTimestamp(data[0].timestamp)}
              </div>
            </div>
          </div>
        </li>
        {nextData.map((item, index) => (
          <div key={index}>
            <li className="border-s h-8 -mt-1.5" />
            <li className="-mt-1.5 ms-4 flex items-center">
              <div className="flex items-center absolute w-4 h-4 rounded-full -start-[0.425rem]">
                <CheckCircleFillIcon size={16} className="text-success" />
              </div>
              <div className="flex flex-row justify-between w-full">
                <div className="flex flex-col">
                  <div className="font-bold">{item.status}</div>
                  <div className="text-xs">{item.details}</div>
                </div>
                <div>
                  <div className="font-medium text-md">
                    {formatTimestamp(item.timestamp)}
                  </div>
                </div>
              </div>
            </li>
          </div>
        ))}
      </ol>
    );
  };