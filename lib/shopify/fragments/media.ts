const mediaFragment = /* GraphQL */ `
  fragment media on Media {
    ... on MediaImage {
      id
      image {
        url
        altText
        width
        height
      }
      mediaContentType
    }
    ... on Video {
      id
      sources {
        url
        mimeType
        format
        height
        width
      }
      mediaContentType
    }
    ... on ExternalVideo {
      id
      host
      embeddedUrl
      mediaContentType
    }
  }
`;

export default mediaFragment;
