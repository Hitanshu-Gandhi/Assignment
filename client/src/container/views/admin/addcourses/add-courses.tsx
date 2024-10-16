import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Sidebar from "@/components/sidebar";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { Toaster } from "@/components/ui/toaster";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";

// Define validation schema with Zod
const formSchema = z.object({
  name: z.string().min(3).max(100, "Name must be between 3 and 100 characters"),
  level: z.string().min(1, "Please specify the course level"),
  description: z.string().min(10, "Description should be at least 10 characters").max(500),
  image: z.string().url("Please enter a valid URL for the image"),
});

const AddCoursePage = () => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      level: "",
      description: "",
      image: "",
    },
  });

  // Handle form submission
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    axios.post('/admin/course', values)
      .then((res) => {
        if (res.data.created) {
          form.reset();
          toast({
            title: "Success",
            description: "Course added successfully!",
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

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-100">
        <div className="container mx-auto max-w-2xl">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">
              Create a New Course
            </h1>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Course Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold text-gray-700">Course Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter course name"
                          {...field}
                          className="border-gray-300 focus:ring-blue-500 rounded-md shadow-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Course Level */}
                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold text-gray-700">Course Level</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border-gray-300 focus:ring-blue-500 rounded-md shadow-sm">
                            <SelectValue placeholder="Select course level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Course Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold text-gray-700">Course Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Provide a detailed description of the course..."
                          {...field}
                          className="border-gray-300 focus:ring-blue-500 rounded-md shadow-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Course Image URL */}
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold text-gray-700">Course Image (URL)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com/image.jpg"
                          {...field}
                          className="border-gray-300 focus:ring-blue-500 rounded-md shadow-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button type="submit" className="w-full  hover:bg-slate-700 text-white py-3 rounded-lg font-medium transition-all">
                  Add Course
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default AddCoursePage;
