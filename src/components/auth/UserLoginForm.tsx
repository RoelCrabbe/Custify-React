import Button from '@components/ui/Button';
import InputField from '@components/ui/InputField';
import StatusMessage from '@components/ui/StatusMessage';
import { handleErrorLabel } from '@lib';
import { LabelMessage } from '@types';
import { validatePassWord, validateUserName } from '@validators/user';
import Link from 'next/link';
import React, { ReactNode, useState } from 'react';

interface Props {
    onSubmit: (data: any) => void;
    onClearError: () => void;
    children?: ReactNode;
}

const UserLoginForm: React.FC<Props> = ({ onSubmit, onClearError, children }: Props) => {
    const [userName, setUserName] = useState<string | null>(null);
    const [passWord, setPassWord] = useState<string | null>(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
    const [labelMessage, setLabelMessage] = useState<LabelMessage>();

    const validate = (): boolean => {
        const errors = [validateUserName(userName), validatePassWord(passWord)].filter(Boolean);

        if (errors.length > 0) {
            handleErrorLabel(errors[0], setLabelMessage);
            return false;
        }

        return true;
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
                <header className="login-form-header">
                    <h1 className="login-form-title">Welcome Back</h1>
                    <span className="login-form-subtitle">Please sign in to your account</span>
                </header>

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

                    <Button.Submit onClick={handleSubmit} isLoading={isButtonDisabled} size={'lg'}>
                        Sign In
                    </Button.Submit>

                    {labelMessage && <StatusMessage labelMessage={labelMessage} />}
                    {children}
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
