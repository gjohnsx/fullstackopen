import React, { useState, forwardRef, useImperativeHandle } from 'react';

const Toggleable = forwardRef((props, refs) => {
  const [visibility, setVisibility] = useState(false);

  const hideWhenVisible = { display: visibility ? 'none' : '' };
  const showWhenVisible = { display: visibility ? '' : 'none' };

  const toggleVisibility = () => {
    setVisibility(!visibility);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <button className='bg-blue-600 text-white border border-black py-1 px-2 rounded-md my-2' onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button className='border border-black py-1 px-2 rounded-md my-2' onClick={toggleVisibility}>Hide Form</button>
      </div>
    </div>
  );
});

Toggleable.displayName = 'Toggleable';

export default Toggleable;