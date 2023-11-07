import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const Profile = ({user,setUser}) => {
    const nav = useNavigate();
    const userId = user.id; // Replace with how you obtain the user's ID.

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
            // Handle profile update (username and email)
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
                setUser(data)
                nav("/compare-fighters");
            })
            .catch((error) => {
                console.log('User update error:', error);
            });
    };

    return (
        <div>
            <h2>Profile</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className="input-group">
                    <label>Username</label>
                    <input
                        type="text"
                        {...formik.getFieldProps('newUsername')}
                    />
                    {formik.touched.newUsername && formik.errors.newUsername ? (
                        <div className="error">{formik.errors.newUsername}</div>
                    ) : null}
                </div>

                <div className="input-group">
                    <label>Email</label>
                    <input
                        type="email"
                        {...formik.getFieldProps('newEmail')}
                    />
                    {formik.touched.newEmail && formik.errors.newEmail ? (
                        <div className="error">{formik.errors.newEmail}</div>
                    ) : null}
                </div>

                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default Profile;