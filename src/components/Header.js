import React, { useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import { useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { toggleGptSearchView } from '../utils/gptSlice';
import { SUPPORTED_LANGUAGES } from '../utils/constants';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation(); 
    const user = useSelector((store) => store.user);
    const showgptSearch = useSelector((store) => store.gpt.showGptSearch);

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                // Sign-out successful
            })
            .catch((error) => {
                navigate('/error');
            });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName } = user;
                dispatch(addUser({ uid, email, displayName }));
    
                if (location.pathname === '/') {
                    navigate('/browse');
                }
            } else {
                dispatch(removeUser());
                if (location.pathname !== '/') {
                    navigate('/');
                }
            }
        });
    
        return () => unsubscribe();
    }, [dispatch, navigate, location.pathname]);
    
    

    const handleGptSearchClick = () => {
        dispatch(toggleGptSearchView());
    };

    const handleLanguageChange = (e) => {
        dispatch(changeLanguage(e.target.value));
    };

    const isMovieInfoPage = location.pathname.includes('/movieinfo');
    const isProfilePage = location.pathname.includes('/profile');

    return (
        <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between mb-0">
            <img
                className="w-44 mx-auto md:mx-0 bg-opacity-50 h-10 bg-black rounded cursor-pointer"
                src="/logo.png"
                alt="logo"
                onClick={() => navigate('/browse')}
            />
            {user && (
                <div className="flex p-2 m-auto md:m-0">
                    {!isMovieInfoPage && !isProfilePage && showgptSearch && (
                        <select
                            className="p-2 m-2 bg-gray-900 text-white"
                            onChange={handleLanguageChange}
                        >
                            {SUPPORTED_LANGUAGES.map((lang) => (
                                <option key={lang.identifier} value={lang.identifier}>
                                    {lang.name}
                                </option>
                            ))}
                        </select>
                    )}
                    {!isMovieInfoPage && !isProfilePage  && (
                        <button
                            className="py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg transition duration-300 ease-in-out transform bg-purple-900 hover:scale-105 shadow-lg"
                            onClick={handleGptSearchClick}
                        >
                            {showgptSearch ? 'Browse' : 'Ask Filmi!'}
                        </button>
                    )}

                    {(isMovieInfoPage || isProfilePage) && (
                        <button className="py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg transition duration-300 ease-in-out transform bg-purple-900 hover:scale-105 shadow-lg
                         " onClick={() => navigate('/browse')}>
                             Browse
                        </button>
                    )}
<div className="flex items-center">
  <img 
    className="w-12 h-12 cursor-pointer rounded-full border-2 border-gray-300" 
    src={user.photoURL || "/usericon.png"} 
    alt="usericon" 
    onClick={() => navigate('/profile')} 
  />
  
  <button 
    onClick={handleSignOut} 
    className="font-bold text-white bg-red-700 rounded-l-full rounded-r-full pl-6 pr-8 ml-3 transition duration-300 ease-in-out transform hover:bg-red-800 hover:scale-105 shadow-lg"
  >
    Sign Out
  </button>
</div>
                </div>
            )}
        </div>
    );
};

export default Header;
