
### FFmpeg

비디오 처리를 위해 FFmpeg 바이너리가 필요

1. **FFmpeg 다운로드:**

    - [FFmpeg 공식 웹사이트](https://ffmpeg.org/download.html)에서 운영 체제에 맞는 바이너리를 다운로드

2. **FFmpeg를 프로젝트 디렉토리에 추가:**

    - 다운로드한 FFmpeg 바이너리를 아래와 같은 디렉토리 구조로 프로젝트에 추가

    ```
    루트폴더/
    └── ffmpeg/
        └── ffmpeg (또는 Windows의 경우 ffmpeg.exe)
    ```

### 프로젝트 의존성 설치
```
npm install
```


### 비디오 파일 업로드

프론트엔드에서 사용자가 업로드할 비디오 파일과 함께 추가적인 정보를 서버에 POST 요청으로 전달

- `videoFile`: 업로드할 비디오파일 (Multer를 통한 파일 업로드 처리)
- `startTime`: 자를 비디오의 시작 시간(초 단위)
- `endTime`: 자를 비디오의 종료 시간(초 단위)
- `originalFileName`: 원본 파일 이름(확장자 제외)

```javascript
const formData = new FormData();
formData.append('videoFile', fileInput.files[0]); // 비디오 파일
formData.append('startTime', 0); // 시작 시간 (예: 0초)
formData.append('endTime', 60); // 종료 시간 (예: 60초)
formData.append('originalFileName', 'my_video'); // 파일 이름 (예: my_video.mp4)

fetch('http://localhost:8080/process-video', {
    method: 'POST',
    body: formData
}).then(response => response.text())
  .then(data => console.log(data));
```

### 최종 디렉토리 구조
```
루트폴더/
├── ffmpeg/
│   └── ffmpeg (또는 ffmpeg.exe)
├── uploads/  (업로드된 파일이 저장되는 디렉토리)
├── edit/     (인코딩된 파일이 저장되는 디렉토리)
├── node_modules/
├── package.json
└── index.js
```
### 참고

- `ffmpeg` 바이너리는 올바른 경로에 있어야 하며, 실행 권한이 필요함
- `uploads/` 및 `edit/` 디렉토리가 존재하지 않는 경우, 서버가 자동으로 생성
- 서버가 실행되기 전에 필요한 의존성을 모두 설치하고, FFmpeg 바이너리가 제대로 설정되어 있는지 확인
- 프론트 실행 포트 3000, 백엔드 실행 포트 8080
- [관련 블로그 포스팅](https://trophyjourney.tistory.com/31)
