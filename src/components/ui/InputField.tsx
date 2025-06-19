import Column from '@components/ui/container/Column';
import React, { memo, useState } from 'react';

interface Props {
    type: React.HTMLInputTypeAttribute;
    label: any;
    value: any;
    onChange: (value: any) => void;
    validate?: (value: any) => any;
    placeholder?: any;
    required?: boolean;
    disabled?: boolean;
}

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

    const validateValue = (newValue: any) => {
        if (newValue !== null && validate) {
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
        <Column gap={'2'}>
            <label className="input-field-label" htmlFor={label}>
                {label} {required && <span className="input-field-required">*</span>}
            </label>
            <div className="relative">
                <input
                    id={label}
                    type={type}
                    value={value || ''}
                    onChange={(e) => handleChange({ value: e.target.value })}
                    placeholder={placeholder}
                    required={required}
                    disabled={disabled}
                    autoComplete={type === 'email' ? 'email' : undefined}
                    className={`input-field-base appearance-none ${
                        error ? 'input-field-error' : 'input-field-normal'
                    } ${disabled ? 'input-field-disabled' : ''}`}
                />
                {error && <span className="input-field-error-text">{error}</span>}
            </div>
        </Column>
    );
};

export default memo(InputField);
