
import UserProfile from '../../components/UserProfile';
import PostFeed from '../../components/PostFeed';
import { getUserWithUsername, postToJSON } from '../../lib/firebase';
import Metatags from '../../components/Metatags';


export default function UserProfilePage({ user, posts }) {
    return (
        <main>
            <Metatags title={user.username} />
            <UserProfile user={user} />
            <PostFeed posts={posts} admin />
        </main>
    );
}

export async function getServerSideProps({ query }) {
    let user, posts = null;
    const { username } = query;
    const userDoc = await getUserWithUsername(username);
    // If no user, short circuit to 404 page
    if (!userDoc) {
        return {
            notFound: true,
        };
    }
    user = userDoc.data();
    const postsQuery = userDoc.ref.collection('posts')
        .where('published', '==', true).orderBy('createdAt', 'desc').limit(5);

    posts = (await postsQuery.get()).docs.map(postToJSON);
    return {
        props: { user, posts },
    };
}