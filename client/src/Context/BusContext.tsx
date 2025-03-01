import React, { createContext, useState, useContext, ReactNode } from "react";

export interface BusDetails {
  selectedBus: Array<{
    seatNumber: number;
    isAvailable: boolean;
  }>;
  seatPrice: number;
  routeFrom: string | null;
  routeTo: string | null;
  travelDate: string | null;
  rideTime: string;
  rideID: number;
  busType: string;
  shift: string;
  busName: string;
  selectedSeatNumbers: number[];
}

interface BusContextType {
  busDetails: BusDetails | null;
  setBusDetails: React.Dispatch<React.SetStateAction<BusDetails | null>>;
}

const initialContext: BusContextType = {
  busDetails: null,
  setBusDetails: () => {},
};

export const BusContext = createContext<BusContextType>(initialContext);

export const useBusContext = () => useContext(BusContext);

interface BusProviderProps {
  children: ReactNode;
}

export const BusProvider: React.FC<BusProviderProps> = ({ children }) => {
  const [busDetails, setBusDetails] = useState<BusDetails | null>(null);

  return (
    <BusContext.Provider value={{ busDetails, setBusDetails }}>
      {children}
    </BusContext.Provider>
  );
};
