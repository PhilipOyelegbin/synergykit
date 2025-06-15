interface MessageProps {
  message: string;
}

export function ErrorToast({ message }: MessageProps) {
  return (
    <div className="shadow shadow-rose-500 text-rose-500 bg-[#f9fafb] opacity-80 p-5 w-fit rounded-2xl fixed right-5 top-10 z-50 transition-opacity duration-300">
      <p>{message}</p>
    </div>
  );
}

export function SuccessToast({ message }: MessageProps) {
  return (
    <div className="shadow shadow-lime-500 text-lime-500 bg-[#f9fafb] opacity-80 p-5 w-fit rounded-2xl absolute right-5 top-10 z-50 transition-opacity duration-300">
      <p>{message}</p>
    </div>
  );
}
