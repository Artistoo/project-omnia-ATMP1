import React from 'react';
import { handlePopoverState } from '../../utils/handlePopoverState.js';

import { BiCheck } from 'react-icons/bi';

export default function SuccessMessagePopover({ message = `success`, Icon = BiCheck, open, auto_close }) {
  //EFFECT
  React.useEffect(() => handlePopoverState(`success_message_popover`, open, auto_close.value && { active: true, delay: 7000, ...auto_close.props }), [open]);

  if (!open) return;

  //JSX
  return (
    <div popover={`auto`} id={`success_message_popover`} className={`flex-center top-[120px] mx-auto h-[50px] w-[400px] gap-x-[14px] rounded-md bg-green-400`}>
      <Icon size={17} />
      <p>{message}</p>
    </div>
  );
}
