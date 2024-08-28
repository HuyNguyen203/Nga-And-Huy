//libs
import classNames from 'classnames/bind';
import styles from './Input.module.scss';
import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

//components

function Input({
    title,
    isRequire,
    autoPading = false,
    small = false,
    large = false,
    password = false,
    darkGreen = false,
    red = false,
    orange = false,
    green = false,
    blue = false,
    placeholder,
    onChange,
}) {
    const cx = classNames.bind(styles);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef();

    const handleClear = () => {
        setInputValue('');
        inputRef.current.focus();
    };

    const handleChange = (e) => {
        const inputValue = e.target.value;
        if (!inputValue.startsWith(' ')) {
            setInputValue(inputValue);
            onChange(inputValue);
        }
    };

    return (
        <div
            className={cx('wrapper', {
                autoPading,
            })}
        >
            <div
                className={cx('input', {
                    small,
                    large,
                    darkGreen,
                    red,
                    orange,
                    green,
                    blue,
                })}
            >
                <span className={cx('title')}>
                    <strong className={cx('text-title')}>{title}</strong>
                    {isRequire && <span className={cx('isRequired')}>*</span>}
                </span>

                <input
                    value={inputValue}
                    spellCheck="false"
                    onChange={handleChange}
                    ref={inputRef}
                    placeholder={placeholder}
                    type={password ? 'password' : 'text'}
                />
                {!!inputValue && (
                    <button className={cx('clear')} onClick={handleClear}>
                        {/* Clear */}
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}
            </div>
        </div>
    );
}

export default Input;
