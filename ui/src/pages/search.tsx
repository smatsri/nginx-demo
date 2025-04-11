import { GetServerSideProps } from "next";

type SearchPageProps = {
  query: string;
  date: string;
  time: string;
};

const SearchPageProps = (props: SearchPageProps) => props;

const SearchPage = ({ query, date, time }: SearchPageProps) => {
  return (
    <div>
      <h1>SearchPage</h1>
      <p>Search results for {query}</p>
      <p>Date: {date}</p>
      <p>Time: {time}</p>
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
    props: SearchPageProps({
      query: queryParams,
      date: new Date().toISOString(),
      time: new Date().toLocaleTimeString(),
    }),
  };
};
