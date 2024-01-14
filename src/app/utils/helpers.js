export const timeDifference = (date) => {
  var current = new Date();
  var previous = new Date(date);

  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = current - previous;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + " seconds ago";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + " minutes ago";
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + " hours ago";
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + " days ago";
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + " months ago";
  } else {
    return Math.round(elapsed / msPerYear) + " years ago";
  }
};

export const avaterName = (name = "") => {
  let words = name.split(" ");
  let user = words.map((word) => word[0].toUpperCase()).join("");
  return user;
};

export const checkListProgress = (items) => {
  const filter = items?.filter((item) => item?.is_completed);
  const progress = (Number(filter?.length) * 100) / Number(items?.length);
  return progress;
};
