import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { MapPin, X } from "lucide-react";
import { vietnamCasesData, type VietnomCaseData } from "@/data/vietnamCases";

const vietnamGeoUrl =
  "https://gist.githubusercontent.com/tandat2209/5eb797fc2bcc1c8b6d71271353a40ab4/raw/ca883f00b7843afeb7b6ad73ec4370ab514a8a90/gadm36_VNM_0.json";
const paracelIslandsGeoUrl =
  "https://gist.githubusercontent.com/tandat2209/5eb797fc2bcc1c8b6d71271353a40ab4/raw/ca883f00b7843afeb7b6ad73ec4370ab514a8a90/gadm36_XPI_0.json";
const spralyIslandsGeoUrl =
  "https://gist.githubusercontent.com/tandat2209/5eb797fc2bcc1c8b6d71271353a40ab4/raw/ca883f00b7843afeb7b6ad73ec4370ab514a8a90/gadm36_XSP_0.json";

const vietnamMapLayers = [
  vietnamGeoUrl,
  paracelIslandsGeoUrl,
  spralyIslandsGeoUrl,
];

export default function MapPage() {
  const [selectedCase, setSelectedCase] = useState<VietnomCaseData | null>(
    null
  );
  const [hoveredMarker, setHoveredMarker] = useState<number | null>(null);

  const handleMarkerClick = (caseData: VietnomCaseData) => {
    setSelectedCase(caseData);
  };

  return (
    <div className="h-[calc(100vh-120px)]">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Bản đồ Thực tiễn Dân chủ Cơ sở Việt Nam
        </h1>
        <p className="text-gray-600">
          Khám phá các mô hình dân chủ trên khắp Việt Nam - Click vào marker để
          xem infographic
        </p>
      </div>

      <div className="relative h-full rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 2000,
            center: [108, 15.5],
          }}
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <ZoomableGroup>
            {vietnamMapLayers.map((geoUrl) => (
              <Geographies key={geoUrl} geography={geoUrl}>
                {({ geographies }: { geographies: any[] }) =>
                  geographies.map((geo: any) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#D6D6DA"
                      stroke="#FFFFFF"
                      strokeWidth={0.5}
                      style={{
                        default: {
                          fill: "#E0F2FE",
                          stroke: "#0284C7",
                          strokeWidth: 0.75,
                          outline: "none",
                        },
                        hover: {
                          fill: "#BAE6FD",
                          stroke: "#0369A1",
                          strokeWidth: 1,
                          outline: "none",
                        },
                        pressed: {
                          fill: "#7DD3FC",
                          stroke: "#0C4A6E",
                          strokeWidth: 1,
                          outline: "none",
                        },
                      }}
                    />
                  ))
                }
              </Geographies>
            ))}

            {vietnamCasesData.map((caseData) => (
              <Marker
                key={caseData.id}
                coordinates={[caseData.longitude, caseData.latitude]}
                onMouseEnter={() => setHoveredMarker(caseData.id)}
                onMouseLeave={() => setHoveredMarker(null)}
                onClick={() => handleMarkerClick(caseData)}
                style={{ cursor: "pointer" }}
              >
                <g>
                  <circle
                    r={8}
                    fill="#DC2626"
                    stroke="#FFFFFF"
                    strokeWidth={3}
                    className="transition-all"
                    style={{
                      filter:
                        hoveredMarker === caseData.id
                          ? "drop-shadow(0 4px 6px rgba(0,0,0,0.3))"
                          : "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
                      transform:
                        hoveredMarker === caseData.id
                          ? "scale(1.3)"
                          : "scale(1)",
                    }}
                  />
                  {hoveredMarker === caseData.id && (
                    <g>
                      <rect
                        x={-80}
                        y={-50}
                        width={160}
                        height={35}
                        fill="white"
                        stroke="#E5E7EB"
                        strokeWidth={1.5}
                        rx={6}
                        style={{
                          filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))",
                        }}
                      />
                      <text
                        textAnchor="middle"
                        y={-32}
                        style={{
                          fontSize: "11px",
                          fill: "#1F2937",
                          fontWeight: "700",
                        }}
                      >
                        {caseData.province}
                      </text>
                      <text
                        textAnchor="middle"
                        y={-20}
                        style={{
                          fontSize: "9px",
                          fill: "#6B7280",
                          fontWeight: "400",
                        }}
                      >
                        Click để xem chi tiết
                      </text>
                    </g>
                  )}
                </g>
              </Marker>
            ))}
          </ZoomableGroup>
        </ComposableMap>

        {selectedCase && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[2000] p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-[95vw] w-full max-h-[80vh] overflow-hidden flex flex-col">
              {/* Header with close button */}
              <div className="flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-blue-600 to-cyan-600">
                <h2 className="text-2xl font-bold text-white">
                  Chi tiết Case Study
                </h2>
                <button
                  onClick={() => setSelectedCase(null)}
                  className="text-white hover:text-gray-200 transition p-2 hover:bg-white/20 rounded-full"
                >
                  <X className="w-7 h-7" />
                </button>
              </div>

              {/* Main content: Info (left) + Image (right) */}
              <div className="flex-1 flex overflow-hidden min-h-0">
                {/* Left side - Information */}
                <div className="w-80 bg-gradient-to-br from-blue-50 to-cyan-50 p-6 flex flex-col space-y-6 overflow-y-auto border-r flex-shrink-0">
                  {/* Province info */}
                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <MapPin className="w-8 h-8 text-blue-600" />
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {selectedCase.province}
                        </h3>
                      </div>
                    </div>

                    {selectedCase.description && (
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {selectedCase.description}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Location coordinates */}
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <span className="text-blue-600 mr-2">📍</span>
                      Vị trí địa lý
                    </h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>
                        <span className="font-medium">Vĩ độ:</span>{" "}
                        {selectedCase.latitude.toFixed(4)}°N
                      </p>
                      <p>
                        <span className="font-medium">Kinh độ:</span>{" "}
                        {selectedCase.longitude.toFixed(4)}°E
                      </p>
                    </div>
                  </div>

                  {/* Case study info */}
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <span className="text-green-600 mr-2">📊</span>
                      Thông tin Case Study
                    </h4>
                    <p className="text-sm text-gray-600">
                      Infographic chi tiết về mô hình dân chủ cơ sở tại địa
                      phương này. Xem hình ảnh bên phải để tìm hiểu thêm.
                    </p>
                  </div>

                  {/* Close button */}
                  <button
                    onClick={() => setSelectedCase(null)}
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md font-medium"
                  >
                    Đóng
                  </button>
                </div>

                {/* Right side - Infographic Image */}
                <div className="flex-1 overflow-auto bg-gray-900 p-6">
                  <div className="h-full flex items-start justify-center">
                    <img
                      src={selectedCase.infographic}
                      alt={`Infographic ${selectedCase.province}`}
                      className="w-auto h-auto max-w-full object-contain rounded-lg shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 z-[1000]">
          <h3 className="font-semibold text-gray-900 mb-2 text-sm">
            Chú thích
          </h3>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-red-600 border-2 border-white"></div>
            <span className="text-xs text-gray-700">
              Case Study ({vietnamCasesData.length} địa phương)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
