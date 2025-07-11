import { useState, useEffect ,useRef } from "react";
import { Loader , Sparkle, Sparkles , Trash ,Rocket ,Mic,CircleStop} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useAuthStore1 } from "../firebase";
import axios from "axios";
import ThemeBtn from "../components/ThemeBtn";
import { useChatStore } from "../store/chatStore";

const ChatPage = () => {
    
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const { user, signOut , addPrompt , addAnswer, generateAIResponse} = useAuthStore1();
    const [chatHistory, setChatHistory] = useState([]);
    const [iscomp, setIscomp] = useState(true);
    const [suggesting, setSuggesting] = useState(false);
    const [suggestion, setSuggestion] = useState("");
    const [showSuggestion, setShowSuggestion] = useState(false);
    const addSearch = useChatStore((state) => state.addSearch);
    const [confirmLogout , setConfirmLogout] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [transcription, setTranscription] = useState("");
    const [showTranscription , setShowTranscription] = useState(false);
    const [generating , setGenerating] = useState(false)
    const [activeChatIndex, setActiveChatIndex] = useState(null);
    const [message, setMessage] = useState(`Topic of pdf -> IIIT Allahabad  DSA Roadmap: 
1. 
Learning Method 
Emphasis on concept mastery and correct implementation for clarity. 
2. 
Prerequisites 
o 
C Language: Start with C to strengthen programming fundamentals, useful for PSP (Problem Solving with 
Programming). 
 
Recommended Playlists: 
 
https://www.youtube.com/playlist?list=PLxgZQoSe9cg1drBnejUaDD9GEJBGQ5hMt 
 
https://www.youtube.com/watch?v=irqbmMNs2Bo&ab_channel=ApnaCollege 
o 
C++/Java Basics: Transition to C++/Java to proceed with DSA learning. 
o 
Mathematics Foundations: Understand basics like logarithms, combinatorics, and probability. 
3. 
DSA Playlist Recommendations 
o 
For College: 
 
Abdul Bari’s C Language Playlist 
 
https://www.youtube.com/playlist?list=PLdo5W4Nhv31bbKJzrsKfMpo_grxuLl8LU  
o 
For Placements: 
 
https://www.youtube.com/@takeUforward 
4. 
Core Data Structures 
o 
Basics: Arrays, Strings 
o 
Intermediate: Stacks, Queues, Trees, Hashing, Heaps 
o 
Advanced: Graphs, AVL trees, Segment trees 
5. 
Key Algorithms 
o 
Sorting: Quick sort, Merge sort, Counting sort 
o 
Searching: Binary search, BFS/DFS, Dijkstra's algorithm 
o 
Dynamic Programming and Greedy Techniques 
6. 
Practice Platforms 
o 
LeetCode, HackerRank, GeeksforGeeks for DSA problems. 
 
 Process for Lost ID Card: 
1. 
e-FIR Registration: Nearest cybercafé (e.g., Shubham Cyber Café, Gate No.4). 
2. 
Form and Documents 
o 
Download form from the https://examcell.iiita.ac.in/?pg=downloads 
o 
Required documents: Class 10th Marksheet, e-FIR copy. 
3. 
Submission and Fees 
o 
Submit at AAA with fees: Rs. 750 (1 week) or Rs. 1500 (immediate). 
 
Applying for Visitor’s Hostel: 
1. 
Google Form Submission: Application Form 
2. 
Confirmation: Visit the Visitor’s Hostel for verification. 
 
Overview of IIIT(Indian institute of information technology) Allahabad: 
 
Academic Programs: Offers B.Tech, M.Tech, MBA, and Ph.D. with strong CSE, IT, and ECE programs. 
 
Faculty & Research: Highly qualified faculty with industry connections. 
 
Placements: Strong placement record with major tech firms. 
 
Campus Facilities: Modern infrastructure supporting both academics and recreation. 
 
Extracurricular Activities: Variety of clubs and events. 
 
Library: Open from 7 AM to 10:30 PM; registration required for book issues. 
 
 Resources for Semester Subjects: 
 
Course-Specific Resources: 
o 
PSP: https://www.youtube.com/playlist?list=PLxgZQoSe9cg1drBnejUaDD9GEJBGQ5hMt 
o 
FEE: https://www.youtube.com/@nesoacademy 
o 
EP, LAL: Refer to instructor notes, ppts, and past papers. 
o 
Technical Communication and COI/UHV: Focus on length and detail for scoring. 
 
 Resources  for Semester Subjects preparation and study material :   
   
Refer to previous years for any subjects. 
For the syllabus you can visit the website of the course instructors.  
For PSP(Problem solving with programming) visit https://profile.iiita.ac.in/srdubey/teaching.php  
For LAL(Linear Algebra) visit https://profile.iiita.ac.in/abdullah/Teaching.php  
For  EP(Engineering Physics) visit https://profile.iiita.ac.in/srijit/teaching.html                             
1 . For PSP(problem solving with programming)  :  
https://youtube.com/playlist?list=PLxgZQoSe9cg1drBnejUaDD9GEJBGQ5hMt&feature=shared  
https://youtu.be/irqbmMNs2Bo?feature=shared and previous year papers  
2 For  FEE(Fundamental of electrical and electronics engineering) :  https://www.youtube.com/@nesoacademy  
3 For  EP(engineering physics) : Refer to ppt ,  class notes and previous year papers  
4 For LAL(linear algebra): Refer to  Dr. Saurabh Verma notes or class notes from  
https://profile.iiita.ac.in/seemak/Teaching.php and previous year papers  
5. For Technical communication skills and COI or UHV keep your answer as long as possible as marks will be provided  
on basis of length.  
For any other study material look at the quick links section.   
 
Societies of college : 
 
Categories: 
1. 
Cultural 
2. 
Technical 
3. 
Sports 
Hierarchy: 
 
1st Year: Volunteers 
 
2nd Year: Members 
 
3rd Year: Coordinators and Senior Members 
Selection: Selection is interview-based, focusing on enthusiasm, suitability, and contributions. Observations throughout 
the year influence decisions. Societies stay active year-round, hosting high-caliber events and fostering a work-hard, play-
hard culture with after-parties. 
 
Cultural Societies 
1. 
Sarasva (Literary Society): 
o 
Activities: Writing, prose, poetry, quizzing, debating. 
o 
Major events: North India’s largest MUN, TEDx talks. 
o 
Inclusive, accepts many volunteers. Confidence is key in interviews. 
2. 
GeneticX Crew (Dance Society): 
o 
Activities: Dance learning, performing, teaching. 
o 
Auditions assess skill and style. Dedicated dance room with AC. 
3. 
Virtuosi (Music Society): 
o 
Focus: Indian and international rock music. 
o 
Open to all, even without prior stage experience. 
4. 
AMS (Acoustics and Media Society): 
o 
Manages sound, visuals, media for events. 
o 
Ideal for those interested in photography, photo editing, video editing. 
5. 
Nirmiti (Fine Arts Society): 
o 
Manages event decor and themed designs. 
o 
Requires art samples during the selection interview. 
6. 
Rangtarangini (Dramatics Society): 
o 
Focus on acting, directing, screenwriting. 
o 
Known for high standards and large audiences. Confidence and audience engagement are key in 
auditions. 
7. 
Team Effervescence: 
o 
Responsible for organizing Effervescence, the campus festival. 
o 
Large team with varied roles. Hard work and dedication lead to recognition. 
 
Technical Clubs 
1. 
GeekHaven: Multiple wings for specialized tech skills. 
o 
Web Development: Strong legacy, popular among applicants. 
o 
FOSS: Open-source code development. 
o 
Design: Creates event posters and visuals. 
o 
Cyber Security: Regular workshops for first-years. 
o 
Machine Learning: Focuses on AI, complex projects. 
o 
Competitive Programming: Known for coding contests. 
2. 
Tesla (Electronics Society): Established independently in 2018. 
o 
IoT: Workshops and talks on IoT. 
o 
Robotics: Builds path-following, obstacle-avoiding robots. 
o 
Electronic Devices and Automation: Advanced electronics, uses MATLAB, PSpice. 
3. 
Team Aparoksha: 
o 
Organizes Aparoksha, the annual technical fest. 
o 
Activities in coding, development, design, collaboration opportunities. 
4. 
IIIC (IIITA Info and Incubation Centre): 
o 
Business incubator supporting startups with financial aid, technical assistance, and human resources. 
o 
Hosts the E-Summit annually in February. 
 
Sports Club (SPIRIT) 
SPIRIT oversees sports events, including inter-year tournaments and faculty-student matches. Facilities cover football, 
basketball, cricket, tennis, swimming, badminton, and squash. Asmita is the main annual sports festival, promoting a 
vibrant, competitive atmosphere. 
 
Student Gymkhana 
The Students’ Gymkhana is a student-led council that organizes events and elections, with roles for the Speaker, 
President, General Secretary, and Vice President. Annual elections occur in February, with intense campaigning leading 
up to voting. 
Leadership: 
 
Speaker: Raj Kumar (RSS2023502) 
 
President: Om Khangat (IIT2021218) 
 
General Secretary: B.T. Manoj Pallakki (IIB2022008) 
 
Vice President: Omkar Vinod Manapure (MML2023007) 
 
UG Council Members: Aditya Singh Tomar (IIT2021208), Ritik Kumar (IIT2021205) 
 
Prayaas 
Prayaas is a student-led volunteer initiative at IIIT-A, focused on educating underprivileged children in the Jhalwa area. 
Beyond teaching academics, it raises awareness on social issues. Volunteers are dedicated to meaningful community 
impact, reflecting students’ commitment to social responsibility. 
 
Scholarships and Bank Loans: 
 
Educational Loans: 
 
IIIT-A students can access loans from banks like SBI, PNB, and Union Bank, covering tuition, hostel fees, 
laptops, etc. 
 
Banks streamline the loan process, present on campus during admission. 
 
Documents needed: proof of admission, fee structure, academic and identity records, and co-applicant income 
proof. 
 
Repayment starts post-course with a 6-12 month grace period, spanning 5-15 years. 
Merit-cum-Means Scholarship: 
 
Eligibility: SGPI CA of 8.5+ (first two semesters), parental income ≤ ₹5 lakh, no other scholarships. 
 
Beneficiaries: 3% of students in each program. 
 
Documents: Declaration, parent income certificate, third-semester fee receipt. 
 
Regional scholarships are also available; check email for updates. 
 
College Fests: 
 
Effervescence (Effe): 
 
Cultural fest with engaging pro-shows and main-stage events like Footloose, A’la Mode, Innovation, and 
Incendiary. 
 
Highlights include "Celebrity Night" with past performances by artists like Benny Dayal and Neha Kakkar , 
KR$NA , Shalmali Kholgade , SANAM Band. 
 
An opportunity for first-year students to interact with seniors and take on responsibilities like hospitality , events 
management etc. 
Aparoksha (APK): 
 
Technical fest with events like Hack in the North, gaming tournaments, and over 45 tech activities, including 
first-year-specific events. 
 
Notable for electronics showcases, keynote speeches, and Humor Night, with comedians like Karunesh Talwar. 
 
A major highlight each March, blending fun with technology for the IIIT-A community. 
 
 Ragging :   
 
In case of any issue regarding to ragging in the campus premises or hostel please contact to chief proctor through 
mail chiefproctor@iiita.ac.in or contact using  
+91- 9450141862  , +91- 9415132196  
 
Exam Pattern :    
   
Quiz 1 + Quiz 2 + internals will carry 35 marks   
Midsem exam will cary 25 marks  
Endsem exam will carry 40 marks  
  
For Academic calender  : visit the AAA site from quick links to access academic calendar and information about holidays in the 
college.  
  
For placement stats  and  past recruiters: view the official college  website - >  https://placement.iiita.ac.in/  
  
Restaurants and Night canteen: 
 
There are various restaurants other than night canteen such as Mukesh ,  sanskar , chills out and kings. 
Chills out contact number = 9871059001 and kings contact number = 9026235310 , these two give free hostel 
delivery. 
 
Campus Directions : 
 
On entering from gate no,2 you will see the rock garden behind which is our AAA building of institute on the 
left of AAA building you will find the main auditorium and director’s residence . behind the AAA building 
there is Lecture theatre . On the left hand you will find CC-3 and on the right of CC-3 is the library of the 
college which is beside lecture theatre . Now this is about the academics buildings of the college. 
On taking right from rock garden on the way you can find basketball court , swimming pool , lawn tennis 
court , IIIT snooker room ,Health centre , Effervescence Head quarters , AMUL canteen , NESCAFE 
canteen and Gupta Canteen which can also be reached through pocket gate (which is in front of BH-
1,2,3,4) . In front of the canteen is the Asmita Headquarters and the main ground of IIITA. On the North-
east of the main ground opposite to the Pavilion  you can find Visitor Hostels and Girl Hostels . 
Additionally , You fill find boards along your way to guide you through your way. 
 
 
Any electrical or technical accessory such as SIM card LAN cables , coolers or any stationery or printout shops is easily 
available on gate no.4 or chauraha from gate no.4. 
 
Health center or medical emergency : You can always reach out to the health center where a doctor will give a check-up and 
you can also take medicines , in case of medical emergency free of cost. 
In case of severe medical condition the health center will arrange a ambulance which will take you to the UNITED HOSPITAL 
for further treatment. 
 
Creators of this chatbot -> Dev Ruhela , Aayush Kanjani`);
    // Ref to store mediaRecorder object

    const BACKEND_URL = import.meta.env.BACKEND_URL;
    const mediaRecorderRef = useRef(null);
  
    const startRecording = async () => {
      setIsRecording(true);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;  // Store mediaRecorder in the ref
  
      const chunks = [];
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };
  
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: "audio/wav" });
        setAudioBlob(audioBlob);
      };
  
      mediaRecorder.start();
    };
  
    const stopRecording = () => {
      const mediaRecorder = mediaRecorderRef.current;
      if (mediaRecorder && mediaRecorder.state !== "inactive") {
        mediaRecorder.stop(); // Stop the recording
      }
      setIsRecording(false);
    };
  
    const sendAudioToBackend = async () => {
      if (!audioBlob) return;
      setGenerating(true)
      const formData = new FormData();
      formData.append("file", audioBlob, "audio.wav");
  
      const response = await fetch("http://localhost:8081/upload-audio/", {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
      if (data.transcription) {
        setGenerating(false)
        setAudioBlob(null)
        setShowTranscription(true)
        setTranscription(data.transcription);
      } else {
        setTranscription("Error: " + data.error);
      }
    };
    const confirmLoggingout = () => {
        setConfirmLogout(true);
    }
    // Save the last 10 searches in localStorage
    const saveSearch = (query) => {
        let searches = JSON.parse(localStorage.getItem("lastSearches")) || [];
        searches.unshift(query);
        if (searches.length > 10) {
            searches.pop();
        }
        localStorage.setItem("lastSearches", JSON.stringify(searches));
    };

    // Retrieve last 10 searches from localStorage
    const getLastSearches = () => {
        return JSON.parse(localStorage.getItem("lastSearches")) || [];
    };

    const clickbutton = async (e) => {
        const userInput = e;
    
        if (userInput.trim()) {
            // Display user message
            setMessages([...messages, { text: userInput, sender: "user" }]);
            setInput("");  // Clear input field
            setLoading(true);  // Show loading animation
            addSearch(input);
    
            // Save the search to localStorage
            saveSearch(userInput);
    
            try {
                // Make the POST request to your backend
                console.log(BACKEND_URL);
                const response = await axios.post(`http://localhost:8000/chat`, {
                    question: userInput,  // Ensure this matches the backend structure
                });
    
                const aiResponse = response.data.answer;
    
                if (aiResponse) {
                    // Add AI response with typing effect
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        { text: "", sender: "ai", typing: true },
                    ]);
                    simulateTypewriterEffect(aiResponse);
                } else {
                    throw new Error("Invalid response structure");
                }
            } catch (error) {
                console.error("Error fetching AI response:", error);
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: "Error fetching AI response. Please try again later.", sender: "ai" },
                ]);
            } finally {
                setLoading(false);
            }
        }
    };
    
    const handleChatSelection = (index) => {
        setActiveChatIndex(index);
        setMessages(chatHistory[index].messages);
    };
    
    const startNewChat = () => {
        const newChat = { messages, timestamp: Date.now() };
        const updatedHistory = [newChat, ...chatHistory];
    
        if (updatedHistory.length > 5) {
            updatedHistory.pop(); // Limit to 5 chats
        }
    
        setChatHistory(updatedHistory);
        setMessages([]);
        setActiveChatIndex(null); // Reset active chat index
        localStorage.setItem("chatHistory", JSON.stringify(updatedHistory));
    };
    

    const handleLogout = () => {
        try {
            signOut();
            setConfirmDelete(false);
            const name = user.email;
            toast.success(name + " is logged out successfully");
        } catch (error) {
            toast.error("could not logout");
        }
    };

    useEffect(() => {
        // Load saved messages and chat history from localStorage
        const savedMessages = JSON.parse(localStorage.getItem("chatMessages")) || [];
        setMessages(savedMessages);

        const savedHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
        const limitedHistory = savedHistory.slice(0, 5); // Truncate to the latest 5 chats
        setChatHistory(limitedHistory);
    }, []);


    // const handleSend = async (e) => {
    //     console.log(BACKEND_URL);
    //     e.preventDefault();
    //     if (input.trim()) {
    //         // Add user message to the chat
    //         setMessages([...messages, { text: input, sender: "user" }]);
    //         addPrompt(input)
    //         setInput("");
    //         setLoading(true);
    //         addSearch(input);
    //         saveSearch(input);
    
    //         try {
    //             // Send the question to the FastAPI backend
    //             const response = await axios.post(`http://localhost:8000/chat`, {  question : input });
                
    //             // Extract the AI's answer from the response
    //             const aiResponse = response.data.answer;
    
    //             if (aiResponse) {
    //                 // Add a typing indicator, then the actual AI response
    //                 addAnswer(aiResponse)
    //                 setMessages((prevMessages) => [
    //                     ...prevMessages,
    //                     { text: "", sender: "ai", typing: true },
    //                 ]);
    //                 simulateTypewriterEffect(aiResponse);
    //             }
    //         } catch (error) {
    //             // Display an error message if there's a problem with the request
    //             setMessages((prevMessages) => [
    //                 ...prevMessages,
    //                 { text: "Error fetching AI response.", sender: "ai" },
    //             ]);
    //         } finally {
    //             setLoading(false);
    //         }
    //     }
    // };

        const handleSend = async (e) => {
        e.preventDefault();

        if (input.trim()) {
            console.log(input)
            setMessages([...messages, { text: input, sender: "user" }]);
            addPrompt(input);
            setInput("");
            setLoading(true);
            addSearch(input);
            saveSearch(input);

            try {
                const aiResponse = await generateAIResponse(input, message);

                if (aiResponse) {
                    console.log(aiResponse)
                    addAnswer(aiResponse);
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        { text: "", sender: "ai", typing: true },
                    ]);
                    simulateTypewriterEffect(aiResponse);
                }
            } catch {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: "Error fetching AI response.", sender: "ai" },
                ]);
            } finally {
                setLoading(false);
            }
        }
    };



    
    const deleteChat = (index) => {
        const updatedHistory = chatHistory.filter((_, i) => i !== index);
        setChatHistory(updatedHistory);
        localStorage.setItem("chatHistory", JSON.stringify(updatedHistory));
    
        if (index === activeChatIndex) {
            setMessages([]);
            setActiveChatIndex(null); // Reset active chat if the current one was deleted
        } else if (index < activeChatIndex) {
            setActiveChatIndex(activeChatIndex - 1); // Adjust index for shifted chats
        }
    };
    useEffect(() => {
        if (activeChatIndex !== null) {
            const updatedHistory = [...chatHistory];
            updatedHistory[activeChatIndex] = { ...updatedHistory[activeChatIndex], messages };
            setChatHistory(updatedHistory);
            localStorage.setItem("chatHistory", JSON.stringify(updatedHistory));
        }
    }, [messages]);
    // Simulate typewriter effect
    const simulateTypewriterEffect = (fullText) => {
        setIscomp(false)
        let currentText = "";
        let index = 0;
        const interval = setInterval(() => {
            if (index < fullText.length) {
                currentText += fullText[index];
                index++;
                setMessages((prevMessages) => {
                    const updatedMessages = [...prevMessages];
                    updatedMessages[updatedMessages.length - 1].text = currentText;
                    setIscomp(true)
                    return updatedMessages;
                });
            } else {
                clearInterval(interval);
                setMessages((prevMessages) => {
                    const updatedMessages = [...prevMessages];
                    updatedMessages[updatedMessages.length - 1].typing = false;
                    setIscomp(true)
                    return updatedMessages;
                });
            }
        }, 12); // Adjust the speed of the typing effect here
        
    };

    const handleSuggestion = async () => {
        if (!input.trim()) {
            return; // Don't send if input is empty
        }
    
        setSuggesting(true); // Show loading state
    
        try {
            // Make a request to the Python backend
            const response = await axios.post("http://localhost:8000/correct-grammar", {
                user_input: input,  // Ensure it matches the backend's expected field name
            });
    
            // Assuming the backend returns "suggested_text"
            const { suggested_text } = response.data;
    
            if (suggested_text) {
                // Set the suggestion received from the backend
                setSuggestion(suggested_text);
                setShowSuggestion(true); // Display the suggestion
            } else {
                throw new Error("No suggestion returned from backend");
            }
        } catch (error) {
            console.error("Error fetching suggestion:", error);
            setSuggestion("Error fetching suggestion, please try again.");
            setShowSuggestion(true);  // Display error message
        } finally {
            setSuggesting(false); // Hide loading state
        }
    };
    const speechToText = async () => {

    }
    // Handle user accepting the suggestion
    const handleAcceptSuggestion = () => {
        // Logic when user accepts the suggestion
        setInput(suggestion)
        console.log("User accepted the suggestion:", suggestion);
        setShowSuggestion(false); // Hide the suggestion after acceptance
    };
    const handleAcceptGeneration = () => {
        // Logic when user accepts the suggestion
        setInput(transcription)
        console.log("User accepted the transcription:", suggestion);
        setShowTranscription(false); // Hide the suggestion after acceptance
    };
    const handleRejectSuggestion = () => {
        // Logic when user rejects the suggestion
        console.log("User rejected the suggestion.");
        setShowTranscription(false); // Hide the suggestion after rejection
    };

    return (
        <>
            <div className="min-h-screen bg-violet-200 dark:bg-gray-900 flex flex-row items-center justify-center ">
                {/* <FloatingShape color="bg-violet-500 dark:bg-violet-700" size="w-64 h-64" top="-5%" left="10%" delay={0} />
                <FloatingShape color="bg-purple-500 dark:bg-purple-700" size="w-48 h-48" top="70%" left="80%" delay={5} />
                <FloatingShape color="bg-blue-500 dark:bg-blue-700" size="w-32 h-32" top="40%" left="-10%" delay={2} /> */}
                {confirmLogout && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="p-4 bg-pink-100 dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-sm"
                    >
                        <h1 className=" text-black dark:text-gray-200 mb-4 text-lg font-semibold">You really want to logout?</h1>
                        <button
                        onClick={handleLogout}
                        className="w-full py-2 px-4 bg-red-600  text-white rounded-2xl shadow-md hover:bg-red-700 "
                        >
                        Yes, Logout !
                        </button>
                        <button
                        onClick={() => setConfirmLogout(false)}
                        className="mt-2 w-full py-2 px-4 text-black dark:text-white"
                        >
                        Cancel
                        </button>
                    </motion.div>
                    </div>
                )}
                <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="relative left-0  w-72 bg-violet-100   dark:bg-gray-800  dark:bg-opacity-90 text-white overflow-y-auto "
    style={{ height:'100vh' }}
