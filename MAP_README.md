# Bản đồ Việt Nam với react-simple-maps

## Tổng quan

Dự án đã được cập nhật để sử dụng **react-simple-maps** thay vì react-leaflet. Bản đồ hiển thị đầy đủ lãnh thổ Việt Nam bao gồm:

- 🗺️ Lãnh thổ đất liền Việt Nam
- 🏝️ Quần đảo Hoàng Sa (Paracel Islands)
- 🏝️ Quần đảo Trường Sa (Spratly Islands)

## Tính năng

- ✅ Hiển thị bản đồ Việt Nam với projection Mercator chính xác
- ✅ Zoom và pan (di chuyển) bản đồ
- ✅ Markers đỏ hiển thị các case study
- ✅ Hover tooltip khi di chuột qua marker
- ✅ Click marker để xem chi tiết case study
- ✅ Panel chi tiết xuất hiện bên phải khi click marker

## Cài đặt

```bash
cd frontend
npm install react-simple-maps
```

## Cấu trúc Code

### 1. Map Layers (TopoJSON)

```typescript
const vietnamMapLayers = [
  vietnamGeoUrl, // Lãnh thổ đất liền
  paracelIslandsGeoUrl, // Hoàng Sa
  spralyIslandsGeoUrl, // Trường Sa
];
```

### 2. Projection Configuration

```typescript
projection="geoMercator"
projectionConfig={{
  scale: 2400,
  center: [108, 15.5], // Tọa độ trung tâm Việt Nam
}}
```

### 3. Markers

- Màu đỏ (#EF4444) với viền trắng
- Bán kính 6px
- Hiển thị tooltip khi hover
- Click để xem chi tiết

## Files được tạo/cập nhật

1. **src/pages/MapPage.tsx** - Component chính hiển thị bản đồ
2. **src/types/react-simple-maps.d.ts** - TypeScript type definitions
3. **package.json** - Đã có `react-simple-maps@^3.0.0`

## Nguồn dữ liệu

Dữ liệu TopoJSON được lấy từ:

- GADM (Database of Global Administrative Areas)
- Đã được xử lý và simplify bằng [mapshaper.org](https://mapshaper.org/)
- Hosted trên GitHub Gist

## Tham khảo

- [react-simple-maps Documentation](https://www.react-simple-maps.io/)
- [Bài viết hướng dẫn](https://viblo.asia/p/tao-ban-do-viet-nam-gom-2-quan-dao-truong-sa-va-hoang-sa-voi-react-simple-maps-WAyK87wE5xX)
- [D3 Geo Projections](https://d3-wiki.readthedocs.io/zh_CN/master/Geo-Projections/)

## Chạy ứng dụng

```bash
npm run dev
```

Truy cập: http://localhost:5173/map

## So sánh với react-leaflet

### Ưu điểm của react-simple-maps:

- ✅ Không cần API key
- ✅ Render SVG (vector graphics), không phụ thuộc tile server
- ✅ Tùy chỉnh màu sắc, style dễ dàng
- ✅ Hiển thị chính xác biên giới Việt Nam + Hoàng Sa + Trường Sa
- ✅ Tương thích tốt với React 18
- ✅ File size nhẹ hơn

### Nhược điểm:

- ❌ Không có satellite/street view
- ❌ Zoom level hạn chế hơn
- ❌ Cần TopoJSON/GeoJSON file riêng

## Tùy chỉnh

### Thay đổi màu bản đồ:

```typescript
style={{
  default: { fill: "#E5E7EB", outline: "none" },
  hover: { fill: "#D1D5DB", outline: "none" },
  pressed: { fill: "#9CA3AF", outline: "none" },
}}
```

### Thay đổi scale/center:

```typescript
projectionConfig={{
  scale: 2400,     // Tăng để zoom in, giảm để zoom out
  center: [108, 15.5], // [longitude, latitude]
}}
```

### Thay đổi marker color:

```typescript
<circle
  r={6}
  fill="#EF4444" // Màu đỏ - đổi thành màu khác
  stroke="#FFFFFF"
  strokeWidth={2}
/>
```
