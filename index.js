const { exec } = require('child_process'); // 시스템 명령어 실행
const path = require('path'); // 경로처리 
const fs = require('fs'); // 파일 시스템 조작

// FFmpeg 바이너리 경로 설정
const ffmpegPath = path.join(__dirname, 'ffmpeg', 'ffmpeg'); 

// 입력 파일 경로 설정
const inputFilePath = path.join(__dirname, '6dd6c0e8-b8a8-4f0e-a7a9-829fa949f1bb.mp4'); 

// 출력 디렉토리 경로 설정
const outputDir = path.join(__dirname, 'edit'); 

// 출력 디렉토리가 없으면 생성
if (!fs.existsSync(outputDir)) { 
    fs.mkdirSync(outputDir); 
}

// 360p 해상도로 인코딩
const output360pFilePath = path.join(outputDir, '360p.mp4'); 

/**
 * -i 는 입력 파일 지정
 * -vf 는 비디오 필터 지정
 * scale 은 해상도를 지정 여기선 360p
 */
exec(`${ffmpegPath} -i "${inputFilePath}" -vf "scale=640:360" "${output360pFilePath}"`, (error, stdout, stderr) => {
    if (error) {
        console.error(`360p 인코딩 중 오류 발생: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`FFmpeg 오류 (360p): ${stderr}`);
        return;
    }
    console.log(`360p 인코딩 완료: ${output360pFilePath}`);
});

// 720p 해상도로 인코딩
const output720pFilePath = path.join(outputDir, '720p.mp4'); 

/**
 * -i 는 입력 파일 지정
 * -vf 는 비디오 필터 지정
 * scale 은 해상도를 지정 여기선 720p
 */
exec(`${ffmpegPath} -i "${inputFilePath}" -vf "scale=1280:720" "${output720pFilePath}"`, (error, stdout, stderr) => {
    if (error) {
        console.error(`720p 인코딩 중 오류 발생: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`FFmpeg 오류 (720p): ${stderr}`);
        return;
    }
    console.log(`720p 인코딩 완료: ${output720pFilePath}`);
});

// 1080p 해상도로 인코딩
const output1080pFilePath = path.join(outputDir, '1080p.mp4'); 

/**
 * -i 는 입력 파일 지정
 * -vf 는 비디오 필터 지정
 * scale 은 해상도를 지정 여기선 1080p
 */
exec(`${ffmpegPath} -i "${inputFilePath}" -vf "scale=1920:1080" "${output1080pFilePath}"`, (error, stdout, stderr) => {
    if (error) {
        console.error(`1080p 인코딩 중 오류 발생: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`FFmpeg 오류 (1080p): ${stderr}`);
        return;
    }
    console.log(`1080p 인코딩 완료: ${output1080pFilePath}`);
});
