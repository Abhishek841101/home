export default function MapView({ location }) {
  return (
    <iframe
      title="map"
      width="100%"
      height="100%"
      className="border-0 rounded-r-2xl"
      loading="lazy"
      src={`https://www.google.com/maps?q=${location}&output=embed`}
    ></iframe>
  );
}