>
    {/* Sidebar Header */}
    <div className="flex text-black dark:text-white items-center justify-left ml-4 gap-2 mt-3">
        <Link to="/">
            <img
                src="Chat_IIITA_No_Background.png"
                className="mr-3 h-14 rounded-lg dark:hidden"
                alt="Logo"
            />
            <img
                src="Chat_IIITA_White_Font_Transparent_BG.png"
                className="mr-3 h-14 rounded-lg hidden dark:block"
                alt="Logo"
            />
        </Link>
    </div>
    <div className="p-8 pl-4">
        <div className="flex gap-3 ">
            <h2 className="text-xl font-light pl-1 dark:text-white text-black">New Chat</h2>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-1 bg-gradient-to-t from-blue-500 to-purple-500 flex items-center rounded-full"
                onClick={startNewChat}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus">
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                </svg>
            </motion.button>
        </div>
        {/* Chat History List */}
        <div className="mt-2">
            <ul className="space-y-2">
                {chatHistory.map((chat, index) => (
                    <li key={chat.timestamp || index}>
                        <div className="p-1 px-2 flex justify-between w-full bg-violet-200 text-gray-700 dark:text-white rounded-2xl dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-violet-300"
                            onClick={() => { handleChatSelection }}
                        >
                            <div className="flex flex-col">
                                <span className="text-md font-bold">Chat {chatHistory.length - index}</span>
                                <span className="text-xs">Saved at: {new Date(chat.timestamp).toLocaleString()}</span>
                            </div>
                            <div className="flex gap-2 justify-end pl-10">
                                <motion.button
                                    whileHover={{ scale: 1.06 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => deleteChat(index)}
                                >
                                    <Trash className="h-5 w-5" />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.06 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleChatSelection(chat)}
                                >
                                    <Rocket className="h-5 w-5" />
                                </motion.button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
        <h2 className="text-xl font-light mb-4 mt-4 dark:text-white text-black border-t border-black dark:border-gray-400 pt-3">Important Links</h2>
        <ul className="space-y-1">
            <li>
                <Link
                    target="blank"
                    to="https://placement.iiita.ac.in/"
                    className="flex items-center font-medium text-blue-500 hover:text-blue-600 dark:text-blue-300 p-2 dark:hover:text-blue-400 gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-external-link">
                        <path d="M15 3h6v6" />
                        <path d="M10 14 21 3" />
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    </svg>
                    <span className="font-light">Placement cell</span>
                </Link>
            </li>
            <li>
                <Link
                    target="blank"
                    to="https://erp.iiita.ac.in/"
                    className="flex items-center font-medium text-blue-500 hover:text-blue-600 dark:text-blue-300 p-2 dark:hover:text-blue-400 gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-external-link">
                        <path d="M15 3h6v6" />
                        <path d="M10 14 21 3" />
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    </svg>
                    <span className="font-light">ERP IIITA</span>
                </Link>
            </li>
            <li>
                <Link
                    target="blank"
                    to="https://examcell.iiita.ac.in/"
                    className="flex items-center font-medium text-blue-500 hover:text-blue-600 dark:text-blue-300 p-2 dark:hover:text-blue-400 gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-external-link">
                        <path d="M15 3h6v6" />
                        <path d="M10 14 21 3" />
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    </svg>
                    <span className="font-light">AAA</span>
                </Link>
            </li>
            <li>
                <Link
                    to="https://geekhaven.iiita.ac.in/"
                    className="flex items-center font-medium text-blue-500 hover:text-blue-600 dark:text-blue-300 p-2 dark:hover:text-blue-400 gap-2"
                    target="_blank"
                >
                    <img src="/image.png" className="h-4  w-4"alt="" />

                    <span className="font-light">GeekHaven</span>
                </Link>
            </li>
        </ul>
        <h2 className="text-xl font-light mb-4 mt-4 dark:text-white text-black border-t border-black dark:border-gray-400 pt-3">Notes and PYQs</h2>
        <ul className="space-y-1">
            <li>
                <Link
                    target="blank"
                    to="https://play.google.com/store/apps/details?id=com.garnox.geekhaven"
                    className="flex items-center font-medium text-blue-500 hover:text-blue-600 dark:text-blue-300 p-2 dark:hover:text-blue-400 gap-2"
                >
                   
                    <img className="h-6 w-6 bg-cover rounded-lg " src="/transparent_logo.png" alt="" />
            

                    <span className="font-light" >Sembreaker</span>
                </Link>
            </li>
            {/* <li>
                <Link
                    target="blank"
                    to="https://profile.iiita.ac.in/seemak/Teaching.php"
                    className="flex items-center font-medium text-blue-500 hover:text-blue-600 dark:text-blue-300 p-2 dark:hover:text-blue-400 gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-external-link">
                        <path d="M15 3h6v6" />
                        <path d="M10 14 21 3" />
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    </svg>
                    <span>LAL</span>
                </Link>
            </li> */}
        </ul>
        <ul className="mt-4">
            <li>
                <ThemeBtn />
            </li>
        </ul>
    </div>
    {/* Sidebar Footer */}
    <div className="p-6 border-t flex flex-col  border-gray-700 dark:border-gray-500 gap-3">
        {/* <Link
            to="/dashboard"
            className="flex items-center text-black dark:text-white border-violet-100 space-x-2  dark:hover:bg-gray-700 p-2 rounded-lg  border-2 hover:border-black dark:border-2 dark:border-gray-800 hover:duration-300 dark:hover:duration-300"
                >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span>Profile</span>
        </Link> */}
        <motion.button
            onClick={confirmLoggingout}
            className="w-full h-10 bg-red-500 text-white text-sm
                rounded-lg shadow-2xl hover:bg-red-600  flex flex-row justify-center items-center gap-2"
            >
            Logout
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
        </motion.button>
    </div>
</motion.div>

                <div className="min-h-screen flex flex-col w-full max-w-5xl mx-auto dark:bg-gray-900 p-6 gap-3 "
                style={{maxHeight: "80vh"}}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col flex-grow w-full max-w-6xl mx-auto p-6 dark:bg-gray-900 bg-violet-100  rounded-lg overflow-y-auto space-y-4 mt-10 "
                    style={{ maxHeight: "70vh" }}
                >
                    {messages.length === 0 ? (
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="dark:text-gray-300 text-3xl text-black"
                        >
                            <div className="flex flex-row text-3xl justify-between">
                                <div className="flex flex-col">
                                    <h1 className="text-6xl font-medium bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:bg-gradient-to-r dark:from-blue-600 dark:via-purple-600 dark:to-pink-300 bg-clip-text text-transparent p-3">Hello {user.name},</h1>
                                    <h1 className="text-6xl text-gray-600 dark:text-gray-500 p-3">How can I help you today ?</h1>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></svg>                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 p-3 items-center mt-10">
                            <button 
                                    className="text-left"
                                    onClick={() => clickbutton("What are the various scholarships in IIITA and how to avail them?")}
                                >
                                    <div className="text-lg max-w-52 h-52 bg-violet-200 hover:bg-violet-300  dark:bg-gray-700 dark:hover:bg-gray-800 p-3 rounded-2xl duration-300 shadow-lg">
                                        What are the various scholarships in IIITA and how to avail them?
                                    </div>
                                </button>
                                <button 
                                    className="text-left"
                                    onClick={() => clickbutton("I have lost my Id-card how to proceed further?")}
                                >
                                    <div className="text-lg max-w-52 h-52 bg-violet-200 hover:bg-violet-300 dark:bg-gray-700 dark:hover:bg-gray-800 p-3 rounded-2xl duration-300 shadow-lg">
                                        I have lost my Id-card how to proceed further?
                                    </div>
                                </button>
                                <button 
                                    className="text-left"
                                    onClick={() => clickbutton("I have fees updation issues on ERP whom to contact ?")}
                                >
                                    <div className="text-lg max-w-52 h-52 bg-violet-200 hover:bg-violet-300 dark:bg-gray-700 dark:hover:bg-gray-800 p-3 rounded-2xl duration-300 shadow-lg">
                                    I have fees updation issues on ERP whom to contact?
                                    </div>
                                </button>
                                <button 
                                    className="text-left"
                                    onClick={() => clickbutton("Suggest me some youtube channels for DSA and CP")}
                                >
                                    <div className="text-lg max-w-52 h-52 bg-violet-200 hover:bg-violet-300 dark:bg-gray-700 dark:hover:bg-gray-800 p-3 rounded-2xl duration-300 shadow-lg">
                                     Suggest me some resources for DSA and CP
                                    </div>
                                </button>
                                
                                   
                            </div>
                            
                        </motion.p>
                    ) : (
                        messages.map((message, index) => (
                            <motion.div
    key={index}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.2, delay: index * 0.1 }}
    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
>
<div
    className={`max-w-lg p-4 rounded-3xl  ${
        message.sender === "user"
            ? "bg-gradient-to-r from-white to-white text-black"
            : "bg-violet-600 text-white dark:bg-gray-800  dark:text-white"
    }`}
>
    {/* Only show the SVG if the sender is not the user */}
    {message.sender !== "user" && (
        <Sparkles className="mb-2" />
           
    )}

    {message.sender === "user" ? (
        message.text
    ) : (
        <pre className="whitespace-pre-wrap bg-white bg-clip-text text-transparent"
        style={{ fontFamily:"sans-serif", fontSize: "1.1rem" }}
        >
            {message.text}
        </pre>
    )}
</div>

</motion.div>

                        ))
                    )}
                </motion.div>

                {/* Input Area */}
                <motion.form
                    onSubmit={handleSend}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-5xl mx-auto flex items-center space-x-3 p-2 bg-violet-200 dark:bg-gray-900"
                >
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-grow p-4 text-lg bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-gray-100"
                        placeholder="Give a prompt..."
                    />
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        disabled={loading && !iscomp} // Disable button while loading
                        className="bg-gradient-to-t from-blue-600 to-purple-600 p-3 rounded-full shadow-lg text-white flex items-center justify-center"
                    >
                        {loading ? (
                            <Loader className="w-6 h-6 animate-spin mx-auto" />
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up">
                                <path d="m5 12 7-7 7 7" />
                                <path d="M12 19V5" />
                            </svg>
                        )}
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.07 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        disabled={suggesting || !iscomp} // Disable button while loading or if not complete
                        className="bg-opacity-100 p-3 rounded-full text-black dark:text-white flex items-center justify-center"
                        onClick={handleSuggestion} // Trigger suggestion on click
                    >
                        {suggesting ? (
                            <Loader className="w-6 h-6 animate-spin mx-auto" /> // Show loader when suggesting
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-wand-sparkles">
                                <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72" />
                                <path d="m14 7 3 3" />
                                <path d="M5 6v4" />
                                <path d="M19 14v4" />
                                <path d="M10 2v2" />
                                <path d="M7 8H3" />
                                <path d="M21 16h-4" />
                                <path d="M11 3H9" />
                            </svg>
                        )}
                    </motion.button>
                    <div className="max-w-lg mx-auto p-3 items-center rounded-lg justify center">
                        <div className="flex justify-center gap-6 items-center rounded-full">
                        <motion.button
                        whileHover={{ scale: 1.07 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        disabled={generating}
                        className={`text-lg p-4 bg-gradient-to-t  font-semibold w-fit text-white rounded-full ${isRecording ? "bg-red-500 hover:bg-red-600" : "bg-purple-600 hover:bg-purple-700"}`}
                        onClick={isRecording ? stopRecording : startRecording}
                        >
                        
                        {isRecording && !generating ? <CircleStop className="text-white" /> :<Mic />}
                        </motion.button>
                        {audioBlob && !isRecording && (
                        <button
                            className="py-3 px-3 text-md font-semibold text-white rounded-3xl font-sans bg-gradient-to-r from-purple-600 to-blue-600"
                            onClick={sendAudioToBackend}
                        >
                            {generating ? <Loader className="animate-spin"/> : "Generate text"}
                        </button>
                        )}
                    </div>
                    </div>
                </motion.form>

                {showSuggestion && (
                    <motion.div className="mt-5 p-4 bg-purple-50 bg-opacity-40 text-black dark:bg-gray-700 dark:bg-opacity-40 dark:text-gray-200 rounded-2xl max-w-fit">
                        <p className="text-xl font-semibold mb-4">This is an AI-generated re-phrasing of the text for a faster repsonse :</p>
                        <div className="flex gap-4 mt-2 items-center">
                            <p className="text-md flex gap-2  items-center border-2 border-black dark:border-2 dark:border-gray-300 w-fit p-3 rounded-3xl"><Sparkles className="h-5 w-5" />{suggestion}</p>
                            <div className="flex gap-4 justify-center ">
                                <button
                                    onClick={handleAcceptSuggestion}
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 font-light text-white px-6 py-3 rounded-3xl shadow-lg transform transition-all duration-300 hover:scale-105"
                                >
                                    Re-Phrase the prompt
                                </button>
                            </div>
                        </div>
                        
                    </motion.div>
                )}
                {showTranscription && (
                    <motion.div className="mt-5 p-4 bg-purple-50 bg-opacity-40 text-black dark:bg-gray-700 dark:bg-opacity-40 dark:text-gray-200 rounded-2xl max-w-fit">
                        <p className="text-xl font-semibold mb-4">This is an AI-generated text from your voice input :</p>
                        <div className="flex gap-4 mt-2 items-center">
                            <p className="text-md flex gap-2  items-center border-2 border-black dark:border-2 dark:border-gray-300 w-fit p-3 rounded-3xl"><Sparkles className="h-5 w-5" />{transcription}</p>
                            <div className="flex gap-4 justify-center ">
                                <button
                                    onClick={handleAcceptGeneration}
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 font-light text-white px-6 py-3 rounded-3xl shadow-lg transform transition-all duration-300 hover:scale-105"
                                >
                                    Set the prompt
                                </button>
                            </div>
                        </div>
                        
                    </motion.div>
                )}
                </div> 
            </div>
        </>
    );
};

export default ChatPage;
