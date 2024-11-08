// import '../../images'

import { useEffect, useState } from "react";

function Person({name, profile, lastMessage}) {
  const [prfl, setPrfl] = useState('')
  useEffect(() => {
    const filePath = `/images/${profile}`;
    const fileName = filePath.split("\\").pop();
    setPrfl(`/images/${fileName}`)
  }, [prfl])
    return (
        <div className="flex items-center ml-3 space-x-2 p-2">
          {/* User's profile picture */}
          <img
            src={prfl}
            alt="User Profile"
            className="w-10 h-10 rounded-full"
          />
    
          {/* Message content */}
          <div className="w-100">
            <p className="font-semibold text-gray-900">{name}</p>
            <p className="text-gray-500 text-sm">
              {lastMessage}
            </p>
          </div>
        </div>
      );
}

export default Person;