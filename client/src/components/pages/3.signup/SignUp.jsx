import { useNavigate } from "react-router-dom"
import { useFormik } from 'formik';
import * as Yup from 'yup';


const SignUp = ({setUser}) => {
    const nav = useNavigate()
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

    return (
    <div>
        <h2>Sign Up</h2>
        <form onSubmit={formik.handleSubmit}>
            <div className="input-group">
                <label>Email</label>
                <input
                    className="border-2 border-black-500 my-2"
                    type="email"
                    {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email ? (
                    <div className="error">{formik.errors.email}</div>
                ) : null}
            </div>

            <div>
                <label>Username</label>
                <input
                    className="border-2 border-black-500 my-2"
                    type="text"
                    {...formik.getFieldProps('username')}
                />
                {formik.touched.username && formik.errors.username ? (
                    <div className="error">{formik.errors.username}</div>
                ) : null}
            </div>

            <div className="input-group">
                <label>Password</label>
                <input
                    className="border-2 border-black-500 my-2"
                    type="password"
                    {...formik.getFieldProps('password')}
                />
                {formik.touched.password && formik.errors.password ? (
                    <div className="error">{formik.errors.password}</div>
                ) : null}
            </div>

            <button type="submit">Signup</button>
        </form>
    </div>
    );
};

export default SignUp;