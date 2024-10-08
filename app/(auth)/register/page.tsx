'use client';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';


const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    userName: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
    confirm_password: Yup.string().required('Must Match with Password').oneOf([Yup.ref('password'), ], 'Passwords must match'),
});

type FormValues = {
    userName: string;
    email: string;
    password: string;
    confirm_password: string;
};

const initialValues: FormValues = {
    email: '',
    password: '',
    userName: '',
    confirm_password: ''

};

const RegisterPage = () => {

    const router = useRouter();


    const handleSubmit = async (values: FormValues) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_LOCAL_URL}/api/register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();
            console.log("Response When Login"+data);

            if (response.ok) {
                // Handle success
                router.push('/login');
            } else {
                // Handle error
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <main className="container mx-auto h-screen place-content-center">
            <div className="flex min-h-full flex-1">
                <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div>
                            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Register your account
                            </h2>
                        </div>
                        <div className="mt-10">
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({isSubmitting}) => (
                                    <Form className="space-y-6">
                                        <div>
                                            <label htmlFor="userName"
                                                   className="block text-sm font-medium leading-6 text-gray-900">
                                                Username
                                            </label>
                                            <div className="mt-2">
                                                <Field
                                                    id="userName"
                                                    name="userName"
                                                    type="text"
                                                    autoComplete="userName"
                                                    required
                                                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                <ErrorMessage name="userName" component="div"
                                                              className="text-red-600 text-sm mt-1"/>
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="email"
                                                   className="block text-sm font-medium leading-6 text-gray-900">
                                                Email address
                                            </label>
                                            <div className="mt-2">
                                                <Field
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    autoComplete="email"
                                                    required
                                                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                <ErrorMessage name="email" component="div"
                                                              className="text-red-600 text-sm mt-1"/>
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="password"
                                                   className="block text-sm font-medium leading-6 text-gray-900">
                                                Password
                                            </label>
                                            <div className="mt-2">
                                                <Field
                                                    id="password"
                                                    name="password"
                                                    type="password"
                                                    autoComplete="current-password"
                                                    required
                                                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                <ErrorMessage name="password" component="div"
                                                              className="text-red-600 text-sm mt-1"/>
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="confirm_password"
                                                   className="block text-sm font-medium leading-6 text-gray-900">
                                                Confirm Password
                                            </label>
                                            <div className="mt-2">
                                                <Field
                                                    id="confirm_password"
                                                    name="confirm_password"
                                                    type="password"
                                                    autoComplete="confirm_password"
                                                    required
                                                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                <ErrorMessage name="confirm_password" component="div"
                                                              className="text-red-600 text-sm mt-1"/>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                            </div>

                                            <div className="text-sm leading-6">
                                                <a href="/login"
                                                   className="font-semibold text-indigo-600 hover:text-indigo-500">
                                                    login
                                                </a>
                                            </div>
                                        </div>
                                        <div>
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                                Register
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
                <div className="relative hidden w-0 flex-1 lg:block">
                    <img
                        className="absolute inset-0 h-full w-full object-cover"
                        src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
                        alt=""
                    />
                </div>
            </div>
        </main>
    )
}

export default RegisterPage;