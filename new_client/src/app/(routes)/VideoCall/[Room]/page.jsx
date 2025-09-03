'use client';

import { use, useEffect, useRef, useState } from 'react';
import { useRouter ,useParams} from 'next/navigation';
import { io } from 'socket.io-client';
import { useUserContext } from '@/app/context/Userinfo';
import { motion } from 'framer-motion';
import { Mic, MicOff, Video, VideoOff, Phone, Users, Settings, Share2, Code } from 'lucide-react';
import LearningCodeEditor from '@/components/editor/LearningCodeEditor';

// Video call loading skeleton
const VideoCallSkeleton = () => (
  <div className="min-h-screen bg-neutral-950 text-white relative overflow-hidden">
    {/* Header skeleton */}
    <div className="absolute top-0 left-0 right-0 z-20 bg-black/60 backdrop-blur-md p-3 border-b border-neutral-800/60">
      <div className="container mx-auto flex items-center justify-between">
        <div className="h-8 w-32 bg-neutral-800/70 animate-pulse rounded-lg"></div>
        <div className="flex space-x-2">
          <div className="h-8 w-8 bg-neutral-800/70 animate-pulse rounded-lg"></div>
          <div className="h-8 w-8 bg-neutral-800/70 animate-pulse rounded-lg"></div>
        </div>
      </div>
    </div>

    <div className="flex flex-col md:flex-row h-screen pt-14">
      {/* Main video area skeleton */}
      <div className="flex-1 p-4 md:p-6 relative">
        <div className="w-full h-[calc(100vh-7rem)] rounded-xl bg-neutral-900/60 border border-neutral-800/60 animate-pulse flex items-center justify-center">
          <div className="h-12 w-12 md:h-16 md:w-16 rounded-full bg-neutral-800/80 flex items-center justify-center">
            <div className="h-6 w-6 md:h-8 md:w-8 border-2 md:border-3 border-neutral-700 border-t-neutral-500 rounded-full animate-spin"></div>
          </div>
        </div>
        
        {/* Controls skeleton */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex items-center justify-center space-x-3 md:space-x-4">
          <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-neutral-800/80 animate-pulse"></div>
          <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-neutral-800/80 animate-pulse"></div>
          <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-red-800/50 animate-pulse"></div>
          <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-neutral-800/80 animate-pulse"></div>
          <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-neutral-800/80 animate-pulse"></div>
        </div>
      </div>
      
      {/* Sidebar skeleton (participants) */}
      <div className="hidden md:block md:w-80 lg:w-96 bg-neutral-900/40 border-l border-neutral-800/60 p-4">
        <div className="h-8 w-32 bg-neutral-800/70 animate-pulse rounded-lg mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-neutral-800/40 border border-neutral-700/30 rounded-lg p-3 animate-pulse">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-neutral-700/60 mr-3"></div>
                <div className="flex-1">
                  <div className="h-4 w-24 bg-neutral-700/60 rounded mb-2"></div>
                  <div className="h-3 w-16 bg-neutral-700/40 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const page = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [isNameEntered, setIsNameEntered] = useState(false);
  const [socket, setSocket] = useState(null);
  const [users, setUsers] = useState([]);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null);
  const { contextisLoggedIn, contextname } = useUserContext();
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const editorRef = useRef(null);
  const params = useParams();
  const room = params.Room;
  const [isLoading, setIsLoading] = useState(true);

  // Automatically set name from context when logged in
  useEffect(() => {
    if (contextisLoggedIn && contextname && !isNameEntered) {
      setName(contextname);
      setIsNameEntered(true);
    }
  }, [contextisLoggedIn, contextname, isNameEntered]);

  useEffect(() => {
    // Simulate loading delay to ensure UI elements are ready
    const timer = setTimeout(() => {
      if (isNameEntered && room && name) {
        setIsLoading(false);
      }
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [isNameEntered, room, name]);

  useEffect(() => {
    console.log("Sab issues ki jad",name,room)

  }, [room]);
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, [isEditorOpen]);

  useEffect(() => {
    if (isNameEntered&&room&&name) {
      const initSocket = io('https://template-videocall-server.onrender.com'); // Use the Render URL
      setSocket(initSocket);

      // Emit join room with more explicit user info
      initSocket.emit('joinRoom', {
        room,
        user: {
          name: name,
          id: initSocket.id
        }
      });

      // Handle user joining
      initSocket.on('userJoined', ({ user }) => {
        if (user) {
          setUsers((prevUsers) => {
            // Prevent duplicate users
            const isUserExists = prevUsers.some(u => u.name === user.name);
            return isUserExists ? prevUsers : [...prevUsers, user];
          });
        }
      });

      // Initialize room users
      initSocket.on('roomUsers', ({ users: roomUsers }) => {
        if (roomUsers && Array.isArray(roomUsers)) {
          setUsers(roomUsers.map(user => ({
            name: user.name,
            id: user.id
          })));
        }
      });

      initSocket.on('offer', async (offer) => {
        if (peerConnection.current) {
          await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));
          const answer = await peerConnection.current.createAnswer();
          await peerConnection.current.setLocalDescription(answer);
          initSocket.emit('answer', {
            answer: peerConnection.current.localDescription,
            room,
            user: {
              name: name,
              id: initSocket.id
            }
          });
        }
      });

      initSocket.on('answer', async (answer) => {
        if (peerConnection.current) {
          await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
        }
      });

      initSocket.on('ice-candidate', (candidate) => {
        if (peerConnection.current) {
          peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
        }
      });

      initSocket.on('callEnded', () => {
        endCall();
      });

      return () => {
        initSocket.disconnect();
      };
    }
  }, [isNameEntered, room, name]);

  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [screenStream, setScreenStream] = useState(null);
  const screenVideoRef = useRef(null);

  const startCall = async () => {
    const configuration = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:global.stun.twilio.com:3478' },
        {
          urls: 'turn:global.turn.twilio.com:3478?transport=udp',
          username: 'your_twilio_username',
          credential: 'your_twilio_password'
        }
      ]
      
    };

    peerConnection.current = new RTCPeerConnection(configuration);

    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit('ice-candidate', {
          candidate: event.candidate,
          room,
          user: {
            name: name,
            id: socket.id
          }
        });
      }
    };

    peerConnection.current.ontrack = (event) => {
      if (event.track.kind === 'video' && event.streams[0].id.includes('screen')) {
        if (screenVideoRef.current) {
          screenVideoRef.current.srcObject = event.streams[0];
        }
      } else {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      }
    };

    const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localStream.getTracks().forEach((track) => {
      peerConnection.current.addTrack(track, localStream);
    });

    localVideoRef.current.srcObject = localStream;

    const offer = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(offer);

    socket.emit('offer', {
      offer,
      room,
      user: {
        name: name,
        id: socket.id
      }
    });
  };

  const endCall = () => {
    if (peerConnection.current) {
      peerConnection.current.close();
      peerConnection.current = null;
    }

    if (localVideoRef.current.srcObject) {
      localVideoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      localVideoRef.current.srcObject = null;
    }

    if (remoteVideoRef.current.srcObject) {
      remoteVideoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      remoteVideoRef.current.srcObject = null;
    }

    if (socket) {
      socket.emit('endCall', {
        room,
        user: {
          name: name,
          id: socket.id
        }
      });
      socket.disconnect();
    }

    if (screenStream) {
      screenStream.getTracks().forEach(track => track.stop());
      setScreenStream(null);
      setIsScreenSharing(false);
    }

    router.push('/UserInfo');
  };

  const toggleScreenShare = async () => {
    try {
      if (!isScreenSharing) {
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true
        });

        stream.getVideoTracks()[0].onended = () => {
          stopScreenSharing();
        };

        setScreenStream(stream);
        setIsScreenSharing(true);

        stream.getTracks().forEach((track) => {
          peerConnection.current.addTrack(track, stream);
        });

        const offer = await peerConnection.current.createOffer();
        await peerConnection.current.setLocalDescription(offer);

        socket.emit('offer', {
          offer,
          room,
          user: {
            name: name,
            id: socket.id
          },
          isScreenShare: true
        });

        if (screenVideoRef.current) {
          screenVideoRef.current.srcObject = stream;
        }
      } else {
        stopScreenSharing();
      }
    } catch (err) {
      console.error('Error sharing screen:', err);
      if (err.name === 'NotAllowedError') {
        console.log('Screen sharing permission denied');
      }
      setIsScreenSharing(false);
    }
  };

  const stopScreenSharing = () => {
    if (screenStream) {
      screenStream.getTracks().forEach(track => {
        track.stop();
        const sender = peerConnection.current?.getSenders().find(s => s.track === track);
        if (sender) {
          peerConnection.current.removeTrack(sender);
        }
      });
      setScreenStream(null);
    }
    if (screenVideoRef.current) {
      screenVideoRef.current.srcObject = null;
    }
    setIsScreenSharing(false);
  };

  const toggleVideo = () => {
    if (localVideoRef.current?.srcObject) {
      const videoTracks = localVideoRef.current.srcObject.getVideoTracks();
      videoTracks.forEach(track => {
        track.enabled = isVideoOff;
        socket.emit('videoStateChange', {
          room,
          isVideoOff: !isVideoOff,
          user: {
            name: name,
            id: socket.id
          }
        });
      });
      setIsVideoOff(!isVideoOff);
    }
  };

  // Automatically start call when logged in
  useEffect(() => {
    if (contextisLoggedIn && socket) {
      startCall();
    }
  }, [contextisLoggedIn, socket]);

  // Add socket listener for remote video state change
  useEffect(() => {
    if (socket) {
      socket.on('videoStateChange', ({ isVideoOff, user }) => {
      });
    }
  }, [socket]);

  // Add cleanup on component unmount
  useEffect(() => {
    return () => {
      if (peerConnection.current) {
        peerConnection.current.close();
        peerConnection.current = null;
      }

      [localVideoRef, remoteVideoRef, screenVideoRef].forEach(ref => {
        if (ref.current?.srcObject) {
          ref.current.srcObject.getTracks().forEach(track => track.stop());
          ref.current.srcObject = null;
        }
      });

      if (screenStream) {
        screenStream.getTracks().forEach(track => track.stop());
      }

      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  if (isLoading) {
    return <VideoCallSkeleton />;
  }

  return (
    contextisLoggedIn ? (
      <div className="min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900 text-neutral-100 p-2 sm:p-4 md:p-6 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/80 to-neutral-900/80 backdrop-blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto space-y-4">
          {/* Room Info & Participants */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Room: {room}</h2>
                <p className="text-neutral-400 text-xs">{users.length} participants</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 flex-wrap"
            >
              {users.map((user, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="h-8 w-8 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center">
                    <span className="text-sm font-semibold">{user.name?.[0]?.toUpperCase()}</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-green-500 border-2 border-neutral-900" />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Main Content Area */}
          <div className="relative h-[calc(100vh-180px)] flex">
            {/* Code Editor (Left Side when open) */}
            {isEditorOpen && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="w-[60%] h-full bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800"
              >
                <div className="h-full">
                  <LearningCodeEditor
                    socket={socket}
                    room={room}
                    user={{ name, id: socket?.id }}
                    isOpen={true}
                    onClose={() => setIsEditorOpen(false)}
                    editorRef={editorRef}
                  />
                </div>
              </motion.div>
            )}

            {/* Video Content (Right Side) */}
            <motion.div
              className={`${isEditorOpen ? 'w-[40%]' : 'w-full'} h-full relative transition-all duration-300`}
            >
              {/* Screen share view (when active) */}
              {isScreenSharing && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 rounded-xl overflow-hidden"
                >
                  <video
                    ref={screenVideoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain bg-neutral-900"
                  />
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center gap-2 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full border border-neutral-800">
                      <Share2 className="w-4 h-4 text-cyan-500" />
                      <span className="text-xs">Screen Share</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Main video view */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`absolute ${isScreenSharing ? 'bottom-4 right-4 w-1/4 max-w-[240px] min-w-[160px]' : 'inset-0'} rounded-xl overflow-hidden transition-all duration-300`}
              >
                <video
                  ref={remoteVideoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover bg-neutral-900"
                />
                {users.length > 0 && (
                  <div className="absolute bottom-4 left-4">
                    <div className="flex items-center gap-2 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full border border-neutral-800">
                      <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                      <span className="text-xs">{users[0]?.name || 'Remote Participant'}</span>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Picture-in-picture (local user) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className={`absolute top-4 right-4 ${isScreenSharing ? 'w-1/5 max-w-[180px]' : 'w-1/4 max-w-[240px]'} min-w-[160px] aspect-video rounded-lg overflow-hidden shadow-lg border border-neutral-800 transition-all duration-300`}
              >
                <video
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover bg-neutral-800"
                />
                <div className="absolute bottom-2 left-2">
                  <div className="flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full text-[10px]">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                    <span>You</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Control Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed z-20 w-full flex justify-center items-center"
          >
            <div className="flex items-center justify-center gap-2 sm:gap-3 bg-neutral-900/90 backdrop-blur-xl p-2 rounded-xl border border-neutral-800 shadow-xl mx-4 sm:mx-0">
              {/* Mute button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 sm:p-3 rounded-full transition-colors ${
                  isMuted
                    ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30'
                    : 'bg-neutral-800 hover:bg-neutral-700'
                }`}
                onClick={() => {
                  setIsMuted(!isMuted);
                  if (localVideoRef.current?.srcObject) {
                    localVideoRef.current.srcObject.getAudioTracks().forEach(track => {
                      track.enabled = isMuted;
                    });
                  }
                }}
              >
                {isMuted ? <MicOff className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-200" /> : <Mic className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-200" />}
              </motion.button>

              {/* Video off button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 sm:p-3 rounded-full transition-colors ${
                  isVideoOff
                    ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30'
                    : 'bg-neutral-800 hover:bg-neutral-700'
                }`}
                onClick={toggleVideo}
              >
                {isVideoOff ? <VideoOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Video className="w-4 h-4 sm:w-5 sm:h-5" />}
              </motion.button>

              {/* Share screen button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 sm:p-3 rounded-full transition-colors ${
                  isScreenSharing
                    ? 'bg-cyan-500/20 text-cyan-500 hover:bg-cyan-500/30 border border-cyan-500/50'
                    : 'bg-neutral-800 hover:bg-neutral-700'
                }`}
                onClick={toggleScreenShare}
              >
                <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>

              {/* Code Editor button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 sm:p-3 rounded-full transition-colors ${
                  isEditorOpen
                    ? 'bg-cyan-500/20 text-cyan-500 hover:bg-cyan-500/30 border border-cyan-500/50'
                    : 'bg-neutral-800 hover:bg-neutral-700'
                }`}
                onClick={() => setIsEditorOpen(!isEditorOpen)}
              >
                <Code className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>
              {/* End call button */}
              <motion.button
                onClick={endCall}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 sm:p-3 rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-500 border border-red-500/50 transition-colors"
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    ) : (
      <div className="min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-xl p-6 text-center max-w-lg w-full"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-cyan-500/10 rounded-xl" />
          <div className="relative z-10">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 mx-auto mb-4 flex items-center justify-center">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent mb-3">
              Please Login First
            </h1>
            <p className="text-neutral-400 text-sm mb-6">
              You need to be logged in to join this video call
            </p>
            <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
          </div>
        </motion.div>
      </div>
    )
  );
};

export default page;
