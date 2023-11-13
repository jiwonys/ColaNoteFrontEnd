const fs = require('fs');
fs.writeFileSync('docs/CNAME', 'www.colanote.com');
const indexHtmlContent = fs.readFileSync('docs/index.html', 'utf8');
fs.writeFileSync('docs/404.html', indexHtmlContent);
console.log('Post-build script completed successfully.');
