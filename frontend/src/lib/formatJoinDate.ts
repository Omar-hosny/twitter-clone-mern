export const formatJoinDate = (createDate: string): string => {
  try {
    const date = new Date(createDate);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return `Joined ${formattedDate}`;
  } catch (error) {
    console.log("error formatting date", error);
    return "joined [date unavailable]";
  }
};
