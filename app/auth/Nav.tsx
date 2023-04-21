import Link from "next/link";
import Login from "./Login";
import LogOut from "./LogOut";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../pages/api/auth/[...nextauth]";

export default async function Nav() {
  const session = await getServerSession(authOptions);

  const { user } = session || {};
  return (
    <nav className="flex justify-between items-center py-8">
      <Link href="/">
        <h1 className="font-bold text-lg">Send it</h1>
      </Link>
      <ul className="flex items-center gap-6">
        {user ? <LogOut image={user.image ?? ""} /> : <Login />}
      </ul>
    </nav>
  );
}
