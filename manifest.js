const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// === CẤU HÌNH THÔNG TIN GITHUB CỦA BẠN ===
const GITHUB_USER = 'Vlmsv1999';
const GITHUB_REPO = 'update-server';
const GITHUB_BRANCH = 'main';

const BASE_RAW_URL = `https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_REPO}/${GITHUB_BRANCH}/`;

const folders = ['mods', 'config', 'scripts', 'resourcepacks'];
const manifest = { files: [] };

// Hàm tính MD5 hash của file
function getMD5Hash(filePath) {
    const fileBuffer = fs.readFileSync(filePath);
    return crypto.createHash('md5').update(fileBuffer).digest('hex');
}

// Đệ quy quét các tệp tin trong thư mục
function scanDirectory(dir, relativeDir = '') {
    const fullPath = path.join(dir, relativeDir);
    if (!fs.existsSync(fullPath)) return;
    
    const items = fs.readdirSync(fullPath);
    for (const item of items) {
        const relativeItemPath = path.join(relativeDir, item).replace(/\\/g, '/');
        const itemFullPath = path.join(dir, relativeItemPath);
        const stat = fs.statSync(itemFullPath);
        
        if (stat.isDirectory()) {
            scanDirectory(dir, relativeItemPath);
        } else {
            const hash = getMD5Hash(itemFullPath);
            manifest.files.push({
                path: relativeItemPath,
                hash: hash,
                size: stat.size,
                url: BASE_RAW_URL + relativeItemPath
            });
        }
    }
}

// Thực hiện quét các thư mục được chỉ định
const targetDir = __dirname;
for (const folder of folders) {
    const folderPath = path.join(targetDir, folder);
    if (fs.existsSync(folderPath)) {
        console.log(`Đang quét thư mục: ${folder}...`);
        scanDirectory(targetDir, folder);
    }
}

// Ghi file manifest.json
const outputPath = path.join(targetDir, 'manifest.json');
fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 4), 'utf8');
console.log(`\n Đã tạo thành công file manifest.json tại: ${outputPath}`);
console.log(`Tổng số tệp quét được: ${manifest.files.length}`);
