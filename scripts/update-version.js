const fs = require('fs');
const path = require('path');

const gradlePath = path.join(__dirname, '..','android', 'app', 'build.gradle');
const packagePath = path.join(__dirname, '..', 'package.json');

// Đọc nội dung của file build.gradle
const gradleContent = fs.readFileSync(gradlePath, 'utf-8');

// Tìm và lấy giá trị versionName từ build.gradle
const versionNameRegex = /versionName\s+"([^"]+)"/;
const [, versionName] = gradleContent.match(versionNameRegex);

// Đọc và ghi lại nội dung của package.json
const packageJSON = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
packageJSON.version = versionName; // Cập nhật version trong package.json
fs.writeFileSync(packagePath, JSON.stringify(packageJSON, null, 2));

console.log(`Version updated to ${versionName}`);