import Banner from "../../components/News/Banner";
import { GET_INSTRUCTIONS_URL, GET_INSTRUCTIONS } from "../../query/general";
import { client } from "../../apolo-client";
import Video from "../../components/News/Video";
import Define from "../../components/News/Define";
const Instruction = (props) => {
  console.log(props.structionsData);
  const data = props.structionsData.pages[0].layouts;
  return (
    <div>
      <Banner data={data[0]} />
      <Define data={data[1]} />

      <Video data={props.structionsData.video[0]} />
    </div>
  );
};

export async function getStaticProps({ params }) {
  const { slug } = params;
  const structionsData = await client.query({
    query: GET_INSTRUCTIONS,
    variables: { slug: slug },
  });
  return {
    props: {
      structionsData: structionsData.data,
    },
  };
}
export async function getStaticPaths() {
  const data = await client.query({ query: GET_INSTRUCTIONS_URL });
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

export default Instruction;
