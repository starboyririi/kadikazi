import React, { useState } from 'react';
import { FaLock, FaInfoCircle } from "react-icons/fa";
import { DropdownButton, Dropdown } from 'react-bootstrap';
import './Register.css';
function PasswordGuidelines() {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(prevState => !prevState); // Toggle the state
    };

    return (
        <div className="input-box">
            <input
                type="password"
                placeholder="Password"
                required
            />
            <FaLock className="password-icon" onClick={toggleDropdown} />
            {showDropdown && (
                <DropdownButton
                    id="dropdown-basic-button"
                    title={<FaInfoCircle />}
                    variant="info"
                    className="password-dropdown"
                >
                    <Dropdown.Item>Password guidelines:</Dropdown.Item>
                    <Dropdown.Item>8 or more characters long</Dropdown.Item>
                    <Dropdown.Item>Contain at least one uppercase letter</Dropdown.Item>
                    <Dropdown.Item>Contain at least one lowercase letter</Dropdown.Item>
                    <Dropdown.Item>Contain at least one of the following special characters: @ # \ /</Dropdown.Item>
                </DropdownButton>
            )}
        </div>
    );
}

export default PasswordGuidelines;
