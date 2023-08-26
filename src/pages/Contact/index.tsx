import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";
import { LatLngExpression } from "leaflet";
function Contact() {
  // Ajah Lagos Nigeria geoCords do not edit.
  const position = [6.472516, 3.568616];
  return (
    <div className="max-w-full min-h-[600px]  grid place-items-center lg:grid-cols-2 lg:gap-[10%] pt-16">
      <div className="w-full h-[600px] relative group">
        <MapContainer
          center={position as LatLngExpression}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "600px", width: "100%", zIndex: 1 }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position as LatLngExpression}>
            <Popup>Ajah, lagos, Nigeria.</Popup>
          </Marker>
        </MapContainer>
        <div className="h-full w-full absolute top-0 group-hover:opacity-0 group-hover:scale-50 transition-all duration-300 ease-in  bg-[rgba(0,0,0,0.44)] z-[2]"></div>
      </div>
      <div className="space-y-6 pl-4 my-7 lg:my-0">
        <h1 className="text-4xl">Want to Find us?</h1>
        <p className="w-[70%] text-gray-500 font-light break-words">
          Welcome to the contact page of SmStore, your go-to destination for
          all your online shopping needs. We value your feedback, questions, and
          concerns, and we are here to assist you in every possible way. Please
          don't hesitate to get in touch with us using the provided contact
          information or by visiting our store location.
        </p>
        <div>
          <p className="w-[80%] flex space-x-3">
            {" "}
            <span>Address:</span>
            <span className=" text-gray-500 font-medium">
              Ajah, Lagos, Nigeria.
            </span>
          </p>
          <p className="w-[80%] flex space-x-5">
            {" "}
            <span>Phone:</span>{" "}
            <span className="text-gray-500 font-medium">+234719825510</span>
          </p>
        </div>
        <Link
          to={"#"}
          className="hover:text-[#0808de] text-gray-500 mt-12  text-center "
        >
          info@smstore.com
        </Link>
      </div>
    </div>
  );
}

export default Contact;
