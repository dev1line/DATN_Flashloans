import Banner from "../../components/News/Banner";
import Define from "../../components/News/Define";
import Video from "../../components/News/Video";
import Info from "../../components/News/Info";
import { convertArrToObject } from "../../util/converArrayToObject";
import { client } from "../../apolo-client";
import { GET_NEWS, GET_NEWS_URL } from "../../query/general";
const SlugNews = (props) => {
  // const data = convertArrToObject(props.newsData);
  const data = props.newsData.news[0].layouts;
  // console.log(props.newsData);
  return (
    <div>
      <Banner data={data[0]} />
      <Define data={data[1]} />
      <Video data={props.newsData.video[0]} />
      <Info data={data[2]} />
    </div>
  );
};
export async function getStaticProps({ params }) {
  const { slug } = params;
  const newsData = await client.query({
    query: GET_NEWS,
    variables: { slug: slug },
  });
  return {
    props: {
      newsData: newsData.data,
    },
  };
}
export async function getStaticPaths() {
  const data = await client.query({ query: GET_NEWS_URL });
  const paths =
    !data.loading &&
    data?.data?.page[0]?.childrenPage.map((page) => ({
      params: { slug: page.slug },
    }));
  return {
    paths,
    fallback: true,
  };
}
export default SlugNews;
