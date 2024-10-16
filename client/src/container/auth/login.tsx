import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import axios from "axios"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { useNavigate } from "react-router-dom"

const formSchema = z.object({
    email: z.string().email().min(3).max(100),
    password: z.string().max(20)
})

const LoginPage = () => {

    const { toast } = useToast()
    const navigate = useNavigate()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {

        axios.post('/auth/login', values)
            .then((res) => {
                if(res.data.auth) {
                    
                    // save token to local storage
                    localStorage.setItem('token',res.data.token)

                    const role = res.data.user.role
                    switch(role){
                        case 'admin':
                            navigate('/admin/instructors')
                            break;
                        case 'instructor':
                            navigate('/instructor')
                            break;
                    }
                }
            })
            .catch((err) => {
                toast({
                    variant: "destructive",
                    title: "Login Failed",
                    description: err.response.data.message,
                    action: <ToastAction altText="Try again">Try again</ToastAction>,
                })
            })
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="container p-4">
                <div className="text-center mb-8">
                    <h1 className="font-sans font-bold text-gray-900 text-5xl mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-lg text-gray-600">Login to access your dashboard</p>
                </div>

                <div className="lg:w-[40%] md:w-[60%] w-full mx-auto">
                    <Card className="shadow-lg border border-gray-200">
                        <CardHeader className="pb-0">
                            <CardTitle className="text-gray-800 font-medium text-2xl mb-3">
                                Sign In
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-700">Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className="border-gray-300"
                                                        placeholder="example@domain.com"
                                                        autoComplete="off"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-700">Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        className="border-gray-300"
                                                        placeholder="••••••••"
                                                        autoComplete="off"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        className="w-full bg-slate-800 text-white hover:bg-slate-600"
                                        type="submit"
                                    >
                                        Login
                                    </Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <Toaster />
        </div>
    )
}

export default LoginPage
