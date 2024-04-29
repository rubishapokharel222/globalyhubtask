import React, { useEffect, useMemo, useState } from "react";

import { useTable, useGlobalFilter, usePagination } from "react-table";
import moment from "moment";

import { useDispatch, useSelector } from "react-redux";

import { deleteClient, getClient } from "../../redux/thunk/clientThunk";
import { Link } from "react-router-dom";
import Modal from "../../components/Modal";
import { successToast } from "../../utils/toastify";
const Client = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const client = useSelector((state) => state.clientState);

  useEffect(() => {
    dispatch(getClient());
  }, [dispatch]);

  const columns = useMemo(
    () => [
      {
        Header: "S.N",
        accessor: (row, i) => i + 1,
      },
      {
        Header: "Name",
        accessor: (row) => row.name,
      },
      {
        Header: "Gender",
        accessor: (row) => row.gender,
      },
      {
        Header: "Phone",
        accessor: (row) => row.phone,
      },
      {
        Header: "Email",
        accessor: (row) => row.email,
      },
      {
        Header: "Nationality",
        accessor: (row) => row.nationality,
      },

      {
        Header: "Created At",
        accessor: (row) => moment(row.created_at).format("MMM Do YYYY"),
        headerStyle: {
          width: "150px",
        },
      },
      {
        Header: "Updated At",
        accessor: (row) => moment(row.created_at).format("MMM Do YYYY"),
        headerStyle: {
          width: "150px",
        },
      },
      {
        Header: "Action",
        accessor: (row) => (
          <div className="actionlinks">
            <Link to={`/edit/${row.id}`}>
              <i className="fa-regular fa-edit actionlinks-view"></i>
            </Link>
            <i
              className="fa-regular fa-trash  actionlinks-delete"
              onClick={() => setShowDeleteModal(row.id)}
            ></i>
       
          </div>
        ),
        headerStyle: {
          width: "100px",
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: { pageIndex, pageSize },
    setGlobalFilter,
    gotoPage,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    pageCount,
    setPageSize,
  } = useTable(
    {
      columns,
      data: useMemo(() => {
        if (!client?.data) return [];
        return [...client.data].sort(
          (a, b) => new Date(b.updated) - new Date(a.updated)
        );
      }, [client?.data]),
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    useGlobalFilter,
    usePagination
  );
const successDelete=()=>{
  successToast("Client Deleted Successfully")
  dispatch(getClient())
}
  return (
    <>
      <div className="listpage">
        <div className="listpage-top">
          <h1>Client List</h1>
          <div className="listpage-top--textlink">
            <h2>
              <span>
                <i className="fa-regular fa-users"></i>
              </span>
              &nbsp;/ Client Management
            </h2>
            <div className="listpage-top--textlink_addsetting"></div>
          </div>
        </div>

        <div className="listpage-searchentry">
          <div className="listpage-searchentry--search">
            <input
              type="search"
              placeholder="Search here..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setGlobalFilter(e.target.value);
              }}
            />
            <i className="fa-regular fa-magnifying-glass"></i>
          </div>
          <div className="listpage-top--textlink_addsetting">
            <Link
              className="primary-button"
              //   style={{ fontSize: "0.8rem", height: "2.2rem" }}
              to="/add"
            >
              <span>
                <i className="fa-regular fa-plus"></i>
              </span>
              &nbsp;&nbsp; Add Client
            </Link>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
              className="listpage-searchentry--pageselect"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={client?.data?.length}>All</option>
            </select>
          </div>
        </div>

        <div className="listpage-tablesection">
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()} style={column.headerStyle}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="notfound">
                    Data not found.
                  </td>
                </tr>
              ) : (
                page.map((row, rowIndex) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell, cellIndex) => (
                        <td {...cell.getCellProps()}>
                          {cell.column.Header === "S.N"
                            ? rowIndex + 1 + pageIndex * pageSize
                            : cell.render("Cell")}
                        </td>
                      ))}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
          {pageSize !== client?.data?.length && (
            <div className="listpage-tablesection--pagination">
              <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                {"<<"}
              </button>
              <button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                {"<"}
              </button>
              <span>
                Page{" "}
                <strong>
                  {pageIndex + 1} of {pageOptions.length}
                </strong>
              </span>
              <button onClick={() => nextPage()} disabled={!canNextPage}>
                {">"}
              </button>
              <button
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                {">>"}
              </button>
            </div>
          )}
        </div>
      </div>
      {showDeleteModal && (
  <Modal
    title="Delete Client"
    handleCloseModal={() => setShowDeleteModal(false)}
  >
    <div className="confirmdiv" style={{ width: "400px" }}>
      <i
        className="fa-regular fa-circle-exclamation"
        style={{ background: "none" }}
      ></i>
      <p>Are you sure you want to delete this client?</p>
      <div className="confirmdiv-btns">
        <button
          className="primary-button"
          onClick={() => {
            dispatch(deleteClient({id:showDeleteModal, callback:successDelete}));
            setShowDeleteModal(false);
          }}
        >
          Yes
        </button>
        <button
          className="secondary-button"
          onClick={() => setShowDeleteModal(false)}
        >
          No
        </button>
      </div>
    </div>
  </Modal>
)}

    </>
  );
};
export default Client;
