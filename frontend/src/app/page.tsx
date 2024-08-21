import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-4 sm:p-8 md:p-20">
            <div className="flex items-center flex-wrap">
                <div className="flex flex-col w-full md:w-1/2 mb-8 md:mb-0">
                    <h1 className="text-6xl font-bold mb-4">
                        Your Dining Experience Starts Here!
                    </h1>
                    <p className="text-xl mb-8">
                        Connect with top restaurants, find your perfect dining
                        spot, and make reservations easily.
                    </p>
                    <Link
                        href="/restaurants"
                        className="bg-blue-500 text-white px-6 py-3 rounded-full text-xl w-1/3 text-center"
                    >
                        Book Now
                    </Link>
                </div>
                <div className="w-full md:w-1/2 md:pl-8 lg:pl-20">
                    <div className="bg-blue-200 h-80 rounded-3xl flex align-middle justify-center">
                        <Image
                            src="/images/banner.png"
                            width={0}
                            height={0}
                            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 100vw, 50vw"
                            className="w-auto h-auto max-h-full"
                            alt="banner"
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}
