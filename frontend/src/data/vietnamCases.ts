/**
 * Dữ liệu các case study địa phương Việt Nam
 * Mapping giữa tỉnh thành và infographic
 */

export interface VietnomCaseData {
  id: number;
  name: string;
  province: string;
  latitude: number;
  longitude: number;
  infographic: string;
  description?: string;
}

export const vietnamCasesData: VietnomCaseData[] = [
  {
    id: 1,
    name: "Dân chủ cơ sở tại An Giang",
    province: "An Giang",
    latitude: 10.5216,
    longitude: 105.1258,
    infographic: "/An Giang.png",
    description: "Mô hình dân chủ cơ sở tại tỉnh An Giang",
  },
  {
    id: 2,
    name: "Dân chủ cơ sở tại Hà Nội",
    province: "Hà Nội",
    latitude: 21.0285,
    longitude: 105.8542,
    infographic: "/Hà Nội.png",
    description: "Mô hình dân chủ cơ sở tại Thủ đô Hà Nội",
  },
  {
    id: 3,
    name: "Dân chủ cơ sở tại Long An",
    province: "Long An",
    latitude: 10.6956,
    longitude: 106.2431,
    infographic: "/Long An.png",
    description: "Mô hình dân chủ cơ sở tại tỉnh Long An",
  },
  {
    id: 4,
    name: "Dân chủ cơ sở tại Nha Trang - Khánh Hòa",
    province: "Khánh Hòa",
    latitude: 12.2388,
    longitude: 109.1967,
    infographic: "/Nha Trang - Khánh Hòa.png",
    description: "Mô hình dân chủ cơ sở tại Nha Trang - Khánh Hòa",
  },
  {
    id: 5,
    name: "Dân chủ cơ sở tại Phú Nhuận - TP Hồ Chí Minh",
    province: "TP Hồ Chí Minh",
    latitude: 10.7976,
    longitude: 106.6829,
    infographic: "/Phú Nhuận - TP Hồ Chí Minh.png",
    description: "Mô hình dân chủ cơ sở tại quận Phú Nhuận, TP.HCM",
  },
  {
    id: 6,
    name: "Dân chủ cơ sở tại Quận 3 - TP Hồ Chí Minh",
    province: "TP Hồ Chí Minh",
    latitude: 10.7813,
    longitude: 106.6928,
    infographic: "/QUẬN 3, TP. Hồ Chí Minh.png",
    description: "Mô hình dân chủ cơ sở tại Quận 3, TP.HCM",
  },
  {
    id: 7,
    name: "Dân chủ cơ sở tại Hải Phòng",
    province: "Hải Phòng",
    latitude: 20.8449,
    longitude: 106.6881,
    infographic: "/Thành Phố Hải Phòng.png",
    description: "Mô hình dân chủ cơ sở tại Thành phố Hải Phòng",
  },
  {
    id: 8,
    name: "Dân chủ cơ sở tại Đà Nẵng",
    province: "Đà Nẵng",
    latitude: 16.0544,
    longitude: 108.2022,
    infographic: "/Đà Nẵng.png",
    description: "Mô hình dân chủ cơ sở tại Thành phố Đà Nẵng",
  },
  {
    id: 9,
    name: "Dân chủ cơ sở tại Đồng Tháp",
    province: "Đồng Tháp",
    latitude: 10.4938,
    longitude: 105.6881,
    infographic: "/Đồng Tháp.png",
    description: "Mô hình dân chủ cơ sở tại tỉnh Đồng Tháp",
  },
];
