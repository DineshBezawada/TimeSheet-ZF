import "./inputOptions.css";
import downArrowIcon from "../../icons/down-arrow-svgrepo-com.svg";
import { useEffect, useRef, useState } from "react";

const InputOptions = ({
  rowIndex,
  type,
  selectedOption,
  options,
  handleUpdateRowData,
  disabled,
  isMeeting,
}) => {
  const [isShowOptions, setIsShowOptions] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [optionsList, setOptionsList] = useState([]);
  const divRef = useRef(null);
  const iconRef = useRef(null);

  const toggleOptions = () => {
    setIsShowOptions((prev) => !prev);
  };
  const handleSingleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (value.length > 0) {
      setIsShowOptions(true);
      const filteredOptions = options?.filter((item) =>
        item?.toString()?.toLowerCase().includes(value.toLowerCase())
      );
      setOptionsList(filteredOptions);
    } else {
      setIsShowOptions(false);
    }
  };

  const handleClickOutside = (event) => {
    if (
      divRef.current &&
      !divRef.current.contains(event.target) &&
      !iconRef.current.contains(event.target)
    ) {
      setIsShowOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleOption = (option) => {
    setInputValue(option);
    setIsShowOptions(false);
    handleUpdateRowData(rowIndex, type, option, isMeeting);
    setOptionsList(options);
  };

  useEffect(() => {
    setOptionsList(options);
  }, [options]);

  useEffect(() => {
    if (selectedOption?.length > 0 && selectedOption !== "Organization") {
      setInputValue(selectedOption);
      setIsShowOptions(false);
    } else {
      setInputValue(selectedOption);
      setIsShowOptions(false);
    }
  }, [selectedOption]);


  return (
    <div className="single_select">
      <input
        type="text"
        className="z-0"
        onChange={handleSingleInputChange}
        value={inputValue}
        disabled={disabled}
      />
      {options?.length > 0 && !disabled && (
        <img
          src={downArrowIcon}
          className="z-0"
          alt="downArrow"
          onClick={toggleOptions}
          ref={iconRef}
        />
      )}
      {optionsList?.length > 0 && isShowOptions && (
        <div className="options z-5" ref={divRef}>
          {optionsList?.map((option, index) => {
            return (
              <h5
                key={index}
                role="button"
                onClick={() => {
                  handleOption(option);
                }}
                className={
                  selectedOption === option ? `selected ` : `cursor-pointer`
                }
              >
                {option}
              </h5>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default InputOptions;
