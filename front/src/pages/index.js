import { Dashboard } from "@/components/Home/Dashboard";
import { Typography } from "@material-tailwind/react";

const Home = () => {
   return (
      <div className="w-[calc(100%-256px)] h-screen overflow-y-auto">
         <Typography variant="h1">Inicio</Typography>
        <Dashboard/>
      </div>
   );
};

export default Home;
