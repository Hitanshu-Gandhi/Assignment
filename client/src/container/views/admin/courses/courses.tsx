import Sidebar from "@/components/sidebar";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { ToastAction } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  course: z.string(),
  instructor: z.string().min(1),
  date: z.date(),
});

// Define the Course type
type Course = {
  _id: string;
  name: string;
  level: string;
  description: string;
  image: string;
  createdAt: string;
};

const Courses = () => {
  const [data, setData] = useState<Course[]>([]);
  const [instructors, setInstructors] = useState<any[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      course: "",
      instructor: "",
      date: new Date(),
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    values.course = selectedCourseId;
    axios
      .post("/admin/lecture", values)
      .then((res) => {
        if (res.data) {
          form.reset();
          toast({
            title: "New Lecture Added",
            description: "Lecture added successfully!",
            action: <ToastAction altText="Okay">Okay</ToastAction>,
          });
        }
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: err.response.data.message,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      });
  };

  useEffect(() => {
    axios
      .get("/admin/course")
      .then((res) => {
        setData(res.data.courses);
        setInstructors(res.data.instructors);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Courses</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-lg shadow-lg p-4 flex flex-col"
            >
              <img
                src={course.image}
                alt={course.name}
                className="rounded-lg h-48 object-cover mb-4"
              />
              <h2 className="text-xl font-bold text-gray-800">{course.name}</h2>
              <p className="text-gray-600">Level: {course.level}</p>
              <p className="text-gray-500 mb-4">{course.description}</p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="bg-blue-600 text-white hover:bg-blue-700 transition duration-300"
                    onClick={() => setSelectedCourseId(course._id)}
                  >
                    Add Lecture
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add Lecture</DialogTitle>
                    <DialogDescription>
                      Fill out the lecture details and click the submit button.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                      >
                        <FormField
                          control={form.control}
                          name="course"
                          render={({ field }) => (
                            <FormItem className="hidden">
                              <FormLabel className="text-grey-800">
                                Course ID
                              </FormLabel>
                              <FormControl>
                                <Input
                                  autoComplete="off"
                                  {...field}
                                  value={selectedCourseId}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="instructor"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Instructor</FormLabel>
                              <FormControl>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select an instructor" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {instructors.map((instructor) => (
                                      <SelectItem
                                        key={instructor.email}
                                        value={instructor.email}
                                      >
                                        {instructor.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="date"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Lecture Date</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP")
                                      ) : (
                                        <span>Pick a date</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-auto p-0"
                                  align="start"
                                >
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="submit"
                          className="w-full bg-green-600 text-white hover:bg-green-700 transition duration-300"
                        >
                          Save Lecture
                        </Button>
                      </form>
                    </Form>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </div>
        <Toaster />
      </div>
    </div>
  );
};

export default Courses;
