import { GetStaticProps } from 'next';

import { Layout } from 'components/Layout/Layout';
import { getAllPostsData } from 'lib/jsonPlaceFetch';
import { POST } from 'types/jsonPlace';
import { JsonPost } from 'components/JsonPost';

type Props = {
  posts: POST[];
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPostsData();
  return {
    props: { posts },
  };
};

const BlogPage: React.FC<Props> = ({ posts }) => {
  return (
    <Layout title='Blog'>
      <ul>{posts && posts.map((post) => <JsonPost key={post.id} {...post} />)}</ul>
    </Layout>
  );
};
export default BlogPage;
