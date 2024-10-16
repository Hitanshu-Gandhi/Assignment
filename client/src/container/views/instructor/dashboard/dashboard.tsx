// @ts-nocheck
import Sidebar from "@/components/instructorSidebar";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { Card } from "@/components/ui/card"; // Assuming you have a Card component

const InstructorDashboard = () => {
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    axios.get('/instructor/getSchedule')
      .then((res) => {
        console.log(res.data); // Log the response data
        setLectures(res.data); // Set the lectures data
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Memoize the column definitions
  const columns = useMemo<MRT_ColumnDef<any>[]>(() => [
    {
      accessorKey: 'courseName',
      header: 'Course Name',
      size: 250,
    },
    {
      accessorKey: 'date',
      header: 'Date',
      size: 150,
      Cell: ({ cell }) => {
        return new Date(cell.getValue()).toLocaleDateString();
      }
    },
  ], []);

  const table = useMaterialReactTable({
    columns,
    data: lectures,
  });

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      {/* Content area */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Instructor Dashboard</h1>
        <Card className="p-2 shadow-lg rounded-lg bg-white">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Lecture Schedule</h2>
          <MaterialReactTable table={table} />
        </Card>
      </div>
    </div>
  );
};

export default InstructorDashboard;
