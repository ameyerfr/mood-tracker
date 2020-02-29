import React, { useState, useRef } from "react";

const Keywords = ({ title }) => {
  const [tags, setTags] = useState([]);
//   const inputRef = useRef(null);

  const removeTag = i => {
    const newTags = [...tags];
    newTags.splice(i, 1);
    setTags(newTags);
  };

  const handleChange = e => {
    const val = e.target.value;
    setTags([...tags, val]);
  }

  const inputSubmit = e => {
    const val = e.target.value;
    e.preventDefault();
    if (tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
      return;
    }
    setTags([...tags, val.toLowerCase()]);
    // inputRef.current.value = "";
  };

  //   const inputKeyDown = e => {
  //     const val = e.target.value;
  //     if (e.key === "Enter" && val) {
  //       e.preventDefault();
  //       if (tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
  //         return;
  //       }
  //       setTags([...tags, val.toLowerCase()]);
  //       inputRef.current.value = "";
  //     } else if (e.key === "Backspace" && !val) {
  //       removeTag(tags.length - 1);
  //     }
  //   };

  return (
    <div className="keywords-container">
      <form className="tags" onSubmit={inputSubmit}>
        <label htmlFor={title}>What made you feel {title} today?</label>
        <input
          type="text"
        //   ref={inputRef}
          //   onKeyDown={inputKeyDown}
          onChange={handleChange}
          id={title}
          name={title}
        />
        <button type="submit" className="btn">
          Add
        </button>
      </form>
      <div className="tags-container">
        <ul className="ul-tags">
          {tags.map((tag, i) => (
            <li key={tag}>
              {tag}
              <button
                type="button"
                onClick={() => {
                  removeTag(i);
                }}
              >
                +
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Keywords;
