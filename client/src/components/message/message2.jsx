function Message2({message, createdAt}) {
    const time = new Date(createdAt).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true 
    });

    const date = new Date(createdAt).toLocaleDateString([], {
        year: '2-digit',
        month: 'numeric',
        day: 'numeric'
    });
    return (
        <div className="flex justify-end gap-3">
            <span className="text-sm text-gray-400 mb-3 self-end">
                sent on {date} at {time}
            </span>
            <div className="bg-green-500 text-white p-3 rounded-lg max-w-xs">
            <p>{message}</p>
            </div>
        </div>
    );
}

export default Message2;