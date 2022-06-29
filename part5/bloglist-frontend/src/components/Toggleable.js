import React, { useState, forwardRef, useImperativeHandle } from 'react';

const Toggleable = forwardRef((props, refs) => {
    const [visibility, setVisibility] = useState(false);

    const hideWhenVisible = { display: visibility ? 'none' : ''};
    const showWhenVisible = { display: visibility ? '' : 'none'};
    
    const toggleVisibility = () => {
        setVisibility(!visibility);
    };

    useImperativeHandle(refs, () => {
        return {
            toggleVisibility
        }
    });

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>Hide Form</button>
            </div>
        </div>
    );
});

export default Toggleable;