import React from "react";


export default function TextWithLineBreaks({text}:{text:string}) {
    return (
        <>
          {text?.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </>
      );
  }