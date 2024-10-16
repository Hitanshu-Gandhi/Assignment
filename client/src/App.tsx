import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./container/home/home"
import LoginPage from "./container/auth/login"
import Courses from "./container/views/admin/courses/courses"
import AddCourses from "./container/views/admin/addcourses/add-courses"
import Instructors from "./container/views/admin/instructors/instructors"
import AdminProtectedRoute from "./components/protected/adminProtectedoutes"
import InstructorDashboard from "./container/views/instructor/dashboard/dashboard"
import InstructorProtectedRoutes from "./components/protected/instructorProtectedRoutes"

const App = () => {
  return (
    <>

      <BrowserRouter>
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route  path="/auth/login" element={<LoginPage />} />
        <Route  path="/admin/courses" element={<AdminProtectedRoute><Courses /></AdminProtectedRoute>} />
        <Route  path="/admin/add-courses" element={<AdminProtectedRoute><AddCourses /></AdminProtectedRoute>} />
        <Route  path="/admin/instructors" element={<AdminProtectedRoute><Instructors /></AdminProtectedRoute>} />
        <Route  path="/instructor" element={<InstructorProtectedRoutes><InstructorDashboard /> </InstructorProtectedRoutes>} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App