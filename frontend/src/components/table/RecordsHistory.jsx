import React, { useContext, useState } from "react";
import { PreferencesContext } from "../../contexts";
import { formatTimestamp } from "../../utils";

const RecordsHistory = ({ onClose }) => {
  const { histories } = useContext(PreferencesContext);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 20;

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = histories.slice(indexOfFirstRecord, indexOfLastRecord);

  const totalPages = Math.ceil(histories.length / recordsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="z-20 w-auto bg-neutral py-4 px-5">
        <div className="overflow-x-auto">
          <table className="table text-white">
            <thead className="text-white">
              <tr>
                <th>Timestamp</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((item) => (
                <tr key={item._id}>
                  <th>{formatTimestamp(item.timestamp)}</th>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'wrap' }}>
                    {item.action}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4">
          <div className="join">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`join-item btn ${currentPage === i + 1 ? 'btn-active' : ''}`}
                onClick={() => paginate(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordsHistory;
