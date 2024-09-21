import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore"; 
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; 
import { auth, db, storage } from '../utils/firebase'; 
import { addUser } from '../utils/userSlice';
import Header from './Header';

const UserProfile = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState('https://i.pravatar.cc/300'); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true); 


  useEffect(() => {
    if (user && user.uid) {
      const fetchUserProfile = async () => {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setName(userData.displayName || '');
            setBio(userData.bio || '');
            setProfileImage(userData.profileImage || 'https://i.pravatar.cc/300');
          } else {
            setName(user.displayName || '');
            setProfileImage(user.photoURL || 'https://i.pravatar.cc/300');
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }finally{
          setIsFetching(false);
        }
      };
  
      fetchUserProfile();
    }
  }, [user]); 
  

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const storageRef = ref(storage, `profileImages/${user.uid}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      setProfileImage(downloadURL);
    }
  };

  const handleSubmit = async () => {
    if (!user || !user.uid) {
      setError("User not logged in or UID is missing.");
      return;
    }
  
    setError(null);
    setLoading(true);
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: profileImage,
      });
  
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        displayName: name,
        bio: bio,
        profileImage: profileImage,
      }, { merge: true });
  

      await auth.currentUser.reload();
      const updatedUser = auth.currentUser;
  
      dispatch(addUser({
        uid: updatedUser.uid,
        email: updatedUser.email,
        displayName: updatedUser.displayName,
        photoURL: updatedUser.photoURL,
      }));
  
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <div className="flex items-center justify-center h-screen">
          <p className="text-2xl">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  if (isFetching) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Header />
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-red-600"></div>
        <p className="ml-4">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="container mx-auto px-4 py-8 md:pt-20 pt-28">
        <div className="bg-gray-900 rounded-lg shadow-xl p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative w-48 h-48">
              <img
                src={profileImage }
                alt={`${name}'s profile`}
                className="w-full h-full object-cover rounded-full"
              />
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-red-700 text-white p-2 rounded-full cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                </label>
              )}
            </div>
            <div className="flex-grow">
              <h2 className="text-2xl font-bold mb-2">Display Name</h2>
              {isEditing ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 bg-gray-800 rounded-md mb-4"
                />
              ) : (
                <p className="text-xl mb-4">{name || "No display name set"}</p>
              )}
              <h2 className="text-2xl font-bold mb-2">Email</h2>
              <p className="text-xl mb-4">{user.email}</p>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">About Me</h2>
            {isEditing ? (
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-2 bg-gray-800 rounded-md"
                rows={4}
              />
            ) : (
              <p className="text-lg">{bio || "No bio provided"}</p>
            )}
          </div>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          <div className="mt-8 flex justify-end">
            {isEditing ? (
              <>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-red-700 text-white rounded-md mr-4 hover:bg-red-800 transition-colors"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-800 transition-colors"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
