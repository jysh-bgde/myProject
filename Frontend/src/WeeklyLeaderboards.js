import { useEffect } from "react";

const WeeklyLeaderboards = ({posts}) => {

   useEffect(()=>{

    posts && posts.sort(function(a, b) {
        var c = a.likes_count
        var d = b.likes_count
        return d-c;
    });
   },[posts]) 

var count =1;
    return ( 
        <div className="wLeaderboards">
            <h4>TOP WEEKLY LEADERBOARDS</h4>
            {posts && posts.map((post) =>(
                <div className="wlearderboards-name" key={post._id}>
                     <p><b>{count++}</b> {post.post_name} <small><strong>LIKES:{post.likes_count}</strong></small></p>
                </div>
            ))}
        </div>
    
     );
};
 
export default WeeklyLeaderboards;