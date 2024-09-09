import Gallery from '../../components/Gallery';

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-200 p-8">
      <div className="w-[90vw] h-[90vh] mx-auto">
        <Gallery />
      </div>
    </main>
  );
}
