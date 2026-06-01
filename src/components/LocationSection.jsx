import { MapPin } from "lucide-react";

export default function LocationSection() {
  return (
    <section className="bg-gray-50 py-12 px-6">
      
      {/* TITLE */}
      <h2 className="text-2xl font-semibold mb-6">
        Location
      </h2>

      {/* ADDRESS */}
      <div className="flex items-start gap-3 mb-6">
        
        {/* ICON */}
        <div className="bg-blue-100 p-2 rounded-full">
          <MapPin className="text-blue-600 w-5 h-5" />
        </div>

        {/* TEXT */}
        <div>
          <h3 className="font-semibold text-lg">
            Beltarodi nagpur
          </h3>
          <p className="text-gray-500 text-sm">
            Beltarodi nagpur, Nagpur, Maharashtra, 440015
          </p>
        </div>
      </div>

      {/* MAP CONTAINER */}
      <div className="relative rounded-2xl overflow-hidden shadow-md">
        
        {/* GOOGLE MAP */}
        <iframe
          title="map"
          src="https://www.google.com/maps?q=Beltarodi%20Nagpur&output=embed"
          className="w-full h-[300px] md:h-[400px] border-0"
          loading="lazy"
        ></iframe>

        {/* INFO BOX OVERLAY */}
        <div className="absolute top-4 left-4 bg-white p-3 rounded-xl shadow-lg">
          
          <p className="font-semibold text-sm">
            Beltarodi nagpur
          </p>

          <div className="flex gap-4 mt-2 text-blue-600 text-sm">
            
            <a
              href="https://www.google.com/maps?q=Beltarodi%20Nagpur"
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              View on Google Maps
            </a>

            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Beltarodi%20Nagpur"
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              Directions
            </a>

          </div>
        </div>
      </div>
    </section>
  );
}