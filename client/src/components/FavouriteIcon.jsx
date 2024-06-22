import React from "react";
import { IoHeartOutline } from "react-icons/io5";
import { IoHeart } from "react-icons/io5";

const FavouriteIcon = ({
  _id,
  onAddToFavouriteClicked,
  onRemoveFromFavouriteClicked,
  favouriteArray,
  pos,
  className,
  children,
}) => {
  const isFavourite = (_id) => {
    return favouriteArray?.includes(_id);
  };
  return (
    <>
      <span
        className={`absolute flex space-x-2 items-center text-lg text-brand-primary bg-brand-third rounded-full p-2 cursor-pointer ${pos} ${className}`}
      >
        {!isFavourite(_id) ? (
          <IoHeartOutline
          className="text-3xl"
            onClick={(e) => {
              onAddToFavouriteClicked(_id);
              e.stopPropagation();
            }}
          />
        ) : (
          <IoHeart
          className="text-3xl"
            onClick={(e) => {
              onRemoveFromFavouriteClicked(_id);
              e.stopPropagation();
            }}
          />
        )}
        {children}
      </span>
    </>
  );
};

export default FavouriteIcon;
