
const getProgressGradient = (progress: number) => {
    if (progress < 30) {
      return 'from-blue-500 to-purple-500'; 
    } else {
      return 'from-fuchsia-500 to-pink-500';
    }
  };

  export default getProgressGradient;