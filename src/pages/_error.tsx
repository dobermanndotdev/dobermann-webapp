import { NextPageContext } from "next";

interface Props {
  statusCode: number;
}

function Error({ statusCode }: Props) {
  return <p>{statusCode ? `An error ${statusCode} occurred on server` : "An error occurred on client"}</p>;
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
