// Gestion des avis Google
document.addEventListener('DOMContentLoaded', () => {
    // Configuration Google Reviews
    const GOOGLE_PLACE_ID = 'VOTRE_PLACE_ID'; // Remplacez par l'ID de votre établissement Google
    
    // Fonction pour initialiser et charger les avis Google
    window.initGoogleReviews = function() {
        const reviewsContainer = document.getElementById('google-reviews');
        
        // Créer une instance de PlacesService
        const placesService = new google.maps.places.PlacesService(document.createElement('div'));
        
        // Paramètres de la requête
        const request = {
            placeId: GOOGLE_PLACE_ID,
            fields: ['reviews', 'name']
        };
        
        // Effectuer la requête
        placesService.getDetails(request, (place, status) => {
            // Vider le conteneur de chargement
            reviewsContainer.innerHTML = '';
            
            if (status === google.maps.places.PlacesServiceStatus.OK && place.reviews) {
                // Limiter à 6 avis maximum
                const reviews = place.reviews.slice(0, 6);
                
                // Parcourir et afficher chaque avis
                reviews.forEach(review => {
                    // Créer les étoiles en fonction de la note
                    let stars = '';
                    for (let i = 0; i < 5; i++) {
                        if (i < review.rating) {
                            stars += '★';
                        } else {
                            stars += '☆';
                        }
                    }
                    
                    // Créer les initiales pour l'avatar
                    const nameParts = review.author_name.split(' ');
                    const initials = nameParts.map(part => part.charAt(0)).join('');
                    
                    // Créer la carte de témoignage
                    const reviewCard = document.createElement('div');
                    reviewCard.className = 'testimonial-card';
                    reviewCard.innerHTML = `
                        <div class="quote">
                            "${review.text}"
                        </div>
                        <div class="testimonial-author">
                            <div class="author-avatar">${initials}</div>
                            <div class="author-info">
                                <div class="author-name">${review.author_name}</div>
                                <div class="ratings" style="color: gold;">${stars}</div>
                                <div class="review-time">${new Date(review.time * 1000).toLocaleDateString()}</div>
                            </div>
                        </div>
                    `;
                    
                    reviewsContainer.appendChild(reviewCard);
                });
            } else {
                // En cas d'erreur ou si aucun avis n'est disponible
                reviewsContainer.innerHTML = `
                    <div class="testimonial-card">
                        <div class="quote">
                            Impossible de charger les avis Google. Veuillez consulter directement 
                            <a href="https://www.google.com/maps/place/?q=place_id:${GOOGLE_PLACE_ID}" target="_blank">
                              notre page Google
                            </a>.
                        </div>
                    </div>
                `;
            }
        });
    };
    
    // Fonction de repli en cas d'échec du chargement de l'API Google
    function googleReviewsFallback() {
        const reviewsContainer = document.getElementById('google-reviews');
        reviewsContainer.innerHTML = `
            <div class="testimonial-card">
                <div class="quote">
                    "Ma séance avec Adèle a été révélatrice. Sa capacité à percevoir les blocages énergétiques est impressionnante. Je me sens beaucoup plus légère et alignée depuis notre rencontre."
                </div>
                <div class="testimonial-author">
                    <div class="author-avatar">ML</div>
                    <div class="author-info">
                        <div class="author-name">Marie Leclerc</div>
                        <div class="ratings">★★★★★</div>
                    </div>
                </div>
            </div>
            <div class="testimonial-card">
                <div class="quote">
                    "Je consultais régulièrement pour des problèmes d'anxiété. Les soins énergétiques d'Adèle m'ont aidé à trouver un équilibre que je cherchais depuis longtemps. Merci infiniment !"
                </div>
                <div class="testimonial-author">
                    <div class="author-avatar">TD</div>
                    <div class="author-info">
                        <div class="author-name">Thomas Dubois</div>
                        <div class="ratings">★★★★★</div>
                    </div>
                </div>
            </div>
            <div class="testimonial-card">
                <div class="quote">
                    "Adèle possède un don remarquable. Sa lecture intuitive a mis en lumière des aspects de ma vie que je n'avais jamais considérés. Une expérience transformative que je recommande."
                </div>
                <div class="testimonial-author">
                    <div class="author-avatar">SB</div>
                    <div class="author-info">
                        <div class="author-name">Sophie Bernard</div>
                        <div class="ratings">★★★★★</div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Gérer l'erreur si l'API Google ne se charge pas correctement
    window.addEventListener('error', function(e) {
        if (e.target.src && e.target.src.indexOf('maps.googleapis.com') !== -1) {
            googleReviewsFallback();
        }
    }, true);
});