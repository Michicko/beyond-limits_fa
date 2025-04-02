const icons = [
  {
    name: "sun",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="200"
        height="200"
        viewBox="0 0 26 26"
      >
        <path
          fill="currentColor"
          d="M12.906-.031a1 1 0 0 0-.125.031A1 1 0 0 0 12 1v3a1 1 0 1 0 2 0V1a1 1 0 0 0-1.094-1.031zM6.844 1.594a1 1 0 0 0-.719 1.5l1.5 2.625a1.008 1.008 0 0 0 1.75-1l-1.5-2.625a1 1 0 0 0-1.031-.5zm11.968 0a1 1 0 0 0-.687.5l-1.5 2.625a1.008 1.008 0 0 0 1.75 1l1.5-2.625a1 1 0 0 0-.969-1.5a1 1 0 0 0-.093 0zm4.532 4.375A1 1 0 0 0 23.25 6a1 1 0 0 0-.344.125l-2.625 1.5a1.008 1.008 0 0 0 1 1.75l2.625-1.5a1 1 0 0 0-.562-1.906zM2.437 6a1 1 0 0 0-.343 1.875l2.625 1.5a1.008 1.008 0 0 0 1-1.75l-2.625-1.5A1 1 0 0 0 2.438 6zM13 6a7 7 0 1 0 0 14a7 7 0 0 0 0-14zm0 2c2.757 0 5 2.243 5 5s-2.243 5-5 5s-5-2.243-5-5s2.243-5 5-5zM.719 12A1.004 1.004 0 0 0 1 14h3a1 1 0 1 0 0-2H1a1 1 0 0 0-.094 0a1.001 1.001 0 0 0-.094 0a1.004 1.004 0 0 0-.093 0zm21 0A1.004 1.004 0 0 0 22 14h3a1 1 0 1 0 0-2h-3a1 1 0 0 0-.094 0a1.001 1.001 0 0 0-.093 0a1.004 1.004 0 0 0-.094 0zM5.156 16.469a1 1 0 0 0-.093.031a1 1 0 0 0-.344.125l-2.625 1.5a1.008 1.008 0 0 0 1 1.75l2.625-1.5a1 1 0 0 0-.563-1.906zm15.469.031a1 1 0 0 0-.344 1.875l2.625 1.5a1.008 1.008 0 0 0 1-1.75l-2.625-1.5a1 1 0 0 0-.656-.125zM8.312 19.781a1 1 0 0 0-.687.5l-1.5 2.625a1.008 1.008 0 0 0 1.75 1l1.5-2.625a1 1 0 0 0-.969-1.5a1 1 0 0 0-.094 0zm9.032 0a1 1 0 0 0-.719 1.5l1.5 2.625a1.008 1.008 0 0 0 1.75-1l-1.5-2.625a1 1 0 0 0-1.031-.5zm-4.438 1.188a1 1 0 0 0-.125.031A1 1 0 0 0 12 22v3a1 1 0 1 0 2 0v-3a1 1 0 0 0-1.094-1.031z"
        />
      </svg>
    ),
  },
  {
    name: "moon",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="200"
        height="200"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M21.64 13a1 1 0 0 0-1.05-.14a8.05 8.05 0 0 1-3.37.73a8.15 8.15 0 0 1-8.14-8.1a8.59 8.59 0 0 1 .25-2A1 1 0 0 0 8 2.36a10.14 10.14 0 1 0 14 11.69a1 1 0 0 0-.36-1.05Zm-9.5 6.69A8.14 8.14 0 0 1 7.08 5.22v.27a10.15 10.15 0 0 0 10.14 10.14a9.79 9.79 0 0 0 2.1-.22a8.11 8.11 0 0 1-7.18 4.32Z"
        />
      </svg>
    ),
  },
];

export const getIcon = (iconName: string) => {
  const icon = icons.find((el) => el.name === iconName)?.icon;
  return icon || <span>{iconName}</span>;
};

export default icons;
