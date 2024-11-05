import React from "react";

const Loader = ({ outerWidth = "20", outerHeight = "20", innerScale = 0.8 }) => {
  const innerWidth = parseInt(outerWidth) * innerScale;
  const innerHeight = parseInt(outerHeight) * innerScale;

  return (
    <div>
      <div className="flex-col gap-4 w-full flex items-center justify-center">
        <div
          style={{
            width: `${outerWidth}px`,
            height: `${outerHeight}px`,
          }}
          className="border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
        >
          <div
            style={{
              width: `${innerWidth}px`,
              height: `${innerHeight}px`,
            }}
            className="border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
