// app/dashboard/machines/MachineDetailsModal.jsx
"use client";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Image from "next/image";
import { useFetchData } from "@/hooks/useApi";

interface MachineDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  machineId: number | null;
}

const MachineDetailsModal = ({
  isOpen,
  onClose,
  machineId,
}: MachineDetailsModalProps) => {
  const { data: machineData, isLoading } = useFetchData(
    ["machine", String(machineId)],
    machineId ? `/machines/${machineId}` : "",
    { enabled: isOpen && !!machineId },
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const machine = machineData?.data;

  const unitTypeLabels: Record<string, string> = {
    SPINNING: "Spinning Unit",
    WOVEN: "Woven Dyeing & Finishing",
    FABRIC: "Fabric Manufacturing",
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-1000 overflow-y-auto"
      onClick={onClose}
    >
      <div className="min-h-screen flex items-center justify-center p-4">
        <div
          className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto scrollbar-modern"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-5 md:p-6 flex justify-between items-center">
            <h5 className="font-bold text-pBlue text-xl md:text-2xl">
              Machine Details
            </h5>
            <button
              onClick={onClose}
              className="h-10 w-10 rounded-full bg-gray-100 hover:bg-red-100 flex items-center justify-center transition-colors duration-300"
            >
              <RxCross2 size={20} className="text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="p-5 md:p-6">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pBlue"></div>
              </div>
            ) : machine ? (
              <div className="space-y-6">
                {/* Images Gallery */}
                {machine.images && machine.images.length > 0 && (
                  <div>
                    <h6 className="font-semibold text-pBlue text-lg mb-3">
                      Machine Images
                    </h6>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {machine.images.map((img: string, idx: number) => (
                        <div
                          key={idx}
                          className="relative aspect-square rounded-lg overflow-hidden border border-gray-200"
                        >
                          <Image
                            src={img}
                            alt={`Machine ${idx + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Machine Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-pGray text-xs">Machine Name</p>
                    <p className="text-pBlue font-medium">{machine.name}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-pGray text-xs">Brand</p>
                    <p className="text-pBlue font-medium">
                      {machine.brandName}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-pGray text-xs">Origin</p>
                    <p className="text-pBlue font-medium">{machine.origin}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-pGray text-xs">Quantity</p>
                    <p className="text-pBlue font-medium">{machine.quantity}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-pGray text-xs">Production Capacity</p>
                    <p className="text-pBlue font-medium">
                      {machine.productionCapacity}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-pGray text-xs">Unit Type</p>
                    <p className="text-pBlue font-medium">
                      {unitTypeLabels[machine.unitType] || machine.unitType}
                    </p>
                  </div>
                </div>

                {/* Details */}
                {machine.details && (
                  <div>
                    <h6 className="font-semibold text-pBlue text-lg mb-2">
                      Machine Details
                    </h6>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div
                        dangerouslySetInnerHTML={{ __html: machine.details }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-pGray">
                Machine not found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MachineDetailsModal;
