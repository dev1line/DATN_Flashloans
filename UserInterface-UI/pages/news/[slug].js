import Banner from "../../components/News/Banner";
import Define from "../../components/News/Define";
import Video from "../../components/News/Video";
import { convertArrToObject } from "../../util/converArrayToObject";
import { client } from "../../apolo-client";
import { GET_VIDEO } from "../../query/general";
const SlugNews = (props) => {
  const data = convertArrToObject(props.video?.datas);
  return (
    <div>
      <Banner />
      <Define />
      <Video data={data} />
    </div>
  );
};
SlugNews.getInitialProps = async (ctx) => {
  const videoData = await client.query({
    query: GET_VIDEO,
  });
  console.log(" video data:", videoData);
  return {
    video: videoData.data,
  };
};
export default SlugNews;
