import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';

const SignUp = ({ setUser }) => {
    const nav = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: '',
            username: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Required').email('Invalid email address'),
            username: Yup.string()
                .required('Required'),
            password: Yup.string().required('Required')
            .min(7, 'Username should be over 6 characters long')
            .matches(/[a-zA-Z]/, 'Password must contain at least one letter.')
            .matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/, 'Password must contain at least one punctuation.'),
        }),
        onSubmit: values => {
            // console.log('Form data', values);
            
            const userObject = {
                "email": values.email,
                "username": values.username,
                "password": values.password
            }
            fetch('/api/users',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userObject)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response error");
                }
                return response.json();
            })
            .then(data => {
                setUser(data)
                nav("/compare-fighters");
            })
            .catch(error => {
                console.log("error", error.message);
            });
            
        },
    });

    const gradientBackground = {
        background: 'linear-gradient(180deg, #112c49 0%, #010010 100%)',
    };

    return (
        <div className="min-h-screen flex items-center justify-center" style={gradientBackground}>
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl text-center mb-4">Sign Up</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            className="w-full p-2 border border-gray-300 rounded"
                            type="email"
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="text-red-600 text-sm">{formik.errors.email}</div>
                        ) : null}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium">Username</label>
                        <input
                            className="w-full p-2 border border-gray-300 rounded"
                            type="text"
                            {...formik.getFieldProps('username')}
                        />
                        {formik.touched.username && formik.errors.username ? (
                            <div className="text-red-600 text-sm">{formik.errors.username}</div>
                        ) : null}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium">Password</label>
                        <input
                            className="w-full p-2 border border-gray-300 rounded"
                            type="password"
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div className="text-red-600 text-sm">{formik.errors.password}</div>
                        ) : null}
                    </div>

                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;