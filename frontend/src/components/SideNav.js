import "./SideNav.css";

export default function SideNav() {
  const options = [
    { name: "Home", icon: "dashboard" },
    { name: "Profile", icon: "account_circle" },
    { name: "Settings", icon: "settings" },
  ];
  return (
    <div className="sideNav">
      {options.map((e) => {
        return (
          <div className="sideNavEle">
            {e.name}
            <span class="material-icons">{e.icon}</span>
          </div>
        );
      })}
    </div>
  );
}
