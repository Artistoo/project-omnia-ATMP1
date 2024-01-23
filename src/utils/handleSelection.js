const handleSelection =
  (oneSelected, isSelected, display = true) =>
  (styleToApply = "", styleNotSelected = "", defaultStyle = "") => {
    return display && oneSelected
      ? isSelected
        ? styleToApply
        : styleNotSelected
      : defaultStyle;
  };

export default handleSelection;
