// Script principal pour le dashboard du crawler SMB

document.addEventListener('DOMContentLoaded', function() {
    const mockData = {
        fileCount: 1245,
        dirCount: 321,
        totalSize: 4567,
        duplicateCount: 42,
        recentFiles: [
            { name: 'document1.pdf', size: '2.1 MB', date: '2023-11-15' },
            { name: 'image.jpg', size: '1.8 MB', date: '2023-11-14' },
            { name: 'presentation.pptx', size: '3.5 MB', date: '2023-11-13' },
            { name: 'spreadsheet.xlsx', size: '1.2 MB', date: '2023-11-12' },
            { name: 'code.js', size: '0.5 MB', date: '2023-11-11' }
        ],
        crawlerState: 'available'
    };

    const statusConfig = {
        inactive: { className: 'status-inactive', label: 'Crawler inactif' },
        available: { className: 'status-available', label: 'Crawler disponible' },
        crawling: { className: 'status-crawling', label: 'Crawler en cours de crawl' }
    };

    const fileCountEl = document.getElementById('file-count');
    const dirCountEl = document.getElementById('dir-count');
    const totalSizeEl = document.getElementById('total-size');
    const duplicateCountEl = document.getElementById('duplicate-count');

    if (fileCountEl) fileCountEl.textContent = mockData.fileCount.toLocaleString();
    if (dirCountEl) dirCountEl.textContent = mockData.dirCount.toLocaleString();
    if (totalSizeEl) totalSizeEl.textContent = `${mockData.totalSize.toLocaleString()} MB`;
    if (duplicateCountEl) duplicateCountEl.textContent = mockData.duplicateCount.toLocaleString();

    const fileList = document.querySelector('.file-list');
    if (fileList) {
        mockData.recentFiles.forEach(file => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.innerHTML = `
                <div class="file-name">${file.name}</div>
                <div class="file-size">${file.size}</div>
                <div class="file-date">${file.date}</div>
            `;
            fileList.appendChild(fileItem);
        });
    }

    const setCrawlerStatus = (state) => {
        const statusElement = document.getElementById('crawler-status');
        if (!statusElement || !statusConfig[state]) {
            return;
        }

        statusElement.classList.remove('status-inactive', 'status-available', 'status-crawling');
        statusElement.classList.add(statusConfig[state].className);

        const label = statusElement.querySelector('.status-label');
        if (label) {
            label.textContent = statusConfig[state].label;
        }
    };

    setCrawlerStatus(mockData.crawlerState);

    document.querySelectorAll('.stat-card, .recent-files-block').forEach(el => {
        el.classList.add('fade-in');
    });


    const currentUserEl = document.getElementById('current-user');
    if (currentUserEl) {
        currentUserEl.textContent = document.body.dataset.user || 'invité';
    }

    const lastCommitEl = document.getElementById('last-commit');
    if (lastCommitEl) {
        const commitFromData = document.body.dataset.lastCommit;
        if (commitFromData) {
            lastCommitEl.textContent = commitFromData;
        } else {
            fetch('../COMMIT')
                .then(response => response.ok ? response.text() : Promise.reject())
                .then(commit => {
                    lastCommitEl.textContent = commit.trim() || 'N/A';
                })
                .catch(() => {
                    lastCommitEl.textContent = 'N/A';
                });
        }
    }

    const versionEl = document.getElementById('project-version');
    if (versionEl) {
        fetch('../VERSION')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Version indisponible');
                }
                return response.text();
            })
            .then(version => {
                versionEl.textContent = version.trim() || 'N/A';
            })
            .catch(() => {
                versionEl.textContent = 'N/A';
            });
    }
});
