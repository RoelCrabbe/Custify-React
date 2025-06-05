import Button from '@components/ui/Button';
import FormContainer from '@components/ui/FormContainer';
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { User } from '@types';
import { useState } from 'react';

interface Props {
    user: User;
    onCancel: () => void;
    onClose: () => void;
}

const UserEditModal: React.FC<Props> = ({ user, onCancel, onClose }) => {
    const [formData, setFormData] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        email: user.email,
        phoneNumber: user.phoneNumber || '',
        role: user.role,
        isActive: user.isActive,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    const handleSave = () => {
        onClose();
    };

    return (
        <FormContainer.Modal className="z-[60]">
            <FormContainer.Card className="relative flex flex-col gap-4 mx-auto p-5 w-96 max-h-[80vh] overflow-y-auto">
                <header className="user-details-header">
                    <h3>Edit User</h3>
                    <button type="button" onClick={onClose}>
                        <FontAwesomeIcon icon={faXmarkCircle} />
                    </button>
                </header>

                <div className="grid grid-cols-1 gap-4 px-2">
                    <section className="flex flex-col text-sm">
                        <label className="font-medium text-gray-700 mb-1">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </section>

                    <section className="flex flex-col text-sm">
                        <label className="font-medium text-gray-700 mb-1">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </section>

                    <section className="flex flex-col text-sm">
                        <label className="font-medium text-gray-700 mb-1">Username</label>
                        <input
                            type="text"
                            name="userName"
                            value={formData.userName}
                            onChange={handleInputChange}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </section>

                    <section className="flex flex-col text-sm">
                        <label className="font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </section>

                    <section className="flex flex-col text-sm">
                        <label className="font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            placeholder="Optional"
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </section>

                    <section className="flex flex-col text-sm">
                        <label className="font-medium text-gray-700 mb-1">Role</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleInputChange}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                            <option value="moderator">Moderator</option>
                        </select>
                    </section>

                    <section className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            name="isActive"
                            checked={formData.isActive}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <label className="font-medium text-gray-700">Active User</label>
                    </section>
                </div>

                <div className="flex justify-end gap-4 pt-4 border-t">
                    <Button.Secondary onClick={onCancel}>Cancel</Button.Secondary>
                    <Button.Primary onClick={handleSave}>Save Changes</Button.Primary>
                </div>
            </FormContainer.Card>
        </FormContainer.Modal>
    );
};

export default UserEditModal;
