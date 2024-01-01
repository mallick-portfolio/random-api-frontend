import React from "react";

const InputField = ({
  handleChange,
  value,
  label,
  errorName,
  errorTouched,
  type,
  name,
}) => {
  console.log(value);
  return (
    <div className="mb-5">
      <label
        htmlFor="email"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        name={name}
        onChange={handleChange}
        value={value}
        type={type ? type : "text"}
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        placeholder="example@gmail.com"
      />
      {errorName && errorTouched && (
        <p class="mt-2 text-sm text-red-600 dark:text-red-500">
          <span class="font-medium">{errorName}</span>
        </p>
      )}
    </div>
  );
};

export default InputField;
