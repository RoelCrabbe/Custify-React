import StatusMessage from '@components/layout/StatusMessage';
import Button from '@components/ui/Button';
import InputField from '@components/ui/InputField';
import { handleErrorLabel } from '@lib';
import { LabelMessage } from '@types';
import Link from 'next/link';
import React, { ReactNode, useState } from 'react';

type Props = {
    onSubmit: (data: any) => void;
    onClearError: () => void;
    children?: ReactNode;
};

const UserLoginForm: React.FC<Props> = ({ onSubmit, onClearError, children }: Props) => {
    const [userName, setUserName] = useState<string | null>(null);
    const [passWord, setPassWord] = useState<string | null>(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
    const [labelMessage, setLabelMessage] = useState<LabelMessage>();

    const validateUserName = (userName: string | null) => {
        if (!userName?.trim()) return 'Username is required.';
        if (userName.trim().length < 6) return 'Username must be at least 6 characters long.';
        if (userName.trim().length > 30) return 'Username cannot exceed 30 characters.';
        return null;
    };

    const validatePassWord = (passWord: string | null) => {
        if (!passWord?.trim()) return 'Password is required.';
        if (passWord.trim().length < 6) return 'Password must be at least 6 characters long.';
        if (passWord.trim().length > 30) return 'Password cannot exceed 30 characters.';
        if (!/[A-Z]/.test(passWord)) return 'Password must contain at least one uppercase letter.';
        if (!/[0-9]/.test(passWord)) return 'Password must contain at least one number.';
        if (!/[@$!%*?&#]/.test(passWord))
            return 'Password must contain at least one special character (@$!%*?&#).';
        return null;
    };

    const validate = (): boolean => {
        let valid = true;

        const userNameError = validateUserName(userName);
        const passWordError = validatePassWord(passWord);

        if (userNameError || passWordError) {
            handleErrorLabel(userNameError || passWordError, setLabelMessage);
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
            userName: userName,
            passWord: passWord,
        };

        onSubmit(userData);
    };

    return (
        <>
            <div className="login-form-container">
                <section className="login-form-header">
                    <h1 className="login-form-title">Welcome Back</h1>
                    <span className="login-form-subtitle">Please sign in to your account</span>
                </section>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="login-form-fields">
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

                    <Button
                        type="submit"
                        onClick={handleSubmit}
                        isLoading={isButtonDisabled}
                        isDisabled={isButtonDisabled}>
                        Sign In
                    </Button>

                    <>
                        {labelMessage && <StatusMessage labelMessage={labelMessage} />}
                        {children}
                    </>
                </form>

                <div className="login-form-footer">
                    <span className="login-form-divider">Don't have an account?</span>
                    <Link href="/register" className="login-form-register-link">
                        Create your Custify account
                    </Link>
                </div>
            </div>
        </>
    );
};

export default UserLoginForm;
