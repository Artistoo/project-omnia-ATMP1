import { transitionTimingFunctions } from '../../data.js';

export const handlePopoverState = function (popID, action, fade = { duration: 2000, active: false, delay: 3000 }) {
  try {
    const popover = document.getElementById(popID);

    //#ERR
    if (!popover) throw new Error(`no element with this id found`);
    if (!Boolean(popID)) throw new Error(`please provide the popover id first`);
    if (typeof action !== 'boolean') throw new Error(`action is not boolean`);

    //POPOVER TYPE STATE METHODS
    const update_popover_state = {
      dialog: action ? `show` : `hide`,
      popover: action ? `showPopover` : `hidePopover`,
    }[popover.tagName === 'DIALOG' ? 'dialog' : 'popover'];

    //ANIMATION
    if (fade.active) {
      popover[update_popover_state]();

      const fading_style = ['opacity-0', 'transition-opacity'];

      popover.style.transitionTimingFunction = transitionTimingFunctions.Elastic_Bounce_And_Settle_Alternate;
      popover.style.transitionDuration = fade.duration + 'ms';

      //clear fading  and update state
      const handleFadeFinish = (timer) => {
        clearTimeout(timer);
        popover.hidePopover();
        fading_style.forEach((prop) => popover.classList.remove(prop));
      };

      //applying fading and update state
      const fade_promise = new Promise((res, rej) => {
        setTimeout(() => {
          fading_style.forEach((prop) => popover.classList.add(prop));
          setTimeout(() => res(), 1000);
        }, fade.duration);
      }).then(handleFadeFinish);

      return;
    }

    popover[update_popover_state]();




    
  } catch ({ message: err }) {
    console.log({ err });
  }
};
