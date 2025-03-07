// Gestion du formulaire de rendez-vous
document.addEventListener('DOMContentLoaded', () => {
    const appointmentForm = document.getElementById('appointment-form');
    const formAlert = document.getElementById('form-alert');
    const submitButton = document.getElementById('submit-btn');

    // Fonction pour afficher un message d'alerte
    function showAlert(type, message) {
        formAlert.className = 'form-alert';
        formAlert.classList.add(type);
        
        if (type === 'loading') {
            formAlert.innerHTML = `<div class="loading-spinner"></div>${message}`;
        } else {
            formAlert.textContent = message;
        }
        
        formAlert.style.display = 'block';
    }

    // Fonction pour masquer l'alerte
    function hideAlert() {
        formAlert.style.display = 'none';
    }

    // Simulation de l'envoi d'email (à remplacer par une vraie logique côté serveur)
    function simulateEmailSending() {
        return new Promise((resolve, reject) => {
            // Simulation d'un délai d'envoi d'email (2 secondes)
            setTimeout(() => {
                // Simuler une réussite 90% du temps
                const success = Math.random() < 0.9;
                
                if (success) {
                    resolve();
                } else {
                    reject(new Error('Problème de connexion au serveur. Veuillez réessayer.'));
                }
            }, 2000);
        });
    }

    // Gestion de la soumission du formulaire
    appointmentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Récupérer les données du formulaire
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value;
        
        // Validation supplémentaire
        if (!name || !email || !phone || !service) {
            showAlert('error', 'Veuillez remplir tous les champs obligatoires.');
            return;
        }
        
        // Construire le corps de l'email (dans une app réelle, côté serveur)
        const emailBody = `
            Nouvelle demande de rendez-vous:
            
            Nom: ${name}
            Email: ${email}
            Téléphone: ${phone}
            Service: ${service}
            Message: ${message || 'Aucun message'}
        `;
        
        // Désactiver le bouton de soumission pendant l'envoi
        submitButton.disabled = true;
        
        // Afficher l'état de chargement
        showAlert('loading', 'Envoi de votre demande en cours...');
        
        try {
            // Simuler l'envoi d'email
            await simulateEmailSending();
            
            // En cas de succès
            showAlert('success', 'Votre demande a été envoyée avec succès. Vous recevrez une confirmation par email sous peu.');
            appointmentForm.reset();
            
            // Dans une application réelle, on enverrait le formulaire à un serveur
            /*
            const response = await fetch('/api/send-appointment-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    phone,
                    service,
                    message
                }),
            });
            
            if (!response.ok) {
                throw new Error('Erreur lors de l\'envoi du formulaire');
            }
            
            const data = await response.json();
            // ... traiter la réponse
            */
            
        } catch (error) {
            // En cas d'erreur
            showAlert('error', error.message || 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer.');
        } finally {
            // Réactiver le bouton de soumission
            submitButton.disabled = false;
            
            // Faire disparaître le message après 8 secondes si c'est un succès
            if (formAlert.classList.contains('success')) {
                setTimeout(() => {
                    hideAlert();
                }, 8000);
            }
        }
    });
});