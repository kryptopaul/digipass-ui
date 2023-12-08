/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/

"use client"
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import {abi} from "../abi";
import { useState } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";
import axios from "axios";

const stations = [
  { name: "Waterloo", price: "2.80£" },
  { name: "Kings_Cross_St_Pancras", price: "4.00£" },
  { name: "Oxford_Circus", price: "3.20£" },
  { name: "Victoria", price: "3.75£" },
  { name: "London_Bridge", price: "3.50£" },
  { name: "Liverpool_Street", price: "2.90£" },
  { name: "Stratford", price: "3.30£" },
  { name: "Paddington", price: "3.60£" },
  { name: "Euston", price: "3.40£" },
  { name: "Bank", price: "3.00£" },
  { name: "Piccadilly_Circus", price: "3.10£" },
  { name: "Leicester_Square", price: "3.20£" },
  { name: "Covent_Garden", price: "3.50£" },
  { name: "Holborn", price: "2.70£" },
  { name: "Tottenham_Court_Road", price: "3.30£" },
  { name: "Green_Park", price: "3.40£" },
  { name: "Westminster", price: "3.60£" },
  { name: "Tower_Hill", price: "3.00£" },
  { name: "Camden_Town", price: "2.50£" },
  { name: "Baker_Street", price: "3.50£" },
  { name: "Canary_Wharf", price: "4.00£" },
  { name: "South_Kensington", price: "3.20£" },
  { name: "Notting_Hill_Gate", price: "3.60£" },
  { name: "Earls_Court", price: "4.50£" },
  { name: "St_Pancras_International", price: "3.80£" },
  { name: "Bond_Street", price: "3.40£" },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Tap() {
  const { config } = usePrepareContractWrite({
    address: "0xa342ADDe4b4170Ac2aeD0aFf782BCa296c9d4465",
    abi: abi,
    functionName: "sendRequest",
    chainId: 43113,
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  const [query, setQuery] = useState("");
  const [selectedStation, setSelectedStation] = useState(stations[0]);

  const [loading, setLoading] = useState(false);

  async function generateImage() {
    setLoading(true);
    console.log(selectedStation.name);
    const request = await axios.post(
      "https://digipass.2.us-1.fl0.io/generate",
      {
        destination: selectedStation.name,
      }
    );
    const { url } = request.data;
    console.log(url);
    setLoading(false);
  }

  return (
    <>
      <Combobox as="div" value={selectedStation} onChange={setSelectedStation}>
        <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">
          Quick travel
        </Combobox.Label>
        <div className="relative mt-2">
          <Combobox.Input
            className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={(event) => setQuery(event.target.value)}
            //   @ts-ignore
            displayValue={(station) => (station ? station.name : "")}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>

          {stations.length > 0 && (
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {stations.map((station, key) => (
                <Combobox.Option
                  key={key}
                  value={station}
                  className={({ active }) =>
                    classNames(
                      "relative cursor-default select-none py-2 pl-3 pr-9",
                      active ? "bg-indigo-600 text-white" : "text-gray-900"
                    )
                  }
                >
                  {({ active, selected }) => (
                    <>
                      <span
                        className={classNames(
                          "block truncate",
                          selected && "font-semibold"
                        )}
                      >
                        {station.name}
                      </span>

                      {selected && (
                        <span
                          className={classNames(
                            "absolute inset-y-0 right-0 flex items-center pr-4",
                            active ? "text-white" : "text-indigo-600"
                          )}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}
        </div>
      </Combobox>
      <button
        disabled={loading}
        onClick={() => generateImage()}
        className={`inline-flex items-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold shadow-sm justify-center ${
          loading
            ? "bg-gray-500 hover:bg-gray-500"
            : "bg-electric-violet-600 hover:bg-electric-violet-500"
        } text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
      >
        {loading ? "Loading..." : "Tap"}
      </button>
    </>
  );
}
