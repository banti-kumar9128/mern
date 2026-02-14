import React, { useContext } from "react";
import { AppContext } from "../context/AppContex";

const MenuCard = ({ menu }) => {
    const {navigate} = useContext(AppContext)
  return (
   <div lassName=" bg-gradient-to-r from-[#52cdd4] to-indigo-600 p-2   rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group">
    <div onClick={()=>navigate(`/menu-details/${menu._id}`)}
        className="relative h-56 overflow-hidden cursor-pointer bg-linear-to-r from-[#52cdd4] to-indigo-600 p-2 rounded-md"
        >
          <img
          src={menu.image}
          alt={menu.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {/* Availability Badge */}
          {!menu.isAvailable && (
            <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Unavailable
            </div>
          )}
        </div>  


    </div>

    <div className="p-5 ">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
          {menu.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {menu.description}
        </p>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between mt-4">
          <div>
            <p className="text-2xl font-bold text-gray-900">${menu.price}</p>
          </div>
      </div>
      </div>
   </div>
  );
};

export default MenuCard;

