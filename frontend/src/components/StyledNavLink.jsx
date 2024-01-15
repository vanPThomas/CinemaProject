import { NavLink } from "react-router-dom";

const StyledNavLink = (props) => {
  return (
    <NavLink
      {...props}
      // className={`underline ${props.className}`}
      className={
        ({ isActive }) =>
          `${
            isActive ? "underline text-teal-800" : "no-underline text-teal-100"
          } ${props.className}`
        //isActive
        //  ? `underline text-teal-800 ${props.className}`
        //  : `no-underline text-teal-100`
      }
    >
      {props.children}
    </NavLink>
  );
};

export default StyledNavLink;
