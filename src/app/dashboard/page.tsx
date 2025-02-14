"use client";
import { logout } from "../login/actions";

function DashboardPage() {
  return <div><button onClick={logout}>Logout</button></div>;
}

export default DashboardPage;
