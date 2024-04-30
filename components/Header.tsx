import Image from "next/image";

export const Header = () => {
  return (
    <header className="w-full border-b  mx-auto py-2 dark:border-gray-700 flex ">
      <div className="container w-full flex items-left justify-between align-center py-2 px-6">
        <Image
          className="w-auto h-12 text-black rounded-full p-x4 dark:text-white"
          src="/images/logo.png"
          alt="test"
          width={100}
          height={100}
        />
      </div>
    </header>
  );
};
