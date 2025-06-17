import "./SideNav.css";
import {useNavigate} from "react-router-dom"
export default function SideNav() {
  const navigate=useNavigate()
  const options = [
    { name: "Home", icon: "dashboard" ,path:"home"},
    { name: "Create Post", icon: "account_circle", path:"create" },
  ];
  const handleClick=(index)=>{
    navigate(`/${options[index].path}`)
  }
  return (
    <div className="sideNav">
      {options.map((e,index) => {
        return (
          <div className="sideNavEle" onClick={()=>handleClick(index)}>
            {e.name}
            <span class="material-icons">{e.icon}</span>
          </div>
        );
      })}
    </div>
  );
}
