import { NextPage } from "next";
import dynamic from "next/dynamic";
const AdminApp = dynamic(() => import("@/src/components/AdminApp"), {
  ssr: false,
});

const Home: NextPage = () => <AdminApp />;

export default Home;
