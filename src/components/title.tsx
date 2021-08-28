import React from "react";

type Props = {
  children: string;
};

/**
 * タイトルコンポーネント
 * @param children 内容
 */

const Title: React.VFC<Props> = ({ children }) => {
  return <h1 className="text-2xl font-bold">{children}</h1>;
};

export default Title;
