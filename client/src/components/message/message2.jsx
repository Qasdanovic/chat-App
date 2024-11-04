function Message2({message}) {
    return (
        <div className="flex justify-end">
            <div className="bg-green-500 text-white p-3 rounded-lg max-w-xs">
            <p>{message}</p>
            </div>
        </div>
    );
}

export default Message2;