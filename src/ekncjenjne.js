import { create } from "zustand";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, setDoc, doc , getDoc , getDocs, arrayUnion , updateDoc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { signOut as firebaseSignOut } from "firebase/auth";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getStorage } from "firebase/storage";
import { Timestamp } from "firebase/firestore";
import { getVertexAI, getGenerativeModel } from "firebase/vertexai"; 

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();
const vertexAI = getVertexAI(app);
const geminiModel = getGenerativeModel(vertexAI, { model: "gemini-2.0-flash-lite-001" });
const gemmaModel = getGenerativeModel(vertexAI, { model: "gemma-2.0" });


// Zustand store for authentication
export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isCheckingAuth: true,
  error: null,
  preferredAIModel: "gemini-2.0-flash", // Default AI model
  campaigns: [],
  courses: [],
  workshops: [],
  jobs: [],
  partners: [],

 signIn : async () => {
    set({ isLoading: true, error: null });
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const userRef = doc(db, "users", user.uid);
  
      // Check if the user exists in Firestore
      const userDoc = await getDoc(userRef);
  
      if (userDoc.exists()) {
        // User exists, no need to create a new profile
        console.log("User already exists:", userDoc.data());
      } else {
        // User doesn't exist, create a new profile
        const userData = {
          uid: user.uid,
          name: user.displayName || "",
          email: user.email,
          phone: user.phoneNumber || "",
          image: user.photoURL || "",
          orientation: "",
          address: "",
          gender: "",
          coins: "100",
          ngos: [],
          interest: [],
          workshops: [],
          campaign: [],
          orders: [],
          age: "",
          pronouns: "",
          skills: [],
          cart: [],
          post: [
            {
              comments: "",
              text: "",
              likes: "",
              time: Timestamp.now(),
              image: "",
            },
          ],
          
        };
  
        await setDoc(userRef, userData);
        console.log("New user created:", userData);
      }
  
      // Save token in localStorage
      const token = await user.getIdToken();
      localStorage.setItem("authToken", token);
  
      // Update Zustand state
      set({ user: userData, isAuthenticated: true, isLoading: false });
    } catch (error) {
      console.error("Error signing in:", error);
      set({
        error: error.message || "Error signing in",
        isLoading: false,
      });
      throw error;
    }
  },

  generateAIResponse: async (prompt , setMessage) => {
    const { preferredAIModel } = useAuthStore.getState();

    const model = geminiModel;
    const userPrompt = setMessage + prompt;
    try {
      const result = await model.generateContent(userPrompt);
      return result.response.text();
    } catch (error) {
      console.error("AI generation error:", error);
      return "AI response generation failed.";
    }
  },
  

  signOut: async () => {
    set({ isLoading: true, error: null });
    try {
      await firebaseSignOut(auth);
      localStorage.removeItem("authToken");
      
      // Reset state
      set({ user: null, isAuthenticated: false, isLoading: false });
    } catch (error) {
      set({ error: "Error logging out", isLoading: false });
      console.error("Error signing out:", error);
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          const userDoc = doc(db, "users", currentUser.uid);
          const userSnap = await getDoc(userDoc);
  
          if (userSnap.exists()) {
            set({
              user: { uid: currentUser.uid, ...userSnap.data() },
              isAuthenticated: true,
              isCheckingAuth: false,
            });
          } else {
            console.error("No Firestore document found for user");
            set({ user: null, isAuthenticated: false, isCheckingAuth: false });
          }
        } else {
          // No user is signed in
          set({ user: null, isAuthenticated: false, isCheckingAuth: false });
        }
      });
    } catch (error) {
      console.error("Error checking auth state:", error);
      set({ user: null, isAuthenticated: false, isCheckingAuth: false });
    }
  },

  updateUserSchema: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");

      await setDoc(doc(db, "users", user.uid), userData, { merge: true });
      set({ user: { ...userData, email: user.email }, isLoading: false });
    } catch (error) {
      set({ error: error.message || "Error updating user schema", isLoading: false });
      console.error("Error updating user schema:", error);
    }
  },

  addToCart : async (userId , product) => {
    try{
      set({ isLoading: true, error: null });
      const userRef = doc(db , "users" , userId);
      const userSnap = await getDoc(userRef);
      
      if(userSnap.exists()) {
          const userData = userSnap.data();
          const cart = userData.cart || [];

          const isProductInCart = (cart.some((item) => item.id === product.id));
          if(isProductInCart) {
            toast.success("item already in cart.")
            return;
          }
          await updateDoc(userRef , {cart: arrayUnion(product)});
          set({user: {...userData , cart : [...cart , product]}});
          toast.success("item added to cart");
      }
      else {
        return;
      }
    }

    
    catch(error) {
      console.log("could not add to cart");
      throw error;
    }
  },

  removeFromCart : async (userId , product) => {
    try {
      const userRef = doc(db , "users" , userId);
      const userSnap = await getDoc(userRef);

      if(userSnap.exists()) {
        const userData = userSnap.data();
        const cart = userData.cart || [];
        
          const updatedCart = cart.filter((item) => item.id !== product.id);
          await updateDoc(userRef , {cart : updatedCart});
          set({user : {...userData , cart: updatedCart}});
          toast.success("item removed from cart");
      }
    }
    catch(error) {
      toast.error("error deleting item");
      throw error;
    }
  },


  fetchCampaigns : async () => {
    set({ isLoading: true, error: null });
  
    try {
      const querySnapshot = await getDocs(collection(db, "campaign"));
      const fetchedCampaigns = querySnapshot.docs.map((doc) => ({
        id: doc.id, // Firestore document ID
        ...doc.data(), // Campaign data
      }));
  
      set({ campaigns : fetchedCampaigns, isLoading: false });
    } catch (error) {
      set({ error: error.message || "Error fetching campaigns", isLoading: false });
      console.error("Error fetching campaigns:", error);
    }
  },
  fetchPartners : async () => {
    set({ isLoading: true, error: null });
  
    try {
      const querySnapshot = await getDocs(collection(db, "partners"));
      const fetchedPartners = querySnapshot.docs.map((doc) => ({
        id: doc.id, // Firestore document ID
        ...doc.data(), // Campaign data
      }));
  
      set({ partners : fetchedPartners, isLoading: false });
    } catch (error) {
      set({ error: error.message || "Error fetching partners", isLoading: false });
      console.error("Error fetching partners:", error);
    }
  },
  fetchCourses : async () => {
    set({ isLoading: true, error: null });
  
    try {
      const querySnapshot = await getDocs(collection(db, "courses"));
      const fetchedCourses = querySnapshot.docs.map((doc) => ({
        id: doc.id, // Firestore document ID
        ...doc.data(), // Campaign data
      }));
  
      set({ courses : fetchedCourses, isLoading: false });
    } catch (error) {
      set({ error: error.message || "Error fetching courses", isLoading: false });
      console.error("Error fetching courses:", error);
    }
  },
  fetchWorkshops: async () => {
    set({ isLoading: true, error: null }); // Ensure initial loading state
  
    try {
      const snapShot = await getDocs(collection(db, "workshops"));
      const fetchedWorkshops = snapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      set({ workshops: fetchedWorkshops, isLoading: false }); // Set fetched workshops
    } catch (error) {
      // Improved error handling with fallback
      const errorMessage = error.message || "Error fetching workshops";
      set({ error: errorMessage, isLoading: false }); // Set error state
      console.error("Error fetching workshops:", errorMessage); // Log error with details
    }
  },
  fetchJobs: async () => {
    set({ isLoading: true, error: null }); // Ensure initial loading state
  
    try {
      const snapShot = await getDocs(collection(db, "jobs"));
      const fetchedJobs = snapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      set({ jobs: fetchedJobs, isLoading: false }); // Set fetched workshops
    } catch (error) {
      // Improved error handling with fallback
      const errorMessage = error.message || "Error fetching workshops";
      set({ error: errorMessage, isLoading: false }); // Set error state
      console.error("Error fetching workshops:", errorMessage); // Log error with details
    }
  },
  
}));

export { db, auth , storage };
