import { GetServerSideProps } from "next";

const SearchPage = ({ query }: { query: string }) => {
  return (
    <div>
      <h1>SearchPage</h1>
      <p>Search results for {query}</p>
    </div>
  );
};

export default SearchPage;

export const getServerSideProps: GetServerSideProps = async ({
  query,
  res,
}) => {
  const queryParams = Object.entries(query)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  res.setHeader(
    "App-Cache-Control",
    "public, max-age=0, s-maxage=60, stale-while-revalidate=300"
  );
  return {
    props: {
      query: queryParams,
    },
  };
};
