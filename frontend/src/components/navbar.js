import "./navbar.css";

export default function Navbar() {
  return (
    <div className="navBar">
      <div className="logo">
        <span class="material-symbols-outlined">deck</span>
        <span className="companyName">Shack</span>
      </div>
      <div className="rightNav">
        <span class="material-symbols-outlined">person</span>
      </div>
    </div>
  );
}
