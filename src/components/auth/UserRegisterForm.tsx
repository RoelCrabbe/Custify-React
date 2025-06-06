import Button from '@components/ui/Button';
import InputField from '@components/ui/InputField';
import StatusMessage from '@components/ui/StatusMessage';
import { handleErrorLabel } from '@lib';
import { LabelMessage } from '@types';
import Link from 'next/link';
import React, { ReactNode, useState } from 'react';

interface Props {
    onSubmit: (data: any) => void;
    onClearError: () => void;
    children?: ReactNode;
}

const UserRegisterForm: React.FC<Props> = ({ onSubmit, onClearError, children }: Props) => {
    const [firstName, setFirstName] = useState<string | null>(null);
    const [lastName, setLastName] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
    const [userName, setUserName] = useState<string | null>(null);
    const [passWord, setPassWord] = useState<string | null>(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
    const [labelMessage, setLabelMessage] = useState<LabelMessage>();

    const validateFirstName = (name: string | null) => {
        if (!name?.trim()) return 'First name is required.';
        return null;
    };

    const validateLastName = (name: string | null) => {
        if (!name?.trim()) return 'Last name is required.';
        return null;
    };

    const validateEmail = (email: string | null) => {
        if (!email?.trim()) return 'Email is required.';
        return null;
    };

    const validatePhoneNumber = (phoneNumber: string | null) => {
        if (phoneNumber && !phoneNumber?.trim()) return "Phone number can't be empty.";
        return null;
    };

    const validateUserName = (userName: string | null) => {
        if (!userName?.trim()) return 'Username is required.';
        return null;
    };

    const validatePassWord = (passWord: string | null) => {
        if (!passWord?.trim()) return 'Password is required.';
        return null;
    };

    const validate = (): boolean => {
        let valid = true;

        const firstNameError = validateFirstName(firstName);
        const lastNameError = validateLastName(lastName);
        const emailError = validateEmail(email);
        const phoneError = validatePhoneNumber(phoneNumber);
        const userNameError = validateUserName(userName);
        const passWordError = validatePassWord(passWord);

        if (
            firstNameError ||
            lastNameError ||
            emailError ||
            phoneError ||
            userNameError ||
            passWordError
        ) {
            handleErrorLabel(
                firstNameError ||
                    lastNameError ||
                    emailError ||
                    phoneError ||
                    userNameError ||
                    passWordError,
                setLabelMessage,
            );
            valid = false;
        }

        return valid;
    };

    const clearAllErrors = () => {
        onClearError();
        setLabelMessage(undefined);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        clearAllErrors();

        setIsButtonDisabled(true);
        setTimeout(() => setIsButtonDisabled(false), 2000);

        if (!validate()) {
            return;
        }

        const userData: any = {
            firstName,
            lastName,
            email,
            phoneNumber,
            userName,
            passWord,
        };

        onSubmit(userData);
    };

    return (
        <>
            <div className="register-form-container">
                <header className="login-form-header">
                    <h1 className="login-form-title">Create Account</h1>
                    <span className="login-form-subtitle">Please fill out the form below</span>
                </header>

                <form className="login-form">
                    <div className="register-form-fields">
                        <InputField
                            type="text"
                            label="First Name"
                            value={firstName}
                            onChange={setFirstName}
                            validate={validateFirstName}
                            placeholder={'Enter your first name'}
                            required
                        />

                        <InputField
                            type="text"
                            label="Last Name"
                            value={lastName}
                            onChange={setLastName}
                            validate={validateLastName}
                            placeholder={'Enter your last name'}
                            required
                        />

                        <InputField
                            type="email"
                            label="Email"
                            value={email}
                            onChange={setEmail}
                            validate={validateEmail}
                            placeholder={'Enter your email'}
                            required
                        />

                        <InputField
                            type="tel"
                            label="Phone Number"
                            value={phoneNumber}
                            onChange={setPhoneNumber}
                            validate={validatePhoneNumber}
                            placeholder={'Enter your phone number'}
                        />

                        <InputField
                            type="text"
                            label={'Username'}
                            value={userName}
                            onChange={setUserName}
                            validate={validateUserName}
                            placeholder={'Enter your username'}
                            required
                        />

                        <InputField
                            type="password"
                            label={'Password'}
                            value={passWord}
                            onChange={setPassWord}
                            validate={validatePassWord}
                            placeholder={'Enter your password'}
                            required
                        />
                    </div>

                    <Button.Submit onClick={handleSubmit} isLoading={isButtonDisabled} size={'lg'}>
                        Sign Up
                    </Button.Submit>

                    {labelMessage && <StatusMessage labelMessage={labelMessage} />}
                    {children}
                </form>

                <div className="login-form-footer">
                    <span className="login-form-divider">Already have an account?</span>
                    <Link href="/login" className="login-form-register-link">
                        Log in to your Custify account
                    </Link>
                </div>
            </div>
        </>
    );
};

export default UserRegisterForm;
