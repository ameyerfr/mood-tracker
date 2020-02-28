import React, { useState, useRef } from "react";

const Keywords = ({ title }) => {
  const [tags, setTags] = useState([]);
  const inputRef = useRef(null);
  const removeTag = i => {
    const newTags = [...tags];
    newTags.splice(i, 1);
    setTags(newTags);
  };

  const inputKeyDown = e => {
    const val = e.target.value;
    if (e.key === "Enter" && val) {
        e.preventDefault();
      if (tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
        return;
      }
      setTags([...tags, val.toLowerCase()]);
      inputRef.current.value = "";
    } else if (e.key === "Backspace" && !val) {
      removeTag(tags.length - 1);
    }
  };

  return (
    <div className="keywords-container">
      <div className="tags">
        <label htmlFor={title}>What made you feel {title} today?</label>
        <input
          type="text"
          ref={inputRef}
          onKeyDown={inputKeyDown}
          id={title}
          name={title}
        />
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
    </div>
  );
};

export default Keywords;
