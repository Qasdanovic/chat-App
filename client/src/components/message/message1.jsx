function Message1({message}) {
    return (
        <div className="flex justify-start">
            <div className="bg-blue-500 text-white p-3 rounded-lg max-w-xs">
            <p>{message}</p>
            </div>
        </div>
       );
}

export default Message1;