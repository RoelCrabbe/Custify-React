import Card from '@components/ui/container/Card';
import Column from '@components/ui/container/Column';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { capitalizeFirstLetter } from '@lib';
import { memo, useEffect, useRef, useState } from 'react';

export interface Option<T = string> {
    value: T;
    label: string;
}

export interface Props<T = string> {
    label: string;
    value: T | null;
    onChange: (value: T | null) => void;
    validate?: (value: T | null) => string | null;
    placeholder: string;
    required: boolean;
    disabled?: boolean;
    options?: Option<T>[];
    enumObject?: Record<string, T>;
}

function InputSelect<T extends string>({
    label,
    value,
    onChange,
    validate,
    placeholder,
    required,
    disabled = false,
    options,
    enumObject,
}: Props<T>) {
    const [error, setError] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const generatedOptions =
        options && options.length
            ? options
            : enumObject
              ? Object.values(enumObject).map((val) => ({
                    value: val,
                    label: capitalizeFirstLetter(val),
                }))
              : [];

    const selectedOption = generatedOptions.find((opt) => opt.value === value);

    const validateValue = (newValue: T | null) => {
        if (newValue !== null && validate) {
            const validationError = validate(newValue);
            setError(validationError);
        } else {
            setError(null);
        }
    };

    const handleSelect = (selectedValue: T) => {
        onChange(selectedValue);
        validateValue(selectedValue);
        setIsOpen(false);
        buttonRef.current?.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (disabled) return;

        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(!isOpen);
        } else if (e.key === 'Escape') {
            setIsOpen(false);
        } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            if (!isOpen) {
                setIsOpen(true);
            }
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getArrowClasses = () => {
        const baseClasses = 'select-arrow';
        const stateClasses = [];

        if (isOpen) stateClasses.push('select-arrow-open');
        if (disabled) stateClasses.push('select-arrow-disabled');
        else stateClasses.push('select-arrow-enabled');

        return [baseClasses, ...stateClasses].join(' ');
    };

    const getOptionClasses = (option: Option<T>, index: number) => {
        const baseClasses = 'select-option';
        const stateClasses = [];

        if (option.value === value) {
            stateClasses.push('select-option-selected');
        } else {
            stateClasses.push('select-option-unselected');
        }

        if (index === 0) stateClasses.push('select-option-first');
        if (index === generatedOptions.length - 1) stateClasses.push('select-option-last');

        return [baseClasses, ...stateClasses].join(' ');
    };

    return (
        <Column gap={'2'}>
            <label className="input-field-label" htmlFor={`${label}-trigger`} id={`${label}-label`}>
                {label} {required && <span className="input-field-required">*</span>}
            </label>

            <div className={`relative ${isOpen ? 'select-container-open' : ''}`} ref={dropdownRef}>
                <button
                    ref={buttonRef}
                    type="button"
                    id={`${label}-trigger`}
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    onKeyDown={handleKeyDown}
                    disabled={disabled}
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                    aria-labelledby={`${label}-label`}
                    className={`input-field-base select-trigger ${
                        error ? 'input-field-error' : 'input-field-normal'
                    } ${disabled ? 'input-field-disabled' : ''}`}>
                    <span className={selectedOption ? 'select-value' : 'select-placeholder'}>
                        {selectedOption ? selectedOption.label : placeholder}
                    </span>

                    <FontAwesomeIcon icon={faChevronDown} className={getArrowClasses()} />
                </button>

                {isOpen && !disabled && (
                    <Card className={'select-dropdown'}>
                        {generatedOptions.map((option, index) => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => handleSelect(option.value)}
                                role="option"
                                aria-selected={option.value === value}
                                className={getOptionClasses(option, index)}>
                                {option.label}
                            </button>
                        ))}
                    </Card>
                )}

                {error && <span className="input-field-error-text">{error}</span>}
            </div>
        </Column>
    );
}

export default memo(InputSelect) as typeof InputSelect;
