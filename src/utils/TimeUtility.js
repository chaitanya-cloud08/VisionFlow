
export const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
};
  
  export const getGreeting = () => {
    const now = new Date();
    const hours = now.getHours();
    const day = now.toLocaleString("default", { weekday: "long" });
  
    const greetings = {
        Monday: {
          morning: "Happy Monday! Start your week with energy!",
          afternoon: "Keep the Monday momentum going!",
          evening: "Relax, it's Monday evening!",
        },
        Tuesday: {
          morning: "Good Morning! It's a productive Tuesday!",
          afternoon: "Keep up the great work this Tuesday afternoon!",
          evening: "Unwind and enjoy your Tuesday evening!",
        },
        Wednesday: {
          morning: "Good Morning! You're halfway through the week!",
          afternoon: "Make the most of this Wednesday afternoon!",
          evening: "Good Evening! The weekend is in sight!",
        },
        Thursday: {
          morning: "Good Morning! It's a thriving Thursday!",
          afternoon: "Almost there! Keep pushing this Thursday!",
          evening: "Thursday evening vibes are here!",
        },
        Friday: {
          morning: "Good Morning! Happy Friday!",
          afternoon: "Wrap up strong this Friday afternoon!",
          evening: "It's Friday night! Time to celebrate!",
        },
        Saturday: {
          morning: "Happy Saturday Morning! Enjoy your weekend!",
          afternoon: "Relax and recharge this Saturday afternoon!",
          evening: "Saturday night fun is here!",
        },
        Sunday: {
          morning: "Good Morning! Have a peaceful Sunday!",
          afternoon: "A lazy Sunday afternoon sounds perfect!",
          evening: "Prepare for the week ahead on this Sunday evening!",
        },
      };
      const timeOfDay =
        hours < 12 ? "morning" : hours < 18 ? "afternoon" : "evening";
      return greetings[day][timeOfDay];
  };
  