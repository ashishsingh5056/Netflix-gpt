import { auth } from "../utils/Firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { removeUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { Logo } from "../utils/constants";
import { useEffect, useState } from "react";
import { toggleGptSearchView } from "../utils/gptSlice";
import { SUPPORTED_LANGUAGES } from "../utils/constants";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const [openMenu, setOpenMenu] = useState(false);
  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };
  const handleLanguageChange = (e) => {
    //  console.log(e.target.value);
    dispatch(changeLanguage(e.target.value));
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    // unsubscribe when component unmounts
    return () => unsubscribe();
  }, [dispatch,]);

  const handleOpenMenu = () => {
    setOpenMenu((prev)=> !prev);
  };

  return (
    <>
      <div className=" w-screen absolute px-7  py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between ">
        <img className="w-44 mx-auto   md:mx-0" src={Logo} alt="logo" />
        {user && (
          <div className="flex justify-between p-2 ">
            {showGptSearch && (
              <select
                className="p-1 bg-gray-800 m-2 cursor-pointer rounded-lg text-white"
                onChange={handleLanguageChange}
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.identifier} value={lang.identifier}>
                    {lang.name}
                  </option>
                ))}
                {/* <option value="en">English</option>
        <option value="hindi">Hindi</option>
        <option value="spanish">Spanish</option> */}
              </select>
            )}
            <button
              className="p-1 px-4 mx-2 my-3 bg-purple-800 text-white rounded-lg"
              onClick={handleGptSearchClick}
            >
              {showGptSearch ? "HomePage" : "GPT Search"}
            </button>
           <div>
             <img
              className="hidden md:block w-12 cursor-pointer h-12"
              alt="userlogo"
              src={user?.photoURL}
              onClick={handleOpenMenu}
            />
            {/* <button onClick={handleSignOut} className='font-bold text-white'>Sign Out</button>  */}
            {openMenu && (
              <div className="absolute right-0 mt-2 mr-2 bg-gray-800 text-white rounded shadow-lg p-2 z-50">
                <button
                  onClick={handleSignOut}
                  className="font-bold bg-green-700  text-white"
                >
                  Sign Out
                </button>
              </div>
            )}
           </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
