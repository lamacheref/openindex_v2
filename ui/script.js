// Script principal pour le dashboard du crawler SMB

document.addEventListener('DOMContentLoaded', function() {
    // Simuler des données pour le dashboard
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
        ]
    };

    // Mettre à jour les statistiques
    document.getElementById('file-count').textContent = mockData.fileCount.toLocaleString();
    document.getElementById('dir-count').textContent = mockData.dirCount.toLocaleString();
    document.getElementById('total-size').textContent = `${mockData.totalSize.toLocaleString()} MB`;
    document.getElementById('duplicate-count').textContent = mockData.duplicateCount.toLocaleString();

    // Remplir la liste des fichiers récents
    const fileList = document.querySelector('.file-list');
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

    // Ajouter des effets d'animation
    document.querySelectorAll('.stat-card, .recent-files-block').forEach(el => {
        el.classList.add('fade-in');
    });

    // Gérer le clic sur le bouton Actualiser
    document.querySelector('.header-actions button:first-child').addEventListener('click', function() {
        alert('Fonctionnalité d\'actualisation à implémenter');
    });

    // Gérer le clic sur le bouton Exporter
    document.querySelector('.header-actions button:last-child').addEventListener('click', function() {
        alert('Fonctionnalité d\'exportation à implémenter');
    });
});
