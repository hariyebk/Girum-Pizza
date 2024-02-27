import CreatUser from "../features/user/CreateUser"
import {useSelector} from "react-redux"
import Button from "./Button";
function Home() {
  const userName = useSelector(store => store.user.userName)
  return (
    <div className="my-10 sm:my-16 text-center px-4 sm:px-6">
      <h1 className=" flex flex-col gap-3 text-xl text-center font-semibold mb-8 md:text-3xl">
        <span> The best pizza. </span>
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      { userName ? <Button to = "/menu" type = "primary"> Go to Menu </Button> : <CreatUser />}
    </div>
  );
}

export default Home;
