// Gestion du mode sombre/clair
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-toggle');
    const toggleIcon = document.querySelector('.toggle-icon');
    const toggleText = document.querySelector('.toggle-text');

    // Fonction pour mettre à jour l'apparence du bouton de thème
    function updateThemeToggle() {
        if (document.body.dataset.theme === 'dark') {
            toggleIcon.textContent = '🌙';
            toggleText.textContent = 'Mode clair';
        } else {
            toggleIcon.textContent = '☀️';
            toggleText.textContent = 'Mode sombre';
        }
    }

    // Écouteur d'événement pour le changement de thème
    themeToggle.addEventListener('click', () => {
        document.body.dataset.theme = document.body.dataset.theme === 'dark' ? '' : 'dark';
        updateThemeToggle();
        
        // Optionnel : sauvegarder le thème dans localStorage
        localStorage.setItem('theme', document.body.dataset.theme);
    });

    // Restaurer le thème précédent lors du chargement de la page
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.dataset.theme = savedTheme;
    }

    // Initialiser l'apparence du bouton de thème
    updateThemeToggle();
});