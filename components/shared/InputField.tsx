import { useRenderLogger } from '@hooks/useRenderLogger';
import React, { memo, useState } from 'react';

type Props = {
    type: React.HTMLInputTypeAttribute;
    label: any;
    value: any;
    onChange: (value: any) => void;
    validate?: (value: any) => any;
    placeholder: any;
    required: boolean;
    disabled?: boolean;
};

const InputField: React.FC<Props> = ({
    type,
    label,
    value,
    onChange,
    validate,
    placeholder,
    required,
    disabled = false,
}: Props) => {
    const [error, setError] = useState<any>(null);
    useRenderLogger('InputField');

    const validateValue = (newValue: any) => {
        if (newValue && validate) {
            const validationError = validate(newValue);
            setError(validationError);
        } else {
            setError(null);
        }
    };

    const handleChange = (option: { value: any }) => {
        const newValue = option.value;
        onChange(newValue);
        validateValue(newValue);
    };

    return (
        <>
            <div className="input-field-container">
                <label className="input-field-label">
                    {label} {required && <span className="input-field-required">*</span>}
                </label>
                <div className="relative">
                    <input
                        type={type}
                        value={value || ''}
                        onChange={(e) => handleChange({ value: e.target.value })}
                        placeholder={placeholder}
                        required={required}
                        disabled={disabled}
                        className={`input-field-base ${
                            error ? 'input-field-error' : 'input-field-normal'
                        } ${disabled ? 'input-field-disabled' : ''}`}
                    />
                    {error && <span className="input-field-error-text">{error}</span>}
                </div>
            </div>
        </>
    );
};

export default memo(InputField);
