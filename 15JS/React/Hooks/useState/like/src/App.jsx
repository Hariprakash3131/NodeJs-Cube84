import { useState } from "react"

const Like = () => {
    const [liked,setLiked]=useState(false)
  return (
      <>
      <h1>{liked ? "❤️ Liked" : "🤍 Like"}</h1>

        <button onClick={() => setLiked(!liked)}>

      Toggle

   </button>
      </>
  )
}

export default Like
