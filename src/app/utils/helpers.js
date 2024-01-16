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

export const formatDate = (dt_string) => {
  let dt_object = new Date(dt_string);

  let month_names = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let short_month_name = month_names[dt_object.getUTCMonth()];

  let formatted_date =
    dt_object.getUTCFullYear() +
    "-" +
    short_month_name +
    "-" +
    String(dt_object.getUTCDate()).padStart(2, "0");

  return formatted_date;
};
