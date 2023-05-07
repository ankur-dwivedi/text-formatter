import React, { useEffect, useRef, useState } from "react";

const OPERATIONS_DATA = {
  BOLD: {
    startTag: "<strong>",
    endTag: "</strong>"
  },
  ITALICS: {
    startTag: "<i>",
    endTag: "</i>"
  },
  UNDERLINE: {
    startTag: "<u>",
    endTag: "</u>"
  },
  STRIKE: {
    startTag: "<s>",
    endTag: "</s>"
  }
};

const OPERATIONS = {
  BOLD: "BOLD",
  ITALICS: "ITALICS",
  UNDERLINE: "UNDERLINE",
  STRIKE: "STRIKE"
};
const Formatter = () => {
  const [input, setInput] = useState(
    '<p> This is the first line.<br />See, how the text fits here, also if<br />there is a <strong>linebreak</strong> at the end?<br />It works <i>nicely.<br /><br /><span style="color:lightgreen" }}>Great</i></span>.</p>'
  );
  const [temp, setTemp] = useState();

  const inputRef = useRef(null);

  const formatText = (operation, originalText, selectedText) => {
    let start = 0;
    let end = 0;
    let y = 0;
    for (let x = 0; x < originalText.length; x++) {
      if (selectedText.charCodeAt(y) === 10) {
        if (y < selectedText.length) y++;
        else {
          end = x;
          break;
        }
      }
      const c1 = originalText.charAt(x);
      const c2 = selectedText.charAt(y);
      console.log({ c1, c2, code: selectedText.charCodeAt(y), x, y });
      if (c1 === "<") {
        x = originalText.substring(x).indexOf(">") + x;
        console.log({ x });
        continue;
      }
      if (c1 === c2) {
        if (y === selectedText.length - 1) {
          end = x;
          break;
        }
        if (y === 0) start = x;
        y++;
      } else {
        if (y !== 0) x = x - 1;
        y = 0;
        start = 0;
      }
    }
    console.log({ start, end });
    if (start !== end) addTags(operation, originalText, start, end);
    // setInput(
    //   `${originalText.substring(0, start)}${
    //     OPERATIONS_DATA[operation].startTag
    //   }${originalText.substring(start, end + 1)}${
    //     OPERATIONS_DATA[operation].endTag
    //   }${originalText.substring(end + 1)}`
    // );
  };

  const addTags = (operation, originalText, start, end) => {
    let text = `${originalText.substring(0, start)}`;
    let a = start;
    for (let x = start; x <= end; x++) {
      const c1 = originalText.charAt(x);
      if (c1 === "<") {
        text =
          text +
          `${OPERATIONS_DATA[operation].startTag}${originalText.substring(
            a,
            x
          )}${OPERATIONS_DATA[operation].endTag}${originalText.substring(
            x,
            originalText.substring(x).indexOf(">") + x + 1
          )}`;
        x = originalText.substring(x).indexOf(">") + x;
        a = x + 1;
        console.log({ x, text });
        continue;
      }
    }
    text =
      text +
      `${OPERATIONS_DATA[operation].startTag}${originalText.substring(
        a,
        end + 1
      )}${OPERATIONS_DATA[operation].endTag}${originalText.substring(end + 1)}`;
    setInput(text);
  };

  return (
    <>
      <div
        contentEditable="true"
        ref={inputRef}
        onFocus={() => console.log("focus", window.getSelection())}
        onInput={(e) => {
          console.log("Text inside div", e.currentTarget.childNodes[0]);
          console.log(
            inputRef.current.innerHTML
              .replaceAll("&lt;", "<")
              .replaceAll("&gt;", ">")
          );
          // setTemp(e.currentTarget.childNodes[0].innerHTML);
        }}
        dangerouslySetInnerHTML={{ __html: input }}
      ></div>
      <button
        onClick={() => {
          setInput(
            inputRef.current.innerHTML
              .replaceAll("&lt;", "<")
              .replaceAll("&gt;", ">")
          );
          console.log(
            input,
            window.getSelection().toString(),
            window.getSelection()
          );
        }}
      >
        format
      </button>
      <button
        onClick={() => {
          console.log(
            input,
            window.getSelection().toString(),
            window.getSelection()
          );
          formatText(
            OPERATIONS.BOLD,
            inputRef.current.innerHTML
              .replaceAll("&lt;", "<")
              .replaceAll("&gt;", ">"),
            window.getSelection().toString()
          );
          // setInput(
          //   inputRef.current.innerHTML
          //     .replaceAll("&lt;", "<")
          //     .replaceAll("&gt;", ">")
          //     .replace(
          //       window.getSelection().toString(),
          //       `<b>${window.getSelection().toString()}</b>`
          //     )
          // );
        }}
      >
        bold
      </button>
      <button
        onClick={() => {
          console.log(
            input,
            window.getSelection().toString(),
            window.getSelection()
          );
          formatText(
            OPERATIONS.ITALICS,
            inputRef.current.innerHTML
              .replaceAll("&lt;", "<")
              .replaceAll("&gt;", ">"),
            window.getSelection().toString()
          );
          // setInput(
          //   inputRef.current.innerHTML
          //     .replaceAll("&lt;", "<")
          //     .replaceAll("&gt;", ">")
          //     .replace(
          //       window.getSelection().toString(),
          //       `<i>${window.getSelection().toString()}</i>`
          //     )
          // );
        }}
      >
        italics
      </button>
      <button
        onClick={() => {
          console.log(
            input,
            window.getSelection().toString(),
            window.getSelection().toString().length,
            window.getSelection()
          );
          formatText(
            OPERATIONS.UNDERLINE,
            inputRef.current.innerHTML
              .replaceAll("&lt;", "<")
              .replaceAll("&gt;", ">"),
            window.getSelection().toString()
          );
          // setInput(
          //   inputRef.current.innerHTML
          //     .replaceAll("&lt;", "<")
          //     .replaceAll("&gt;", ">")
          //     .replace(
          //       window.getSelection().toString(),
          //       `<u>${window.getSelection().toString()}</u>`
          //     )
          // );
        }}
      >
        underline
      </button>
      <button
        onClick={() => {
          console.log(
            input,
            window.getSelection().toString(),
            window.getSelection().toString().length,
            window.getSelection()
          );
          formatText(
            OPERATIONS.STRIKE,
            inputRef.current.innerHTML
              .replaceAll("&lt;", "<")
              .replaceAll("&gt;", ">"),
            window.getSelection().toString()
          );
          // setInput(
          //   inputRef.current.innerHTML
          //     .replaceAll("&lt;", "<")
          //     .replaceAll("&gt;", ">")
          //     .replace(
          //       window.getSelection().toString(),
          //       `<u>${window.getSelection().toString()}</u>`
          //     )
          // );
        }}
      >
        strike
      </button>
    </>
  );
};

export default Formatter;
