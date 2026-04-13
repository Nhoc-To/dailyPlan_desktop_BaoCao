my-electron-app/
│
├── package.json
├── webpack.config.js (hoặc vite.config.ts)
│
└── src/
    │
    ├── main/                           <-- Chạy trên Node.js (Chứa Logic Cốt lõi & Data)
    │   ├── main.ts                     <-- Khởi tạo cửa sổ ứng dụng
    │   ├── application/
    │   │   ├── usecases/               <-- Nơi xử lý logic nghiệp vụ (VD: LoginUseCase.ts)
    │   │   └── services/
    │   ├── domain/
    │   │   └── repositories/           <-- Interface của Repo
    │   └── infrastructure/
    │       ├── database/               <-- Kết nối SQLite/File system
    │       ├── repositories/           <-- Triển khai lưu/đọc dữ liệu thực tế
    │       └── ipcHandlers/            <-- Lắng nghe yêu cầu từ UI gửi xuống (Controller của Main)
    │
    ├── renderer/                       <-- Chạy trên Trình duyệt (Chỉ chứa Giao diện)
    │   ├── index.html                  
    │   ├── index.tsx                   <-- File gốc của React/Vue
    │   └── presentation/
    │       ├── screens/                <-- Giao diện (LoginScreen.tsx)
    │       ├── components/             
    │       └── controllers/            <-- Nơi gọi các hàm cầu nối (window.api...)
    │
    ├── preload/                        <-- Bảo vệ an ninh, làm cầu nối
    │   └── preload.ts                  <-- Định nghĩa "window.api" (VD: mở kênh cho phép UI gọi login)
    │
    └── shared/                         <-- Dùng chung cho cả Main và Renderer
        ├── domain/                     <-- Entities (VD: User.ts), DTOs (Data Transfer Objects)
        └── constants/                  <-- Chứa tên các kênh giao tiếp (VD: IPC_CHANNELS = { LOGIN: 'auth:login' })