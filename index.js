const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const http = require('http');
const WebSocket = require('ws');
const multer = require('multer');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const upload = multer({ dest: 'uploads/' });
const ffmpegPath = path.join(__dirname, 'ffmpeg', 'ffmpeg');

// WebSocket 연결 처리
wss.on('connection', (ws) => {
    console.log('WebSocket 클라이언트 연결됨');

    app.post('/process-video', upload.single('videoFile'), (req, res) => {
        const { startTime, endTime, originalFileName } = req.body;
        const inputFilePath = req.file.path;
        const outputDir = path.join(__dirname, 'edit');

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir);
        }

        const resolutions = [
            { name: '360p', scale: 'scale=-2:360' },
            { name: '720p', scale: 'scale=-2:720' },
            { name: '1080p', scale: 'scale=-2:1080' },
        ];

        let completedResolutions = 0;

        ws.send(JSON.stringify({ status: '인코딩 중...' }));

        resolutions.forEach(({ name, scale }) => {
            const outputFileName = `${path.parse(originalFileName).name}_${name}.mp4`;
            const outputFilePath = path.join(outputDir, outputFileName);
            console.log(`Starting FFmpeg process for ${name} resolution...`);

            const ffmpegProcess = spawn(ffmpegPath, [
                '-i', inputFilePath,
                '-ss', startTime.toString(),
                '-to', endTime.toString(),
                '-vf', scale,
                outputFilePath
            ]);

            ffmpegProcess.on('close', (code) => {
                if (code === 0) {
                    console.log(`FFmpeg ${name} 인코딩 완료, 코드: ${code}`);
                    completedResolutions++;
                    if (completedResolutions === resolutions.length) {
                        ws.send(JSON.stringify({ status: '완료' }));
                        ws.close();
                    }
                } else {
                    console.error(`FFmpeg ${name} 인코딩 중 오류 발생, 코드: ${code}`);
                    ws.send(JSON.stringify({ error: `FFmpeg 오류 발생, 코드: ${code}` }));
                }
            });
        });

        res.send('비디오 인코딩 작업이 시작되었습니다.');
    });
});

// 서버 시작 (포트 8080)
server.listen(8080, () => {
    console.log('서버가 http://localhost:8080 에서 실행 중입니다.');
});
