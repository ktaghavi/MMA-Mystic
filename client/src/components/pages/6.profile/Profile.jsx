import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const Profile = ({ user, setUser }) => {
    const nav = useNavigate();
    const userId = user.id;

    const formik = useFormik({
        initialValues: {
            newUsername: user.username,
            newEmail: user.email,
        },
        validationSchema: Yup.object({
            newUsername: Yup.string().required('Required'),
            newEmail: Yup.string().required('Required').email('Invalid email address'),
        }),
        onSubmit: (values) => {
            handleProfileUpdate(values.newUsername, values.newEmail);
        },
    });

    const handleProfileUpdate = (username, email) => {
        const updatedData = {
            username,
            email,
        };

        fetch(`api/users/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('User update failed');
                }
                return response.json();
            })
            .then((data) => {
                setUser(data);
                nav("/compare-fighters");
            })
            .catch((error) => {
                console.log('User update error:', error);
            });
    };

    const gradientBackground = {
        background: 'linear-gradient(180deg, #112c49 0%, #010010 100%)',
    };

    return (
        <div className="min-h-screen flex items-center justify-center" style={gradientBackground}>
            <div className="w-full max-w-md p-4 bg-white rounded-lg flex flex-col items-center">
                <h2 className="text-2xl mb-4">Profile</h2>
                <form className="w-full" onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            type="text"
                            {...formik.getFieldProps('newUsername')}
                        />
                        {formik.touched.newUsername && formik.errors.newUsername ? (
                            <div className="text-red-500 text-sm">{formik.errors.newUsername}</div>
                        ) : null}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            type="email"
                            {...formik.getFieldProps('newEmail')}
                        />
                        {formik.touched.newEmail && formik.errors.newEmail ? (
                            <div className="text-red-500 text-sm">{formik.errors.newEmail}</div>
                        ) : null}
                    </div>

                    <button
                        className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                        type="submit"
                    >
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Profile;