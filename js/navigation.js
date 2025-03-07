// Navigation entre les sections
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const pageSections = document.querySelectorAll('.page-section');
    const navLinksContainer = document.querySelector('.nav-links');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            
            // Mettre à jour le lien de navigation actif
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            link.classList.add('active');
            
            // Afficher la section cible
            pageSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetId) {
                    section.classList.add('active');
                    // Remonter en haut de la page lors du changement de section
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
            
            // Fermer le menu mobile si ouvert
            navLinksContainer.classList.remove('active');
        });
    });

    // Toggle du menu mobile
    mobileMenuBtn.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
    });
});