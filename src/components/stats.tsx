"use client";
import {
  TrophyIcon,
  CurrencyPoundIcon,
  FaceSmileIcon,
} from "@heroicons/react/20/solid";
import {
  CursorArrowRaysIcon,
  EnvelopeOpenIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { useContractRead, useAccount } from "wagmi";
import { abi } from "../abi";

function calculateTotalPrice(items: Travel[], tokenId: number) {
  return (
    items
      .reduce((sum, item) => {
        let price = 0; // Initialize price with a default value
        if (Number(item.tokenId) === Number(tokenId)) {
          price = parseFloat(item.price.replace("£", ""));
        }
        return sum + price;
      }, 0)
      .toFixed(2) + "£"
  );
}

interface Travel {
  chainlinkId: `0x${string}`;
  tokenId: bigint;
  timestamp: bigint;
  price: string;
  destination: string;
  uri: string;
}
function countTokenIdOccurrences(items: Travel[], tokenId: number) {
  return items.filter((item) => Number(item.tokenId) === Number(tokenId))
    .length;
}

export default function Stats() {
  const { address, isConnecting, isDisconnected } = useAccount();
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
  return (
    <div>
      <dl className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div
          key={1}
          className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 shadow sm:px-6 sm:pt-6"
        >
          <dt>
            <div className="absolute rounded-md bg-electric-violet-500 p-3">
              <FaceSmileIcon
                className="h-6 w-6 text-white"
                aria-hidden="true"
              />
            </div>
            <p className="ml-16 truncate text-sm font-medium text-gray-500">
              Total Travels
            </p>
          </dt>
          <dd className="ml-16 flex items-baseline pb-5">
            <p className="text-2xl font-semibold text-gray-900">
              {/* @ts-ignore lmeow*/}
              {travels && tokenId ? countTokenIdOccurrences(travels, tokenId[0]) : null}
            </p>
          </dd>
        </div>
        <div
          key={2}
          className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 shadow sm:px-6 sm:pt-6"
        >
          <dt>
            <div className="absolute rounded-md bg-electric-violet-500 p-3">
              <CurrencyPoundIcon
                className="h-6 w-6 text-white"
                aria-hidden="true"
              />
            </div>
            <p className="ml-16 truncate text-sm font-medium text-gray-500">
              Total Spent
            </p>
          </dt>
          <dd className="ml-16 flex items-baseline pb-5">
            <p className="text-2xl font-semibold text-gray-900">
              {/* @ts-ignore lmeow*/}
              {travels && tokenId ? calculateTotalPrice(travels, tokenId[0]) : null}
            </p>
          </dd>
        </div>
        <div
          key={3}
          className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 shadow sm:px-6 sm:pt-6"
        >
          <dt>
            <div className="absolute rounded-md bg-electric-violet-500 p-3">
              <TrophyIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <p className="ml-16 truncate text-sm font-medium text-gray-500">
              NFTs Earned
            </p>
          </dt>
          <dd className="ml-16 flex items-baseline pb-5">
            <p className="text-2xl font-semibold text-gray-900">
              {/* @ts-ignore lmeow*/}
              {travels && tokenId ? countTokenIdOccurrences(travels, tokenId[0]) : null}
            </p>
          </dd>
        </div>
      </dl>
    </div>
  );
}
