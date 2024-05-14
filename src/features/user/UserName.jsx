import {  useSelector } from "react-redux"

function UserName() {
    const username =useSelector((state)=>state.user.username)
    

    return (
   <div className="text-sm font-semibold hidden md:block">
    {username}
   </div>
    )
}

export default UserName
