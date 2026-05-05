import { useParams , Navigate} from "react-router-dom";
import FullWindow from "../components/FullWindow";

function EditorPage() {
  const { roomId } = useParams();
  if(!localStorage.getItem("name")){
    return <Navigate to="/"/>;
  }
  const user = {
    name: localStorage.getItem("name") || "Anonymous",
    project: roomId,
  };

  return <FullWindow user={user} />;
}

export default EditorPage;