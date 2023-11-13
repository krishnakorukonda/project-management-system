export const FormInputSelect = (props: any) => {
  return (
    <div className="md:flex md:items-center mb-6">
      <div className="md:w-1/3">
        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
          {props.label}
        </label>
      </div>
      <div className="md:w-2/3">
        <select
          id={props.propName}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => props.handleChange(e)}
          value={props.value}
        >
          {props.values.map((dropdownEntry: any) => (
            <option key={dropdownEntry.id} value={dropdownEntry.id}>
              {dropdownEntry[props.propName]}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
