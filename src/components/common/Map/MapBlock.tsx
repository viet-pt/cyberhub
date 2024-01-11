import { API_KEY } from "api/_config";
import React, { useEffect, useRef, useState } from "react";

const MapContainer = () => {
  const [listMarker, setListMarker] = useState([]);

  if (!listMarker?.length) return null;
  return <MapBlock listMarker={listMarker} />;
};

const MapBlock = React.memo(({ listMarker }: any) => {
  const isInit = useRef(false);
  function onGoogleApiLoaded() {
    let listPopup: any = [];
    const maps = (window as any).google.maps;
    const map = new maps.Map(document.getElementById("map"));
    let bounds = new maps.LatLngBounds();

    listMarker.forEach((item) => {
      const mark = item.attributes;
      const icon = {
        url: "/imgs/marker.png",
        //scaledSize: new maps.Size(30, 30),
      };
      const marker = new maps.Marker({
        position: { lat: mark.latitude, lng: mark.longitude },
        map,
        icon
      });
      bounds.extend(marker.position);
      const contentString =
        '<div id="content" class="w-[243px]">' +
        '<div id="siteNotice">' +
        "</div>" +
        '<div id="bodyContent">' +
        `<img src="${mark?.image?.data?.attributes?.url}" class="aspect-[243/141] w-full"/>` +
        '<div class="p-3">' +
        `<h3 class="font-bold text-lg font-apoc">${mark.title}</h3>` +
        `<p>${mark.subtitle}</p>` +
        `<p>${mark.description}</p>` +
        "</div>" +
        "</div>" +
        "</div>";
      const infowindow = new maps.InfoWindow({
        content: contentString,
        pixelOffset: new maps.Size(200, 100),
      });
      listPopup.push(infowindow);
      marker.addListener("click", () => {
        map.setZoom(14);
        const position = marker.getPosition();
        map.setCenter(position);
        infowindow.open({
          anchor: marker,
          map,
        });
      });
    });
    map.fitBounds(bounds);
    maps.event.addListener(map, "click", function (event) {
      listPopup.forEach((popup) => popup.close());
    });
  }

  useEffect(() => {
    if (!isInit.current) {
      if (!(window as any).google) {
        isInit.current = true;
        (window as any).onGoogleApiLoaded = onGoogleApiLoaded;
        const googleMapScript = document.createElement("script");
        googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=onGoogleApiLoaded`;
        googleMapScript.async = true;
        window.document.body.appendChild(googleMapScript);
      } else onGoogleApiLoaded();
    }
  }, []);

  useEffect;
  return (
    <section className="bg-[#E3C9E0] mb-32 lg:mb-48">
      <div className="max-w-[1550px] px-14 mx-auto pt-18 lg:pt-32">
        <div className="font-apoc font-bold text-3xl lg:text-[90px] lg:leading-[90px] text-[#F0506D] max-w-[565px] mb-10">
          No two journeys have ever been the same
        </div>
      </div>
      <div
        className="aspect-[375/1117] lg:aspect-[1737/1117] w-full"
        id="map"
      />
    </section>
  );
});

export default React.memo(MapContainer);
