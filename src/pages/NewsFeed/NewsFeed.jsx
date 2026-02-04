import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import PostCard from '../../components/PostCard/PostCard'
import PostSkeleton from '../../components/PostSkeleton/PostSkeleton'
import CreatePostCard from '../../components/CreatePostCard/CreatePostCard'
import useGetPosts from '../../hooks/useGetPosts'
import UserRightSidebar from '../../components/UserProfileUI/UserRightSiderbar'

export default function NewsFeed() {
  /**
  Before getPosts() lived in NewsFeed
  Passed → PostCard , CreatePostCard
  Passed → PostCardHeader (and other components the PostCard renders that needed it)
  Called after delete / edit
  Huge suffering from: Tight coupling, Prop drilling, Hard to scale
  **/
  
  const {data: posts, isLoading} = useGetPosts()
  
  return (
    <>
      <main className='bg-gray-100 min-h-screen'>
        <section className='max-w-7xl mx-auto px-6 py-5'>
          <div className="grid grid-cols-4">
            <div className="hidden md:block col-span-1 md:px-4 lg:px-0">
              <LeftSidebar/>
            </div>
            <div className="col-span-4 md:col-span-2 space-y-5">
              {isLoading ? [0,1,2,3].map((_, index)=><PostSkeleton key={index}/>) : <>
                <CreatePostCard />
                {posts && posts.map((post)=>(<PostCard  post={post} key={post._id}/>))}
              </>}
            </div>
            <div className="col-span-1">
              <UserRightSidebar/>
            </div>
          </div>
        </section>
      </main>
      
    </>
  )
}
