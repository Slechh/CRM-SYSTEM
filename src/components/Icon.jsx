export const Icon = ({ id, className = "", ...rest }) => {
  return (
    <svg className={className} {...rest}>
      <use href={`/sprite.svg#${id}`}></use>
    </svg>
  );
};
