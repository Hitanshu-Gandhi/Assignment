import Sidebar from "@/components/sidebar";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

// Define the type for Instructor data
type Instructor = {
  name: string;
  email: string;
  createdAt: string;
  role: string;
};

const InstructorManagement = () => {
  const [data, setData] = useState<Instructor[]>([]);

  useEffect(() => {
    // Fetch instructors data from API
    axios
      .get("/admin/instructor")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // Memoized columns to avoid unnecessary re-renders
  const columns = useMemo<MRT_ColumnDef<Instructor>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Instructor Name",
        size: 160,
      },
      {
        accessorKey: "email",
        header: "Email Address",
        size: 210,
      },
      {
        accessorKey: "createdAt",
        header: "Joined On",
        size: 140,
        Cell: ({ cell }) =>
          new Date(cell.getValue<string>()).toLocaleDateString(), // Format the date nicely
      },
      {
        accessorKey: "role",
        header: "Role",
        size: 120,
      },
    ],
    []
  );

  // Initialize the MaterialReactTable with the given data and columns
  const table = useMaterialReactTable({
    columns,
    data, // Data for the table
  });

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />
      {/* Content area */}
      <div className="flex-1 p-8 bg-gray-50 min-h-screen">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-semibold text-gray-800 tracking-wide">
            Instructor Details
          </h1>
        </header>

        <div className=" p-2 shadow-xl rounded-lg border border-gray-200">
          <MaterialReactTable table={table} />
        </div>
      </div>
    </div>
  );
};

export default InstructorManagement;
