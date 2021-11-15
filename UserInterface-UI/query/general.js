import { gql } from "@apollo/client";

export const GET_HEADER = gql`
  query {
    allPages {
      name
      url
    }
  }
`;

export const GET_VIDEO = gql`
  query {
    datas: allVideos {
      name
      subTitle
      title
      poster {
        original: publicUrl
        thumbnail: publicUrlTransformed(transformation: { width: "64" })
      }
      video
    }
  }
`;
