import React, { useEffect, useState } from "react";

const Table = ({ data }) => {
  const [users, setUsers] = useState(data || []);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const handleSort = (type) => {
    let sortedDat = [];
    if (type === "asc") {
      sortedDat = [...users]?.sort((a, b) => a.id - b.id);
    } else {
      sortedDat = [...users]?.sort((a, b) => b.id - a.id);
    }
    setUsers(sortedDat);
    setCurrentPage(1);
  };

  // Pagination logic
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = users?.slice(startIndex, startIndex + rowsPerPage);

  const totalPages = Math?.ceil(users?.length / rowsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  //   search logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1);
      const filteredData = data?.filter((item) => {
        return item?.firstName?.toLowerCase()?.includes(search?.toLowerCase());
      });
      setUsers(filteredData);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="mx-auto p-4 h-screen">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by firstname"
        className="mb-4 p-2 border border-gray-300 rounded w-full"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="flex justify-end  items-center mb-4">
        <p className="text-sm mr-2">Sort By Id</p> :
        <button onClick={() => handleSort("asc")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"
            />
          </svg>
        </button>
        <button onClick={() => handleSort("desc")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18"
            />
          </svg>
        </button>
      </div>

      {/* Table */}
      <table className="w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b cursor-pointer">Id</th>
            <th className="px-4 py-2 border-b cursor-pointer">firstName</th>
            <th className="px-4 py-2 border-b cursor-pointer">lastName</th>
            <th className="px-4 py-2 border-b cursor-pointer">email</th>
          </tr>
        </thead>
        <tbody>
          {currentData?.map((row) => (
            <tr key={row.id} className="border-b">
              <td className="px-4 py-2">{row?.id}</td>
              <td className="px-4 py-2">{row?.firstName}</td>
              <td className="px-4 py-2">{row?.lastName}</td>
              <td className="px-4 py-2">{row?.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
