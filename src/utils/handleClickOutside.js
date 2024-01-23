const handleClickOutside = (targets, conditions, cb) => {
  const handleBackdropClick = (event) => {
    const isOutside = targets.every((target) => {
      if (!target) return true; // If the target is null, consider it outside
      return !target.contains(event.target);
    });
    console.log({ isOutside, conditions });
    if (isOutside) {
      cb();
    } else {
      return;
    }
  };

  window.addEventListener("click", handleBackdropClick);

  // Return a cleanup function to remove the event listener
  return () => {
    window.removeEventListener("click", handleBackdropClick);
  };
};

export default handleClickOutside;
