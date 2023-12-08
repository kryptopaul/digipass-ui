"use client";
import { abi } from "../abi";
const people = [
  {
    name: "16th Nov 2023",
    title: "Canary Wharf",
    email: "4.20 USDT",
  },
  {
    name: "15th Nov 2023",
    title: "London Bridge",
    email: "6.60 USDT",
  },
  {
    name: "14th Nov 2023",
    title: "Camden",
    email: "5.50 USDT",
  },

  {
    name: "13rd Nov 2023",
    title: "Liverpool Street",
    email: "3.33 USDT",
  },
  {
    name: "12th Nov 2023",
    title: "Shoreditch",
    email: "7.18 USDT",
  },
  // More people...
];
import { ArrowRightCircleIcon } from "@heroicons/react/20/solid";
import { useContractRead, useAccount } from "wagmi";

export default function LastTravels() {
  const { address, isConnecting, isDisconnected } = useAccount();

  const {
    data: travels,
    isError,
    isLoading,
  } = useContractRead({
    address: "0xa342ADDe4b4170Ac2aeD0aFf782BCa296c9d4465",
    abi: abi,
    functionName: "getTravels",
    chainId: 43113,
  });

  const {
    data: tokenId,
    isError: tokenIdError,
    isLoading: tokenIdLoading,
  } = useContractRead({
    address: "0xa342ADDe4b4170Ac2aeD0aFf782BCa296c9d4465",
    abi: abi,
    functionName: "tokensOfOwner",
    chainId: 43113,
    args: [address ? address : "0x00"],
  });

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Recent travels
          </h1>
        </div>
      </div>
      <div className="mt-2 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                  >
                    Date of Travel
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Destination
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Cost
                  </th>

                  <th
                    scope="col"
                    className="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8"
                  >
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {travels?.filter(travel => travel.tokenId === tokenId?.[0]).map((travel, key) =>(
                  <tr key={key}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                    {new Intl.DateTimeFormat('en-GB', {
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: false // 24-hour format
  }).format(new Date(Number(travel.timestamp) * 1000))}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {travel.destination}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {travel.price}
                    </td>

                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
                      <a
                        href={travel.uri}
                        type="button"
                        target="_blank"
                        className="inline-flex items-center gap-x-1.5 rounded-md bg-electric-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-electric-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        View NFT
                        <ArrowRightCircleIcon
                          className="-mr-0.5 h-5 w-5"
                          aria-hidden="true"
                        />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
