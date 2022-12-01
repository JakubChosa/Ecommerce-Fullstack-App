import { FaCheck } from "react-icons/fa";

const ColorsFilter = ({ colorsOptions, handleChange, colors }) => {
  return (
    <div className="form-control">
      <h5>colors</h5>
      <div className="colors">
        {colorsOptions.map((option, index) => {
          return option === "all" ? (
            <button
              key={index}
              name="colors"
              type="button"
              onClick={handleChange}
              data-color="all"
              className={`${
                colors === "all"
                  ? "option-btn all-btn active"
                  : " option-btn all-btn"
              }`}
            >
              All
            </button>
          ) : (
            <button
              key={index}
              name="colors"
              type="button"
              style={{ background: option }}
              className={`${
                colors === option ? "color-btn active" : "color-btn"
              }`}
              data-color={option}
              onClick={handleChange}
            >
              {colors === option ? <FaCheck /> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default ColorsFilter;
