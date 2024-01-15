import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="h-20 bg-blue-950 w-full flex items-center justify-between px-8">
      <p
        className="text-slate-400 font-bold text-3xl"
        onClick={() => {
          navigate(`/`);
        }}
      >
        Web 3 Cinema
      </p>
      <p
        className="justify-right text-slate-400 text-3xl font-bold"
        onClick={() => {
          navigate(`/login`);
        }}
      >
        Login
      </p>
    </div>
  );
};

export default Navbar;
