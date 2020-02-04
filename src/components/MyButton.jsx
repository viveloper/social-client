import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

export default function MyButton(props) {
  const { children, onClick, tip, btnClassName, tipClassName } = props;
  return (
    <Tooltip title={tip} className={tipClassName} placement="top">
      <IconButton onClick={onClick} className={btnClassName}>
        {children}
      </IconButton>
    </Tooltip>
  );
}
