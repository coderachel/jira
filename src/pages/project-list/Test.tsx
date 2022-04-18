import { useEffect, useState } from "react";
import { useMount } from "utils";

export const Test = () => {
  const [num, setNum] = useState(0);
  // console.log(1);
  useMount(() => {
    // setInterval(() => {
    //   console.log(num);
    // });
  });

  useEffect(() => {
    console.log(2);
    return () => {
      // console.log(num);
    };
  }, []);
  console.log(3);

  return (
    <div>
      <button
        onClick={() => {
          setNum(num + 1);
        }}
      >
        添加
      </button>
      {num}
    </div>
  );
};
