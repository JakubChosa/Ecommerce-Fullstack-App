const CategoriesFilter = ({ handleChange, category, categories }) => {
  return (
    <div className="form-control">
      <h5>category</h5>
      <div>
        {categories.map((option, index) => (
          <button
            key={index}
            onClick={handleChange}
            name="category"
            type="button"
            className={`${
              category === option.toLowerCase()
                ? "option-btn active"
                : "option-btn"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};
export default CategoriesFilter;
