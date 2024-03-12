import { Link } from "react-router-dom";
import petHeroLogo from "../assets/pet-heroes-logo.png";

export default function Header({
  heading,
  paragraph,
  linkName,
  linkUrl = "#",
}) {
  return (
    <div className="">
      <div className="flex justify-center">
        <img alt="" className="h-48 w-48" src={petHeroLogo} />
      </div>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        {heading}
      </h2>
      <p className="mt-5 text-center text-sm text-gray-600">
        {paragraph}
        <Link
          to={linkUrl}
          className="font-medium text-purple-600 hover:text-purple-500"
        >
          {linkName}
        </Link>
      </p>
      <p className="mt-5 text-center text-sm text-gray-600">
        I am not interested. Take me &nbsp;
        <Link
          to="/"
          className="font-medium text-purple-600 hover:text-purple-500"
        >
          back
        </Link>
      </p>
    </div>
  );
}
