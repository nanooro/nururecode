"use client";

import React from "react";

const CanvasDisplay = ({ data }: { data: any }) => {
  if (!data || !data.elements) {
    return null;
  }

  return (
    <div
      className="relative w-full bg-white border rounded-lg overflow-hidden"
      style={{ height: "800px" }}
    >
      {data.elements.map((element: any) => {
        const style: React.CSSProperties = {
          position: "absolute",
          left: `${element.x}px`,
          top: `${element.y}px`,
          width: `${element.width}px`,
          height: element.type === "image" ? "auto" : `${element.height}px`,
          ...element.style,
        };

        if (element.type === "text") {
          return (
            <div key={element.id} style={style}>  
              <div
                dangerouslySetInnerHTML={{
                  __html: element.content.replace(/\n/g, "<br />"),
                }}
              />
            </div>
          );
        }

        if (element.type === "image") {
          return (
            <img
              key={element.id}
              src={element.content}
              alt="Canvas content"
              style={style}
            />
          );
        }

        if (element.type === "shape") {
          return <div key={element.id} style={style} />;
        }

        return null;
      })}
    </div>
  );
};

export default CanvasDisplay;
