import { useEffect } from "react";
const Alltimeleaderboards = ({posts}) => {
    var count = 1;
    useEffect(()=>{

        posts && posts.sort(function(a, b) {
            var c = a.likes_count
            var d = b.likes_count
            return d-c;
        });
       },[posts])
    return ( 
        <div className="aLeaderboards">
        <h4>TOP 5 ALL TIME LEADERBOARDS</h4>
        {posts && posts.map((post) =>(
                <div className="alearderboards-name" key={post._id}>
                    <p><b>{count++}</b> {post.post_name} <small><strong>LIKES:{post.likes_count}</strong></small></p>
                  
                </div>
            ))}
    </div>
     );
}
 
export default Alltimeleaderboards;