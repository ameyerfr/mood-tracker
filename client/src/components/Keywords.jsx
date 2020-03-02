import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const Keywords = ({ title }) => {
  const [tags, setTags] = useState([]);
  const inputRef = useRef(null);

  const removeTag = i => {
    const newTags = [...tags];
    newTags.splice(i, 1);
    setTags(newTags);
  };

//   const addTag = e => {
//     e.preventDefault();
//     if (tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
//       return;
//     }
//     setTags([...tags, val.toLowerCase()]);
//     inputRef.current.value = "";
//   }

  const handleClick = e => {
    const val = inputRef.current.value;
    e.preventDefault();
    if (tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
      return;
    }
    setTags([...tags, val.toLowerCase()]);
    inputRef.current.value = "";
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
      <div className="tags">
        {/* <label htmlFor={title}>What made you feel {title} today?</label> */}
            <span className="input-btn">
                <input
                type="text"
                ref={inputRef}
                onKeyDown={inputKeyDown}
                // onChange={clbk}
                id={title}
                name={title}
                />
                <button
                type="button"
                onClick={handleClick}
                className="btn-add"
                >
                <FontAwesomeIcon icon={faPlus} />
                </button>
            </span>
            
            <div className="tags-container">
            <ul className="ul-tags">
                {tags.map((tag, i) => (
                <li className={title} key={tag}>
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
