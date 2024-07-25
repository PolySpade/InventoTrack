import React, { useContext, useState } from "react";
import { PreferencesContext } from "../../contexts";
import { formatTimestamp } from "../../utils";

const RecordsHistory = ({ onClose }) => {
  const { histories } = useContext(PreferencesContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState('');
  const recordsPerPage = 10;
  const maxPageButtons = 5;

  const histories_sorted = histories.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = histories_sorted.slice(indexOfFirstRecord, indexOfLastRecord);

  const totalPages = Math.ceil(histories_sorted.length / recordsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setInputPage('');
  };

  const handlePageInputChange = (e) => {
    const page = e.target.value;
    if (!isNaN(page) && page > 0 && page <= totalPages) {
      setInputPage(page);
    } else {
      setInputPage('');
    }
  };

  const handlePageInputSubmit = () => {
    if (inputPage) {
      paginate(Number(inputPage));
    }
  };

  const renderPaginationButtons = () => {
    const paginationButtons = [];
    const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    const endPage = Math.min(totalPages, currentPage + Math.floor(maxPageButtons / 2));

    if (currentPage > Math.floor(maxPageButtons / 2) + 1) {
      paginationButtons.push(
        <button
          key={1}
          className={`join-item btn ${currentPage === 1 ? 'btn-active' : ''}`}
          onClick={() => paginate(1)}
        >
          1
        </button>
      );
      if (startPage > 2) {
        paginationButtons.push(
          <span key="start-ellipsis" className="join-item btn">...</span>
        );
      }
    }

    for (let i = startPage; i <= Math.min(endPage, totalPages); i++) {
      paginationButtons.push(
        <button
          key={i}
          className={`join-item btn ${currentPage === i ? 'btn-active' : ''}`}
          onClick={() => paginate(i)}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages - 1) {
      paginationButtons.push(
        <span key="end-ellipsis" className="join-item btn">...</span>
      );
    }

    if (endPage < totalPages) {
      paginationButtons.push(
        <button
          key={totalPages}
          className={`join-item btn ${currentPage === totalPages ? 'btn-active' : ''}`}
          onClick={() => paginate(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    paginationButtons.push(
      <input
        key="input"
        type="text"
        value={inputPage}
        onChange={handlePageInputChange}
        onKeyPress={(e) => e.key === 'Enter' && handlePageInputSubmit()}
        className="join-item text-white input"
        placeholder="Go to"
        style={{ width: '80px' }}
      />
    );

    return paginationButtons;
  };

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
            {renderPaginationButtons()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordsHistory;
