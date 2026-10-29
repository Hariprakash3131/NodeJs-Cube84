import { useContext } from "react";
import { UserContext } from "./UserContext";

function UserInfo() {

  const user = useContext(UserContext);

  return (
    <h1>Welcome {user}</h1>
  );

}

export default UserInfo;