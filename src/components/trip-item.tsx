import { Trip } from "@prisma/client"
import Image from "next/image"
import ReactCountryFlag from "react-country-flag"

interface TripItemProps {
  trip: Trip
}

const TripItem = ({ trip }: TripItemProps) => {
  return (
    <div className="flex flex-col">
      <div className="relative h-[280px] w-[280px]">
        <Image
          src={trip.coverImage}
          alt={trip.name}
          className="rounded-lg"
          style={{
            objectFit: 'cover'
          }}
          fill
        />
      </div>

      <h3>{trip.name}</h3>
      <div className="flex items-center">
        <ReactCountryFlag countryCode={trip.countryCode} svg />
        <p className="text-xs font-normal text-primaryGray">{trip.location}</p>
      </div>
    </div>
  )
}

export default TripItem