import React from "react";

const QuoteBox = () => {
  return (
    <div className="bg-yellow-100 p-4 rounded shadow">
      <h3 className="font-semibold">Quote of the Day</h3>
      <p className="italic mt-2">
        "The only way to have a friend is to be one."
        <br />– Ralph Waldo Emerson
      </p>
    </div>
  );
};

export default QuoteBox;
