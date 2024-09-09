import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-200 p-8">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Message 1</h2>
          <p>I love you gen</p>
        </div>

        <div className="relative h-64 rounded-lg overflow-hidden shadow-md">
          <Image
            src="/images/image1.jpg"  // Change to .jpg if using JPG
            alt="Love Image 1"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Message 2</h2>
          <p>I love you gen</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Message 3</h2>
          <p>I love you gen</p>
        </div>

        <div className="relative h-64 rounded-lg overflow-hidden shadow-md">
          <Image
            src="/images/image2.jpg"  // Change to .jpg if using JPG
            alt="Love Image 2"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Message 4</h2>
          <p>I love you gen</p>
        </div>
      </div>
    </main>
  );
}
